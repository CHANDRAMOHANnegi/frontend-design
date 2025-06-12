// routes/profile.js
import express from "express";
import { body } from "express-validator";
import { User } from "../models/models.js";
import { authenticateToken, validateRequest } from "../middleware/auth.js";

const router = express.Router();

// Get user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update user profile
router.put(
  "/",
  authenticateToken,
  [
    body("name").optional().trim().isLength({ min: 2 }),
    body("email").optional().isEmail().normalizeEmail(),
    body("bio").optional().trim(),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { name, email, bio, preferences } = req.body;

      if (email) {
        const emailExists = await User.findOne({
          email,
          _id: { $ne: req.user.userId },
        });
        if (emailExists) {
          return res.status(400).json({ error: "Email already in use" });
        }
      }

      const user = await User.findByIdAndUpdate(
        req.user.userId,
        { name, email, bio, preferences },
        { new: true }
      ).select("-password");

      res.json(user);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export default router;