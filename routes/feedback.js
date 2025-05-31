const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get approved feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ approved: true });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: get all feedback
router.get('/admin', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: update feedback (respond/approve/resolve)
router.patch('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
