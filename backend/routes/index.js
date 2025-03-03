import express from "express";
import authRoutes from './auth.route.js'
import userRoutes from "./user.route.js";
import projectRoutes from "./project.route.js";

const router = express.Router();

router.use("/auth", authRoutes); //api/auth/login
router.use("/user", userRoutes); //api/user
router.use("/project", projectRoutes);

export default router;