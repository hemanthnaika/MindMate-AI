import { api } from "@/lib/api.config";
import { handleApiError } from "@/utils/handleApiError";

export const addMood = async (data: MoodProps) => {
  try {
    const res = await api.post("/v1/mood/add-mood", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMood = async () => {
  try {
    const res = await api.get("/v1/mood/get-mood");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
