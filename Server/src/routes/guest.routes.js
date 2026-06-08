import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  addGuest,
  guestList,
  guestDetails,
  paymentStatus,
  updateStay,
  getInvoiceGuests,
  getHotelByUser,
  getFoodsByUser,
  addOrderFood,
  getGuestOrderFoods,
} from "../controllers/guest.controller.js";

const guestRoutes = express.Router();

// With user verification
guestRoutes.post("/addGuest", verifyToken, addGuest);
guestRoutes.get("/guests", verifyToken, guestList);
guestRoutes.patch("/updateStayStatus/:guestId", verifyToken, updateStay);
guestRoutes.patch("/updatePaymentStatus/:guestId", verifyToken, paymentStatus);
guestRoutes.get("/guestWithInvoice", verifyToken, getInvoiceGuests);

// Without user verification
guestRoutes.post("/guest/:userId", guestDetails);
guestRoutes.get("/hotel/:userId", getHotelByUser);
guestRoutes.get("/foods/:userId", getFoodsByUser);
guestRoutes.post("/order", addOrderFood);
guestRoutes.get("/order/list/:guestId", getGuestOrderFoods);

export default guestRoutes;
