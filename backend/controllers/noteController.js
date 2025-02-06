const Note = require('../models/Note');

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = new Note({ title, content, userId: req.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createNote, getNotes };