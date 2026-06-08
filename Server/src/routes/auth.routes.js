import express from "express";
import { login, logout, profile, signup } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/profile", profile);
authRouter.post("/logout", logout);

export default authRouter;
