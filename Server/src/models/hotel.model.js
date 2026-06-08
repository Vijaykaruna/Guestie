import mongoose from "mongoose";
const { Schema, model } = mongoose;

const subcripeHistory = new Schema(
  {
    planDetails: { type: String, required: true },
    activeDate: { type: String, required: true },
    deActiveDate: { type: String, required: true },
  },
  {_id: false},
);

const HotelSchema = new Schema({
  userId: { type: String, required: true },
  user: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  hotel: { type: String, required: true },
  rooms: { type: Number, default: 5, required: true },
  address: { type: String, required: true },
  isSubscripe: { type: Boolean, default: false, required: true },
  subcripedHistory: [subcripeHistory],
});

export default model("Hotel_details", HotelSchema);
