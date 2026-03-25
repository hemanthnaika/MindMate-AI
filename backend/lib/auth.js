import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { DB_URL, ORIGIN } from "../config/env.js";
import { expo } from "@better-auth/expo";

const client = new MongoClient(DB_URL);
const db = client.db();

export const auth = betterAuth({
  trustedOrigins: [
    "exp://*",
    "http://localhost:8081",
    "http://10.184.78.14:8081",
  ],

  plugins: [expo()],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
