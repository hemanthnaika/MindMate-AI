import { config } from "dotenv";

config({
  path: ".env",
});

export const { PORT, DB_URL, ORIGIN, GROQ_API_KEY } = process.env;
