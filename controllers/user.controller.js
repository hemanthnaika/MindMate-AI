import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
export const currentUser = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    res.status(200).json(session);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
