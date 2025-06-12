// routes/notes.js
import express from "express";
import { body } from "express-validator";
import { Note } from "../models/models.js";
import { authenticateToken, validateRequest } from "../middleware/auth.js";

const router = express.Router();

// Get all notes
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { category, search, page = 1, limit = 20 } = req.query;

    let query = { user: req.user.userId };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const notes = await Note.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Note.countDocuments(query);

    res.json({
      notes,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single note
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Create note
router.post(
  "/",
  authenticateToken,
  [body("category").trim().isLength({ min: 1 }), body("content").trim()],
  validateRequest,
  async (req, res) => {
    try {
      const { category, title, content, tags, folder } = req.body;

      const note = new Note({
        user: req.user.userId,
        category,
        title,
        content,
        tags: tags || [],
        folder,
      });

      await note.save();
      res.status(201).json(note);
    } catch (error) {
      console.error("Error creating note:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Update note
router.put(
  "/:id",
  authenticateToken,
  [body("content").trim()],
  validateRequest,
  async (req, res) => {
    try {
      const { title, content, tags, folder, is_favorite } = req.body;

      const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.userId },
        { title, content, tags, folder, is_favorite },
        { new: true }
      );

      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }

      res.json(note);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Delete note
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;