// lib/chat.ts
import { api } from "@/lib/api.config";
import { handleApiError } from "@/utils/handleApiError";

export const getChatHistory = async () => {
  try {
    const res = await api.get("/v1/ai/chatHistory");
    return res.data.data;
  } catch (err: any) {
    if (err?.error) {
      throw handleApiError(err);
    }
  }
};

export const sendMessage = async (message: string) => {
  try {
    const res = await api.post("/v1/ai/chat", { message });
    return res.data.data;
  } catch (err: any) {
    throw handleApiError(err);
  }
};

export const deleteAllChats = async () => {
  try {
    const res = await api.delete("/v1/ai/deleteChatHistory");
    return res.data.data;
  } catch (err: any) {
    throw handleApiError(err);
  }
};
