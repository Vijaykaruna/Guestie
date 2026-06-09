import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";

import hotelRoutes from "./src/routes/hotel.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import foodRouter from "./src/routes/food.routes.js";
import guestRoutes from "./src/routes/guest.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import { connectDB } from "./src/lib/db.js";
import { checkAndDeactivateSubscriptions } from "./src/lib/subscriptionCron.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const clientDistPath = path.join(__dirname, "Client", "dist");

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/auth", authRouter);
app.use("/food", foodRouter);
app.use("/order", orderRoutes);
app.use("/hotel", hotelRoutes);
app.use("/guest", guestRoutes);
app.use("/review", reviewRoutes);

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDistPath, "index.html")));
} else {
  app.get("*", (_req, res) => res.status(404).json({ message: "API is running. Client build not found." }));
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);

      // Run subscription check immediately on startup, then every hour
      checkAndDeactivateSubscriptions();
      setInterval(checkAndDeactivateSubscriptions, 60 * 60 * 1000);
    });
  })
  .catch((err) => {
    console.error("Server error", err);
    process.exit(1);
  });
