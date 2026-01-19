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


