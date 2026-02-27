import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/env.js";
import ChatHistory from "../models/chat.model.js";

const groq = new Groq({ apiKey: GROQ_API_KEY });

const dangerWords = ["die", "kill", "suicide", "self harm", "end my life"];

export const Chat = async (req, res, next) => {
  try {
    const user = req.session;

    const { message } = req.body;
    if (!message) {
      const error = new Error("Message is required");
      error.status = 400;
      throw error;
    }

    // 🔹 Detect danger words
    const isDanger = dangerWords.some((word) =>
      message.toLowerCase().includes(word),
    );

    // 🔹 Get previous chat
    // 🔹 Get previous chat
    let previousChat = await ChatHistory.findOne({ userId: user.id });

    // 🔹 Take only last 5 messages
    let formattedMessages = [];
    if (previousChat?.messages?.length) {
      formattedMessages = previousChat.messages
        .slice(-5) // ✅ ONLY LAST 5 MESSAGES
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));
    }

    // 🔹 System prompt
    const systemPrompt = isDanger
      ? `You are a mental wellness companion.
         The user may be in emotional distress.
         Respond with empathy.
         Encourage contacting trusted people or helplines.
         Do NOT provide medical advice.`
      : `You are a friendly mental wellness companion.
         Offer emotional support and positive suggestions.
         Do not diagnose or give medical advice.`;

    // 🔹 AI Request
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: systemPrompt },
        ...formattedMessages, // ✅ previous conversation
        { role: "user", content: message },
      ],
    });

    const aiReply =
      response.choices[0]?.message?.content || "I'm here to listen.";

    // 🔹 Save conversation
    await ChatHistory.findOneAndUpdate(
      { userId: user.id },
      {
        $push: {
          messages: [
            { role: "user", content: message },
            { role: "assistant", content: aiReply },
          ],
        },
      },
      {
        upsert: true,
        new: true,
      },
    );

    // 🔹 Response
    res.status(200).json({
      success: true,
      message: "Chat successful",
      data: aiReply,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const GetChatHistory = async (req, res, next) => {
  try {
    const user = req.session;
    const history = await ChatHistory.findOne({ userId: user.id });

    res.status(200).json({
      success: true,
      data: history?.messages || [],
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const DeleteChatHistory = async (req, res, next) => {
  try {
    const user = req.session;

    if (!user?.id) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    await ChatHistory.findOneAndUpdate(
      { userId: user.id },
      { $set: { messages: [] } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Chat history deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
