import { Router } from "express";
import {
  Chat,
  DeleteChatHistory,
  GetChatHistory,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const ChatRouter = Router();

ChatRouter.post("/chat", authMiddleware, Chat);
ChatRouter.get("/chatHistory", authMiddleware, GetChatHistory);
ChatRouter.delete("/deleteChatHistory", authMiddleware, DeleteChatHistory);

export default ChatRouter;
