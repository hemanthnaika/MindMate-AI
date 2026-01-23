import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserMood, MoodAdd } from "../controllers/mood.controller.js";

const MoodRoute = Router();

MoodRoute.post("/add-mood", authMiddleware, MoodAdd);
MoodRoute.get("/get-mood", authMiddleware, getUserMood);
export default MoodRoute;
