import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/register", [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("name").trim().isLength({ min: 2 })
], validateRequest, register);

router.post("/login", [
  body("email").isEmail().normalizeEmail(),
  body("password").exists()
], validateRequest, login);

export default router;
