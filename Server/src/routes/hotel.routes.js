import express from "express";
import {
  profileDetails,
  setRoom,
  Subscripe,
  userDetails,
  allUserDetails,
} from "../controllers/hotel.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const hotelRoutes = express.Router();

hotelRoutes.post("/hotelDetails", verifyToken, profileDetails);
hotelRoutes.get("/myhotelDetails", verifyToken, userDetails);
hotelRoutes.get("/allhotelDetails", verifyToken, allUserDetails);
hotelRoutes.patch("/updateRooms", verifyToken, setRoom);
hotelRoutes.post("/updateSubscripe", verifyToken, Subscripe);

export default hotelRoutes;
