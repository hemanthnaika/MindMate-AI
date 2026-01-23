import { api } from "@/lib/api.config";
import { handleApiError } from "@/utils/handleApiError";

export const getUserAnalysis = async () => {
  try {
    const res = await api.get("/v1/dashboard/get-summary");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
