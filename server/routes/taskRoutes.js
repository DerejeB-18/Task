const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET: Get all tasks (newest first)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST: Create a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = await Task.create({ title });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH: Update a task's completion status
router.patch('/:id', async (req, res) => {
  try {
    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed },
      { returnDocument: 'after' } // Updated to use the new Mongoose standard
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE: Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;