import { Router } from "express";
import { addHabit } from "../controllers/habit.controller.js";
import { authMiddleware } from "./../middlewares/auth.middleware.js";

const HabitRoute = Router();

HabitRoute.post("/add-habit", authMiddleware, addHabit);
export default HabitRoute;
