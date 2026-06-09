import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { updateStatus, ordersList, deleteOrders } from "../controllers/order.controllers.js";

const orderRoutes = express.Router();

orderRoutes.patch("/updateStatus", verifyToken, updateStatus);
orderRoutes.get("/ordersList", verifyToken, ordersList);
orderRoutes.delete("/deleteOrders", verifyToken, deleteOrders);

export default orderRoutes;