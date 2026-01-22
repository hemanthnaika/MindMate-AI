import { api } from "@/lib/api.config";
import { handleApiError } from "@/utils/handleApiError";

export const getHabits = async () => {
  try {
    const res = api.get("/v1/habit/get-habits");
    return (await res).data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const markHabit = async (data: MarkHabit) => {
  try {
    const res = await api.post("/v1/habit/mark-habit", data);

    return res;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addHabit = async (data: { habitName: string }) => {
  try {
    const res = await api.post("/v1/habit/add-habit", data);
    return res;
  } catch (error) {
    throw handleApiError(error);
  }
};
