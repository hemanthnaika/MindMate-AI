import express from "express";
import { ORIGIN, PORT } from "./config/env.js";
import { toNodeHandler } from "better-auth/node";

import cors from "cors";
import { auth } from "./lib/auth.js";
import UserRouter from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import ChatRouter from "./routes/chat.route.js";

import ConnectDB from "./config/db.js";
import MoodRoute from "./routes/mood.route.js";
import HabitRoute from "./routes/habit.route.js";
import dashboardRouter from "./routes/dashboard.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  }),
);

app.all("/api/auth/*", toNodeHandler(auth));
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/ai", ChatRouter);
app.use("/api/v1/mood", MoodRoute);
app.use("/api/v1/habit", HabitRoute);
app.use("/api/v1/dashboard", dashboardRouter);

app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("MindMates AI API");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  ConnectDB();
});
