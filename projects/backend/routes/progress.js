// routes/progress.js
import express from "express";
import { Progress, Problem, Submission } from "../models/models.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get user progress
router.get("/", authenticateToken, async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user.userId })
      .populate("completed_problems", "title difficulty")
      .populate("attempted_problems", "title difficulty");

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    const totalProblems = await Problem.countDocuments();
    const recentSubmissions = await Submission.find({ user: req.user.userId })
      .populate("problem", "title difficulty")
      .sort({ createdAt: -1 })
      .limit(10);

    const stats = {
      totalProblems,
      completedProblems: progress.completed_problems.length,
      attemptedProblems: progress.attempted_problems.length,
      completionRate:
        totalProblems > 0
          ? (
              (progress.completed_problems.length / totalProblems) *
              100
            ).toFixed(1)
          : 0,
      acceptanceRate:
        progress.total_submissions > 0
          ? (
              (progress.accepted_submissions / progress.total_submissions) *
              100
            ).toFixed(1)
          : 0,
      streakCount: progress.streak_count,
      difficultyStats: progress.stats,
      recentActivity: recentSubmissions,
      badges: progress.badges,
    };

    res.json(stats);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;