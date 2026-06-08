import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  guestId: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  types: { type: String, required: true },
});

export default model("Review_Page", ReviewSchema);
