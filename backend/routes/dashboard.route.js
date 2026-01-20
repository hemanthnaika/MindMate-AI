import { Router } from "express";
import { DashBoardSummary } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const dashboardRouter = Router();

dashboardRouter.get("/get-summary", authMiddleware, DashBoardSummary);
export default dashboardRouter;
