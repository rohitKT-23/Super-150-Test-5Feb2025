const express = require('express');
const Note = require('../models/Note');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Get all notes for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new note
router.post('/', authMiddleware, upload.single('audio'), async (req, res) => {
  const { title, content } = req.body;
  const audioFile = req.file;

  try {
    const note = new Note({
      title,
      content,
      audioUrl: audioFile ? audioFile.path : null,
      userId: req.userId,
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;