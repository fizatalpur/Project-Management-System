import express from 'express';
import { getAllUsers, updateUser, activateUserProfile,deleteUser, dashboardStatisticsEmployees } from '../controllers/user.controller.js';
import { isAdminRoute, protectRoute } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/dashboard", protectRoute, dashboardStatisticsEmployees);
router.get("/get-all", protectRoute, isAdminRoute, getAllUsers)
router.put("/update", protectRoute, updateUser)


router.route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUser);
export default router;