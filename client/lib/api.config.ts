import axios from "axios";
import { authClient } from "@/lib/auth-client";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const cookie = authClient.getCookie();

  if (cookie && config.headers) {
    config.headers.set("Cookie", cookie);
  }

  return config;
});
