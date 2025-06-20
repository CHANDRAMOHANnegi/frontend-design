// routes/profile.js
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import progressControllers from "../controllers/progress.controllers.js";
import submitControllers from "../controllers/submit.controllers.js";

const router = express.Router();

router.post("", authenticateToken, submitControllers.submit);

router.get("/user/:userId", authenticateToken, submitControllers.getUserSubmission);

export default router;