// routes/blog.js
import express from "express";
import { BlogPost, BlogTopic } from "../models/models.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Get blog topics
router.get("/topics", async (req, res) => {
  try {
    const topics = await BlogTopic.find().sort({ order: 1, name: 1 });

    // Add post counts
    const topicsWithCounts = await Promise.all(
      topics.map(async (topic) => {
        const count = await BlogPost.countDocuments({
          topic: topic._id,
          published: true,
        });
        return {
          ...topic.toObject(),
          count,
        };
      })
    );

    res.json(topicsWithCounts);
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get blog posts
router.get("/posts", async (req, res) => {
  try {
    const { topicId, page = 1, limit = 10, featured, search } = req.query;

    let query = { published: true };

    if (topicId) query.topic = topicId;
    if (featured === "true") query.featured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(query)
      .populate("author", "name")
      .populate("topic", "name slug color")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get single blog post
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, published: true },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("author", "name bio avatar")
      .populate("topic", "name slug color");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Like/Unlike blog post
router.post("/posts/:id/like", authenticateToken, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userId = req.user.userId;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      liked: !isLiked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;