// routes/profile.js
import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import notesControllers from "../controllers/notes.controllers.js";

const router = express.Router();

router.get("/categories", notesControllers.getNotesCategories);

router.post("/categories", authenticateToken, notesControllers.addNotesCategories);

router.get("", authenticateToken, notesControllers.getNotes);

router.post("", authenticateToken, notesControllers.addNotes);

router.put("/:id", authenticateToken, notesControllers.editNote);

router.delete("/:id", authenticateToken, notesControllers.deleteNote);

export default router;