// routes/profile.js
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import blogControllers from "../controllers/blog.controllers.js";

const router = express.Router();

router.get("/topics", blogControllers.blogTopics);

router.get("/posts", blogControllers.getBlogPosts);

router.get("/posts/:id", blogControllers.getBlogPost);

router.post("/posts", authenticateToken, blogControllers.addBlogPost);

export default router;