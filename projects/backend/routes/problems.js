// routes/problems.js
import express from "express";
import { body } from "express-validator";
import { Problem, Submission } from "../models/models.js";
import { authenticateToken, validateRequest } from "../middleware/auth.js";
import { updateProgress } from "../utils/index.js";

const router = express.Router();

// Get all problems
router.get("/", async (req, res) => {
  try {
    const {
      difficulty,
      tags,
      category,
      page = 1,
      limit = 10,
      search,
    } = req.query;

    let query = {};

    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (tags) {
      const tagArray = tags.split(",");
      query.tags = { $in: tagArray };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const problems = await Problem.find(query)
      .select("-testCases -defaultSolution")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("created_by", "name");

    const total = await Problem.countDocuments(query);

    res.json({
      problems,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single problem
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id)
      .populate("created_by", "name")
      .select("-defaultSolution");

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Filter out hidden test cases for regular users
    problem.testCases = problem.testCases.filter((tc) => !tc.hidden);

    res.json(problem);
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Submit solution
router.post(
  "/:id/submit",
  authenticateToken,
  [body("code").trim().isLength({ min: 1 })],
  validateRequest,
  async (req, res) => {
    try {
      const problemId = req.params.id;
      const { code, language = "javascript" } = req.body;
      const userId = req.user.userId;

      const problem = await Problem.findById(problemId);
      if (!problem) {
        return res.status(404).json({ error: "Problem not found" });
      }

      const results = [];
      let allPassed = true;
      let status = "Accepted";

      try {
        const func = new Function("return " + code)();

        for (const testCase of problem.testCases) {
          try {
            const startTime = Date.now();
            let actual;

            if (Array.isArray(testCase.input)) {
              actual = func(...testCase.input);
            } else {
              actual = func(testCase.input);
            }

            const runtime = Date.now() - startTime;
            const passed =
              JSON.stringify(actual) === JSON.stringify(testCase.expected);

            results.push({
              input: testCase.input,
              expected: testCase.expected,
              actual: actual,
              passed: passed,
              runtime: runtime,
            });

            if (!passed) {
              allPassed = false;
              status = "Wrong Answer";
            }
          } catch (error) {
            results.push({
              input: testCase.input,
              expected: testCase.expected,
              actual: error.message,
              passed: false,
              runtime: 0,
            });
            allPassed = false;
            status = "Runtime Error";
          }
        }
      } catch (error) {
        allPassed = false;
        status = "Runtime Error";
      }

      // Save submission
      const submission = new Submission({
        user: userId,
        problem: problemId,
        code,
        language,
        status,
        test_results: results,
      });

      await submission.save();

      // Update problem stats
      await Problem.findByIdAndUpdate(problemId, {
        $inc: {
          total_submissions: 1,
          ...(allPassed && { accepted_submissions: 1 }),
        },
      });

      // Update acceptance rate
      const updatedProblem = await Problem.findById(problemId);
      if (updatedProblem.total_submissions > 0) {
        updatedProblem.acceptance_rate = (
          (updatedProblem.accepted_submissions /
            updatedProblem.total_submissions) *
          100
        ).toFixed(1);
        await updatedProblem.save();
      }

      // Update user progress
      await updateProgress(userId, problemId, allPassed);

      res.json({
        success: allPassed,
        status,
        results: results.filter((r) => !r.hidden), // Don't show hidden test results
        message: allPassed ? "All tests passed!" : "Some tests failed",
        submissionId: submission._id,
      });
    } catch (error) {
      console.error("Submission error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Get user's submissions for a problem
router.get("/:id/submissions", authenticateToken, async (req, res) => {
  try {
    const submissions = await Submission.find({
      user: req.user.userId,
      problem: req.params.id,
    })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;