import express from "express";
import { ORIGIN, PORT } from "./config/env.js";
import { toNodeHandler } from "better-auth/node";

import cors from "cors";
import { auth } from "./lib/auth.js";
import UserRouter from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ORIGIN, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all("/api/auth/*", toNodeHandler(auth));
app.use("/api/v1/user", UserRouter);

app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("MindMates AI API");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
