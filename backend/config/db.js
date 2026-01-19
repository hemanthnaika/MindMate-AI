import mongoose from "mongoose";
import { DB_URL } from "../config/env.js";

if (!DB_URL) {
  throw new Error("DB_URL is not defined");
}
const ConnectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default ConnectDB;
