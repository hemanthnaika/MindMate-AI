import { Router } from "express";
import {
  addHabit,
  getHabits,
  markHabit,
} from "../controllers/habit.controller.js";
import { authMiddleware } from "./../middlewares/auth.middleware.js";

const HabitRoute = Router();

HabitRoute.post("/add-habit", authMiddleware, addHabit);
HabitRoute.post("/mark-habit", authMiddleware, markHabit);
HabitRoute.get("/get-habits", authMiddleware, getHabits);


export default HabitRoute;
