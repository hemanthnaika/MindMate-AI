import mongoose from "mongoose";
import Habit from "../models/habit.model.js"; // adjust path if needed

const MONGO_URI =
  "mongodb+srv://hemanthnaika22_db_user:2A24lkvQmrNmgCfZ@cluster0.n1pogoh.mongodb.net/?appName=Cluster0";
const USER_ID = "6971adc6ad908d13208700e4"; // use SAME userId everywhere

const seedHabits = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Remove old habits for this user
    await Habit.deleteMany({ userId: USER_ID });

    await Habit.create({
      userId: USER_ID,
      habits: [
        {
          name: "Morning Walk",
          progress: Array.from({ length: 7 }).map(() => ({
            completed: Math.random() > 0.4,
          })),
        },
        {
          name: "Meditation",
          progress: Array.from({ length: 7 }).map(() => ({
            completed: Math.random() > 0.5,
          })),
        },
        {
          name: "Journaling",
          progress: Array.from({ length: 7 }).map(() => ({
            completed: Math.random() > 0.6,
          })),
        },
      ],
    });

    console.log("✅ Habits seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Habit seed error:", error);
    process.exit(1);
  }
};

seedHabits();
