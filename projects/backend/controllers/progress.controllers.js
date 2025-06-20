import { Problem, Progress, Submission } from "../schema/schema.js";

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user.userId })
      .populate("problemId", "title difficulty category")
      .populate("bestSubmission", "status submittedAt");

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [totalProblems, solvedProblems, totalSubmissions, recentActivity] =
      await Promise.all([
        Problem.countDocuments(),
        Progress.countDocuments({ userId, status: "completed" }),
        Submission.countDocuments({ userId }),
        Submission.find({ userId })
          .populate("problemId", "title")
          .sort({ submittedAt: -1 })
          .limit(5),
      ]);

    const stats = {
      totalProblems,
      solvedProblems,
      totalSubmissions,
      successRate:
        totalSubmissions > 0
          ? ((solvedProblems / totalSubmissions) * 100).toFixed(1)
          : 0,
      recentActivity,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getStats,
  getProgress,
};
