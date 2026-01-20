import { getConsistency, getStreak } from "../lib/helperFunctions.js";
import Habit from "../models/habit.model.js";
export const addHabit = async (req, resizeBy, next) => {
  try {
    const user = req.session;
    const { habitName } = req.body;
    if (!habitName) {
      const error = new Error("Habit name is required");
      error.status = 400;
      throw error;
    }
    let userHabit = await Habit.findOne({ userId: user.id });
    if (!userHabit) {
      await Habit.create({
        userId: user.id,
        habits: [{ name: habitName }],
      });
    } else {
      const exists = userHabit.habits.find((habit) => habit.name === habitName);
      if (exists) {
        const error = new Error("Habit already exists");
        error.status = 400;
        throw error;
      }
      userHabit.habits.push({ name: habitName });
      await userHabit.save();
    }
    res.status(200).json({ success: true, message: "Habit added" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const markHabit = async (req, res, next) => {
  try {
    const user = req.session;

    const { habitName, completed } = req.body;

    if (!habitName) {
      const error = new Error("Habit name is required");
      error.status = 400;
      throw error;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const userHabit = await Habit.findOne({ userId: user.id });

    if (!userHabit) {
      const error = new Error("No habits found");
      error.status = 404;
      throw error;
    }
    const habit = userHabit.habits.find((habit) => habit.name === habitName);
    if (!habit) {
      const error = new Error("Habit not found");
      error.status = 404;
      throw error;
    }

    const todayProgress = habit.progress.find(
      (progress) => progress.date >= today && progress.date < tomorrow
    );

    if (todayProgress) {
      todayProgress.completed = completed;
    } else {
      habit.progress.push({ date: today, completed });
    }
    await userHabit.save();
    res.status(200).json({ success: true, message: "Habit marked" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getHabits = async (req, re, next) => {
  try {
    const user = req.session;
    const userHabits = await Habit.findOne({ userId: user.id });

    if (!userHabits) {
      const error = new Error("No habits found");
      error.status = 404;
      throw error;
    }

    const habits = userHabits.habits.map((habit) => ({
      name: habit.name,
      streak: getStreak(habit.progress),
      consistency: getConsistency(habit.progress),
    }));

    res.status(200).json({ success: true, habits });
  } catch (error) {
    console.log(error);
    next(error);
  }
};