// lib/chat.ts
import { api } from "@/lib/api.config";

export const getChatHistory = async () => {
  try {
    const res = await api.get("/v1/ai/chatHistory");
    return res.data.data;
  } catch (err: any) {
    if (err?.error) {
      throw new Error(
        err.error.message || err.error.code || "Authentication failed"
      );
    }

    if (err.response) {
      throw new Error(err.response.data?.message || "Request failed");
    }

    if (err.request) {
      throw new Error("Network error. Please check your internet connection.");
    }

    throw new Error(err.message || "Something went wrong");
  }
};

export const sendMessage = async (message: string) => {
  try {
    const res = await api.post("/v1/ai/chat", { message });
    return res.data.data;
  } catch (err: any) {
    if (err?.error) {
      throw new Error(
        err.error.message || err.error.code || "Authentication failed"
      );
    }

    if (err.response) {
      throw new Error(err.response.data?.message || "Request failed");
    }

    if (err.request) {
      throw new Error("Network error. Please check your internet connection.");
    }

    throw new Error(err.message || "Something went wrong");
  }
};
