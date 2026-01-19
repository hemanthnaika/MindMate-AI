import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { DB_URL, ORIGIN } from "../config/env.js";

const client = new MongoClient(DB_URL);
const db = client.db();

export const auth = betterAuth({
  trustedOrigins: [ORIGIN],
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
