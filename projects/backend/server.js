// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/learning-platform";

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schemas
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    avatar: String,
    bio: String,
    preferences: {
      theme: { type: String, default: "light", enum: ["light", "dark"] },
      notifications: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    description: { type: String, required: true },
    examples: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    defaultSolution: String,
    testCases: [
      {
        input: mongoose.Schema.Types.Mixed,
        expected: mongoose.Schema.Types.Mixed,
        hidden: { type: Boolean, default: false },
      },
    ],
    hints: [String],
    tags: [String],
    category: String,
    difficulty_rating: { type: Number, min: 1, max: 10 },
    acceptance_rate: { type: Number, default: 0 },
    total_submissions: { type: Number, default: 0 },
    accepted_submissions: { type: Number, default: 0 },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    is_premium: { type: Boolean, default: false },
    company_tags: [String],
  },
  { timestamps: true }
);

const submissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    code: { type: String, required: true },
    language: { type: String, default: "javascript" },
    status: {
      type: String,
      enum: [
        "Accepted",
        "Wrong Answer",
        "Runtime Error",
        "Time Limit Exceeded",
      ],
      required: true,
    },
    runtime: Number,
    memory: Number,
    test_results: [
      {
        input: mongoose.Schema.Types.Mixed,
        expected: mongoose.Schema.Types.Mixed,
        actual: mongoose.Schema.Types.Mixed,
        passed: Boolean,
        runtime: Number,
      },
    ],
    submission_time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "BlogTopic" },
    tags: [String],
    read_time: String,
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    meta: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

const blogTopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    color: String,
    icon: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    title: String,
    content: { type: String, default: "" },
    tags: [String],
    is_favorite: { type: Boolean, default: false },
    folder: String,
  },
  { timestamps: true }
);

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    completed_problems: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    ],
    attempted_problems: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    ],
    streak_count: { type: Number, default: 0 },
    last_activity: { type: Date, default: Date.now },
    total_submissions: { type: Number, default: 0 },
    accepted_submissions: { type: Number, default: 0 },
    stats: {
      easy_solved: { type: Number, default: 0 },
      medium_solved: { type: Number, default: 0 },
      hard_solved: { type: Number, default: 0 },
    },
    badges: [
      {
        name: String,
        description: String,
        earned_at: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// Models
const User = mongoose.model("User", userSchema);
const Problem = mongoose.model("Problem", problemSchema);
const Submission = mongoose.model("Submission", submissionSchema);
const BlogPost = mongoose.model("BlogPost", blogPostSchema);
const BlogTopic = mongoose.model("BlogTopic", blogTopicSchema);
const Note = mongoose.model("Note", noteSchema);
const Progress = mongoose.model("Progress", progressSchema);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Utility functions
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const updateProgress = async (userId, problemId, isAccepted) => {
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

// AUTH ROUTES
app.post(
  "/api/auth/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("name").trim().isLength({ min: 2 }),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password, name } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      await user.save();

      // Initialize user progress
      const progress = new Progress({ user: user._id });
      await progress.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(201).json({
        user: { id: user._id, email: user.email, name: user.name },
        token,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

app.post(
  "/api/auth/login",
  [body("email").isEmail().normalizeEmail(), body("password").exists()],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        user: { id: user._id, email: user.email, name: user.name },
        token,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// PROBLEMS ROUTES
app.get("/api/problems", async (req, res) => {
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

app.get("/api/problems/:id", async (req, res) => {
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

app.post(
  "/api/problems/:id/submit",
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
app.get(
  "/api/problems/:id/submissions",
  authenticateToken,
  async (req, res) => {
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
  }
);

// BLOG ROUTES
app.get("/api/blog/topics", async (req, res) => {
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

app.get("/api/blog/posts", async (req, res) => {
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

app.get("/api/blog/posts/:id", async (req, res) => {
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
app.post("/api/blog/posts/:id/like", authenticateToken, async (req, res) => {
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

// NOTES ROUTES
app.get("/api/notes", authenticateToken, async (req, res) => {
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

app.get("/api/notes/:id", authenticateToken, async (req, res) => {
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

app.post(
  "/api/notes",
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

app.put(
  "/api/notes/:id",
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

app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
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

// PROGRESS ROUTES
app.get("/api/progress", authenticateToken, async (req, res) => {
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

// USER PROFILE ROUTES
app.get("/api/profile", authenticateToken, async (req, res) => {
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

app.put(
  "/api/profile",
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

// ADMIN ROUTES (basic example)
app.post(
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

// Health check
app.get("/api/health", async (req, res) => {
  try {
    const dbStatus =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.json({
      status: "OK",
      database: dbStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      timestamp: new Date().toISOString(),
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
