// routes/profile.js
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import progressControllers from "../controllers/progress.controllers.js";

const router = express.Router();

router.get("/progress", authenticateToken, progressControllers.getProgress);

// Dashboard/Stats Routes
router.get("/dashboard/stats", authenticateToken, progressControllers.getStats);

export default router;