import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GuestDetails = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: false },
  roomNumber: { type: Number, required: true },
  guests: { type: Number, required: true },
  checkIn: { type: String, required: true },
  checkOut: { type: String, required: true },
  isStay: { type: String, required: true },
  amount: { type: Number, required: true },
  payment: {
    type: String,
    default: "Pending",
    required: true,
  },
});
const GuestModel = model("Guest_Details", GuestDetails);
export default GuestModel;
