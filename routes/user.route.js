import { Router } from "express";
import { currentUser } from "./../controllers/user.controller.js";

const UserRouter = Router();
UserRouter.get("/me", currentUser);

export default UserRouter;
