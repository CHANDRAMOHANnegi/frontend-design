// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import {
  User,
  BlogPost,
  BlogTopic,
  Note,
  NoteCategory,
  Problem,
  Progress,
  Submission,
} from "./schema/schema.js";

import authController from "./controllers/auth.controllers.js";
import notesController from "./controllers/notes.controllers.js";
import problemController from "./controllers/problem.controllers.js";
import blogController from "./controllers/blog.controllers.js";
import progressController from "./controllers/progress.controllers.js";
import submitController from "./controllers/submit.controllers.js";

import problemsRoutes from "./routes/problems.routes.js"
import notesRoutes from "./routes/notes.routes.js"
import blogRoutes from "./routes/blogs.routes.js"
import progressRoutes from "./routes/progress.routes.js"
import submitRoutes from "./routes/submission.routes.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/learning-platform",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((d) => {
    console.log("db connected", db);
  })
  .catch((err) => {
    console.log("hello");
  });

// Auth Routes
app.use("/api/auth", authRoutes);

// Problem Routes
app.use("/api/problems", problemsRoutes);

// Submission Routes
app.use("/api/submissions", submitRoutes);

// Blog Routes
app.use("/api/blog", blogRoutes);

// Notes Routes
app.use("/api/notes", notesRoutes);

// Progress Routes
app.use("/api/progress", progressRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
