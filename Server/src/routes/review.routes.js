import express from "express";
import { addReport, addReview, reviews } from "../controllers/review.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const reviewRoutes = express.Router();

reviewRoutes.get("/Reviews", verifyToken, reviews);
reviewRoutes.post("/AddReview", addReview);
reviewRoutes.post("/AddReport", addReport);

export default reviewRoutes;