import mongoose from "mongoose";
import Mood from "../models/mood.model.js";

const MONGO_URI =
  "mongodb+srv://hemanthnaika22_db_user:2A24lkvQmrNmgCfZ@cluster0.n1pogoh.mongodb.net/?appName=Cluster0";
const USER_ID = "6971adc6ad908d13208700e4"; // SAME userId

const seedMood = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Remove old mood data for this user
    await Mood.deleteMany({ userId: USER_ID });

    await Mood.create({
      userId: USER_ID,
      moodInfo: Array.from({ length: 20 }).map((_, i) => ({
        mood: Math.ceil(Math.random() * 5),
        stress: Math.ceil(Math.random() * 5),
        sleep: Math.ceil(Math.random() * 5),
        note: `Day ${i + 1} mood check-in`,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      })),
    });

    console.log("✅ Mood data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Mood seed error:", error);
    process.exit(1);
  }
};

seedMood();
