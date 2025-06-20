import mongoose from "mongoose";

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date,
  preferences: {
    theme: { type: String, default: "light" },
    difficulty: { type: String, default: "all" },
  },
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  description: { type: String, required: true },
  examples: [
    {
      input: String,
      output: String,
    },
  ],
  defaultSolution: String,
  testCases: [
    {
      input: String,
      expected: mongoose.Schema.Types.Mixed,
    },
  ],
  hints: [String],
  notes: String,
  tags: [String],
  category: String,
  createdAt: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  submissions: { type: Number, default: 0 },
  successRate: { type: Number, default: 0 },
});

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  code: { type: String, required: true },
  language: { type: String, default: "javascript" },
  status: { type: String, enum: ["passed", "failed", "error"], required: true },
  testResults: [
    {
      input: String,
      expected: mongoose.Schema.Types.Mixed,
      actual: mongoose.Schema.Types.Mixed,
      passed: Boolean,
    },
  ],
  executionTime: Number,
  submittedAt: { type: Date, default: Date.now },
});

const blogTopicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  color: String,
  createdAt: { type: Date, default: Date.now },
});

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogTopic",
    required: true,
  },
  tags: [String],
  readTime: String,
  published: { type: Boolean, default: false },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
});

const noteCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  color: String,
  icon: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NoteCategory",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  status: {
    type: String,
    enum: ["not-started", "in-progress", "completed"],
    default: "not-started",
  },
  attempts: { type: Number, default: 0 },
  bestSubmission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
  lastAttempt: Date,
  timeSpent: { type: Number, default: 0 }, // in minutes
});

// Models
export const User = mongoose.model("User", userSchema);
export const Problem = mongoose.model("Problem", problemSchema);
export const Submission = mongoose.model("Submission", submissionSchema);
export const BlogTopic = mongoose.model("BlogTopic", blogTopicSchema);
export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export const NoteCategory = mongoose.model("NoteCategory", noteCategorySchema);
export const Note = mongoose.model("Note", noteSchema);
export const Progress = mongoose.model("Progress", progressSchema);
