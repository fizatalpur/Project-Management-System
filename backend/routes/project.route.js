import express from "express";
import {
  createTask,
  getTask,
  getTasks,
  dashboardStatistics,
  updateTask,
  deleteTask
} from "../controllers/projects.controller.js";
import { isAdminRoute, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, createTask);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);


router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.delete("/:id", protectRoute, isAdminRoute, deleteTask);

export default router;
