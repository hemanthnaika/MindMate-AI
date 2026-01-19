import { Router } from "express";
import { currentUser } from "./../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const UserRouter = Router();
UserRouter.get("/me", authMiddleware, currentUser);

export default UserRouter;
