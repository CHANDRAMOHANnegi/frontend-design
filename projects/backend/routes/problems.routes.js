// routes/profile.js
import express from "express";
import problemControllers from "../controllers/problem.controllers.js";

const router = express.Router();
// Problem Routes
router.get("", problemControllers.getProblems);

router.get("/:id", problemControllers.getProblem);

router.post("", problemControllers.addProblem);

export default router;