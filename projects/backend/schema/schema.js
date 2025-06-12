import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Mongoose Schemas
export const userSchema = {}

// export const problemSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     difficulty: {
//       type: String,
//       required: true,
//       enum: ["Easy", "Medium", "Hard"],
//     },
//     description: { type: String, required: true },
//     examples: [
//       {
//         input: String,
//         output: String,
//         explanation: String,
//       },
//     ],
//     defaultSolution: String,
//     testCases: [
//       {
//         input: mongoose.Schema.Types.Mixed,
//         expected: mongoose.Schema.Types.Mixed,
//         hidden: { type: Boolean, default: false },
//       },
//     ],
//     hints: [String],
//     tags: [String],
//     category: String,
//     difficulty_rating: { type: Number, min: 1, max: 10 },
//     acceptance_rate: { type: Number, default: 0 },
//     total_submissions: { type: Number, default: 0 },
//     accepted_submissions: { type: Number, default: 0 },
//     created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     is_premium: { type: Boolean, default: false },
//     company_tags: [String],
//   },
//   { timestamps: true }
// );

// export const submissionSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     problem: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Problem",
//       required: true,
//     },
//     code: { type: String, required: true },
//     language: { type: String, default: "javascript" },
//     status: {
//       type: String,
//       enum: [
//         "Accepted",
//         "Wrong Answer",
//         "Runtime Error",
//         "Time Limit Exceeded",
//       ],
//       required: true,
//     },
//     runtime: Number,
//     memory: Number,
//     test_results: [
//       {
//         input: mongoose.Schema.Types.Mixed,
//         expected: mongoose.Schema.Types.Mixed,
//         actual: mongoose.Schema.Types.Mixed,
//         passed: Boolean,
//         runtime: Number,
//       },
//     ],
//     submission_time: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// export const blogPostSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     excerpt: { type: String, required: true },
//     content: { type: String, required: true },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     topic: { type: mongoose.Schema.Types.ObjectId, ref: "BlogTopic" },
//     tags: [String],
//     read_time: String,
//     published: { type: Boolean, default: false },
//     featured: { type: Boolean, default: false },
//     views: { type: Number, default: 0 },
//     likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//     meta: {
//       title: String,
//       description: String,
//       keywords: [String],
//     },
//   },
//   { timestamps: true }
// );

// export const blogTopicSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     slug: { type: String, required: true, unique: true },
//     description: String,
//     color: String,
//     icon: String,
//     order: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// export const noteSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     category: { type: String, required: true },
//     title: String,
//     content: { type: String, default: "" },
//     tags: [String],
//     is_favorite: { type: Boolean, default: false },
//     folder: String,
//   },
//   { timestamps: true }
// );

// export const progressSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     completed_problems: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
//     ],
//     attempted_problems: [
//       { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
//     ],
//     streak_count: { type: Number, default: 0 },
//     last_activity: { type: Date, default: Date.now },
//     total_submissions: { type: Number, default: 0 },
//     accepted_submissions: { type: Number, default: 0 },
//     stats: {
//       easy_solved: { type: Number, default: 0 },
//       medium_solved: { type: Number, default: 0 },
//       hard_solved: { type: Number, default: 0 },
//     },
//     badges: [
//       {
//         name: String,
//         description: String,
//         earned_at: { type: Date, default: Date.now },
//       },
//     ],
//   },
//   { timestamps: true }
// );
