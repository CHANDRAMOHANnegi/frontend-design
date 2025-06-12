import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

// Route imports
import authRoutes from "./routes/authRoutes.js";
// import problemRoutes from "./routes/problemRoutes.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import noteRoutes from "./routes/noteRoutes.js";
// import progressRoutes from "./routes/progressRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", limiter);

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/problems", problemRoutes);
// app.use("/api/blog", blogRoutes);
// app.use("/api/notes", noteRoutes);
// app.use("/api/progress", progressRoutes);
// app.use("/api/profile", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handlers
app.use(errorHandler);
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;