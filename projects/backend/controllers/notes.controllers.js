import { Note } from "../schema/schema.js";

const getNotesCategories = async (req, res) => {
  try {
    const categories = await NoteCategory.find({ userId: req.user.userId });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNotesCategories = async (req, res) => {
  try {
    const category = new NoteCategory({
      ...req.body,
      userId: req.user.userId,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotes = async (req, res) => {
  console.log('=====',req);
  
  try {
    const { categoryId } = req.query;
    let query = { userId: req.user.userId };

    if (categoryId) {
      query.categoryId = categoryId;
    }

    const notes = await Note.find(query)
      .populate("categoryId", "name color")
      .sort({ updatedAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addNotes = async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      userId: req.user.userId,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getNotesCategories,
  addNotesCategories,
  getNotes,
  deleteNote,
  editNote,
  addNotes,
  addNotesCategories,
  getNotesCategories,
};
