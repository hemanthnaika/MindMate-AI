import { api } from "@/lib/api.config";
import { handleApiError } from "@/utils/handleApiError";

export const getHabits = async () => {
  try {
    const res = await api.get("/v1/habit/get-habits");
    return res.data;
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

export const updateHabit = async (data: {
  oldHabitName: string;
  newHabitName: string;
}) => {
  try {
    console.log(data);
    const res = await api.patch("/v1/habit/update-habit", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw handleApiError(error);
  }
};

export const deleteHabit = async (data: { habitName: string }) => {
  try {
    const res = await api.delete("/v1/habit/delete-habit", { data });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
