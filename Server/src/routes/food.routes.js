import express from "express";
import {
  addFood,
  deleteFood,
  getAllFoods,
  updateFood,
} from "../controllers/food.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const foodRouter = express.Router();

foodRouter.delete("/delete/:id", verifyToken, deleteFood);
foodRouter.post("/addfood", verifyToken, addFood);
foodRouter.get("/foodlist", verifyToken, getAllFoods);
foodRouter.put("/updatefood", verifyToken, updateFood);

export default foodRouter;
