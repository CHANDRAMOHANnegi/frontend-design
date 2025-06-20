import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NoteCategory, User } from "../schema/schema.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = ""//await bcrypt.hash(password, saltRounds);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    // Create default note categories for user
    const defaultCategories = [
      {
        name: "Learning Goals",
        description: "Track learning objectives",
        color: "bg-amber-100 text-amber-700",
        icon: "Trophy",
      },
      {
        name: "Code Snippets",
        description: "Useful code examples",
        color: "bg-blue-100 text-blue-700",
        icon: "Code",
      },
    ];

    for (const category of defaultCategories) {
      await new NoteCategory({ ...category, userId: user._id }).save();
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = ""//await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default  {
  register,
  login,
};
