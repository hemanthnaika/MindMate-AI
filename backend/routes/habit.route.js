import { Router } from "express";
import {
  addHabit,
  deleteHabit,
  getHabits,
  markHabit,
  updateHabit,
} from "../controllers/habit.controller.js";
import { authMiddleware } from "./../middlewares/auth.middleware.js";

const HabitRoute = Router();

HabitRoute.post("/add-habit", authMiddleware, addHabit);
HabitRoute.post("/mark-habit", authMiddleware, markHabit);
HabitRoute.get("/get-habits", authMiddleware, getHabits);
HabitRoute.patch("/update-habit", authMiddleware, updateHabit);
HabitRoute.delete("/delete-habit", authMiddleware, deleteHabit);

export default HabitRoute;
