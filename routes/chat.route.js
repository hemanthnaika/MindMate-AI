import { Router } from "express";
import { Chat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const ChatRouter = Router();

ChatRouter.post("/chat", authMiddleware, Chat);

export default ChatRouter;
