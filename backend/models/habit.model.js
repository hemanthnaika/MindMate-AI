import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    habits: [
      {
        name: {
          type: String,
          required: true,
        },

        progress: [
          {
            date: {
              type: Date,
              required: true,
              default: Date.now,
            },
            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);
