import mongoose from "mongoose";
import {
  User,
  Problem,
  Submission,
  BlogTopic,
  BlogPost,
  NoteCategory,
  Note,
  Progress,
} from "./schema/schema.js"; // Adjust the import path as necessary

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const dbUri = ""; // Adjust as per your database config
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany();
    await Problem.deleteMany();
    await Submission.deleteMany();
    await BlogTopic.deleteMany();
    await BlogPost.deleteMany();
    await NoteCategory.deleteMany();
    await Note.deleteMany();
    await Progress.deleteMany();

    // Seed Users
    const users = await User.insertMany([
      {
        email: "john.doe@example.com",
        password: "hashedpassword123",
        name: "John Doe",
        avatar: "https://example.com/avatar1.png",
        preferences: { theme: "dark", difficulty: "medium" },
      },
      {
        email: "jane.smith@example.com",
        password: "hashedpassword456",
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.png",
      },
    ]);

    // Seed Problems
    const problems = await Problem.insertMany([
      {
        title: "Two Sum",
        difficulty: "Easy",
        description: "Find indices of two numbers that add up to a target.",
        examples: [
          { input: "[2,7,11,15], target=9", output: "[0,1]" },
        ],
        defaultSolution: "function twoSum(nums, target) { return []; }",
        testCases: [
          { input: "[2,7,11,15], target=9", expected: "[0,1]" },
        ],
        tags: ["array", "hashmap"],
        author: users[0]._id,
      },
      {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        description: "Find the length of the longest substring without repeating characters.",
        examples: [
          { input: '"abcabcbb"', output: "3" },
        ],
        defaultSolution: "function lengthOfLongestSubstring(s) { return 0; }",
        testCases: [
          { input: '"abcabcbb"', expected: 3 },
        ],
        tags: ["string", "sliding window"],
        author: users[1]._id,
      },
    ]);

    // Seed Submissions
    await Submission.insertMany([
      {
        userId: users[0]._id,
        problemId: problems[0]._id,
        code: "function twoSum(nums, target) { return [0, 1]; }",
        language: "javascript",
        status: "passed",
        testResults: [
          {
            input: "[2,7,11,15], target=9",
            expected: "[0,1]",
            actual: "[0,1]",
            passed: true,
          },
        ],
      },
    ]);

    // Seed Blog Topics
    const blogTopics = await BlogTopic.insertMany([
      { name: "Algorithms", description: "All about algorithms", color: "#f39c12" },
      { name: "JavaScript", description: "JavaScript tips and tricks", color: "#27ae60" },
    ]);

    // Seed Blog Posts
    await BlogPost.insertMany([
      {
        title: "Understanding Big-O Notation",
        content: "Big-O is a measure of algorithm efficiency...",
        author: users[0]._id,
        topicId: blogTopics[0]._id,
        tags: ["algorithms", "performance"],
        published: true,
        publishedAt: new Date(),
      },
    ]);

    // Seed Note Categories
    const noteCategories = await NoteCategory.insertMany([
      { name: "Frontend", color: "#3498db", userId: users[1]._id },
      { name: "Backend", color: "#e74c3c", userId: users[1]._id },
    ]);

    // Seed Notes
    await Note.insertMany([
      {
        title: "React useState Hook",
        content: "useState is a React Hook that lets you add state to function components.",
        categoryId: noteCategories[0]._id,
        userId: users[1]._id,
        tags: ["react", "hooks"],
      },
    ]);

    // Seed Progress
    await Progress.insertMany([
      {
        userId: users[0]._id,
        problemId: problems[0]._id,
        status: "completed",
        attempts: 1,
        bestSubmission: null,
        timeSpent: 10,
      },
    ]);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
