import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    moodInfo: [
      {
        mood: {
          type: Number,
          min: 1,
          max: 5,
        },
        stress: {
          type: Number,
          min: 1,
          max: 5,
        },
        sleep: {
          type: Number,
          min: 1,
          max: 5,
        },
        note: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Mood", moodSchema);
