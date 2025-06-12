import express from "express"

const router = express.Router();

// Utility functions
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};


// ADMIN ROUTES (basic example)
router.post(
  "/api/admin/problems",
  authenticateToken,
  [
    body("title").trim().isLength({ min: 1 }),
    body("description").trim().isLength({ min: 1 }),
    body("difficulty").isIn(["Easy", "Medium", "Hard"]),
  ],
  validateRequest,
  async (req, res) => {
    try {
      // Check if user is admin (you might want to add role-based middleware)
      const user = await User.findById(req.user.userId);
      if (user.role !== "admin") {
        return res.status(403).json({ error: "Admin access required" });
      }

      const {
        title,
        description,
        difficulty,
        examples,
        testCases,
        hints,
        tags,
        category,
      } = req.body;

      const problem = new Problem({
        title,
        slug: generateSlug(title),
        description,
        difficulty,
        examples: examples || [],
        testCases: testCases || [],
        hints: hints || [],
        tags: tags || [],
        category,
        created_by: req.user.userId,
      });

      await problem.save();
      res.status(201).json(problem);
    } catch (error) {
      console.error("Error creating problem:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);


export default router;
