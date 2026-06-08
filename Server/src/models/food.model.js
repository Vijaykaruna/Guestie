import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FoodItems = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    description: { type: String, default: "Freshly prepared and delivered to your room." },
    image: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("food_Items", FoodItems);
