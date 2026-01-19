import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { MoodAdd } from "../controllers/mood.controller.js";

const MoodRoute = Router();

MoodRoute.post("/add-mood", authMiddleware, MoodAdd);

export default MoodRoute;
