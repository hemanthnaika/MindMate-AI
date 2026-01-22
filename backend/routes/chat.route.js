import { Router } from "express";
import { Chat, GetChatHistory } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const ChatRouter = Router();

ChatRouter.post("/chat", authMiddleware, Chat);
ChatRouter.get("/chatHistory", authMiddleware, GetChatHistory);


export default ChatRouter;
