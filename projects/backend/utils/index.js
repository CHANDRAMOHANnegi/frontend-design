// utils/index.js
import { Progress, Problem } from "../models/models.js";

// Utility functions
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const updateProgress = async (userId, problemId, isAccepted) => {
  try {
    let progress = await Progress.findOne({ user: userId });
    if (!progress) {
      progress = new Progress({ user: userId });
    }

    if (!progress.attempted_problems.includes(problemId)) {
      progress.attempted_problems.push(problemId);
    }

    if (isAccepted && !progress.completed_problems.includes(problemId)) {
      progress.completed_problems.push(problemId);

      // Update difficulty stats
      const problem = await Problem.findById(problemId);
      if (problem) {
        switch (problem.difficulty) {
          case "Easy":
            progress.stats.easy_solved++;
            break;
          case "Medium":
            progress.stats.medium_solved++;
            break;
          case "Hard":
            progress.stats.hard_solved++;
            break;
        }
      }
    }

    progress.total_submissions++;
    if (isAccepted) progress.accepted_submissions++;
    progress.last_activity = new Date();

    await progress.save();
  } catch (error) {
    console.error("Error updating progress:", error);
  }
};