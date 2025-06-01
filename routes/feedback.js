const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Get all feedback entries
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all feedback');
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .select('name email message createdAt approved resolved response');

    console.log(`Found ${feedbacks.length} feedback entries`);
    res.json(feedbacks);
  } catch (error) {
    console.error('Error in GET /feedback:', error);
    res.status(500).json({ 
      message: 'Error fetching feedback', 
      error: error.message 
    });
  }
});

// Submit new feedback
router.post('/', async (req, res) => {
  console.log('=== New Feedback Submission ===');
  console.log('Received data:', req.body);
  
  try {
    // Validate required fields
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      console.log('Missing required fields:', { name, email, message });
      return res.status(400).json({ 
        message: 'Missing required fields', 
        received: req.body 
      });
    }

    // Create and save the feedback
    const feedback = new Feedback({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    console.log('Attempting to save feedback:', feedback);
    await feedback.save();
    console.log('Feedback saved successfully:', feedback);
    
    res.status(201).json({ 
      message: 'Feedback submitted successfully', 
      feedback 
    });
  } catch (error) {
    console.error('Error in POST /feedback:', error);
    res.status(500).json({ 
      message: 'Error submitting feedback', 
      error: error.message
    });
  }
});

// Search feedback by email
router.get('/search', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const feedbacks = await Feedback.find({ email })
      .sort({ createdAt: -1 })
      .select('name email message createdAt approved resolved response');

    res.json(feedbacks);
  } catch (error) {
    console.error('Error searching feedback:', error);
    res.status(500).json({ 
      message: 'Error searching feedback', 
      error: error.message 
    });
  }
});

// Update feedback status and response
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Validate the feedback exists
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Only allow updating specific fields
    const allowedUpdates = ['approved', 'resolved', 'response'];
    const actualUpdates = {};
    
    for (const key of allowedUpdates) {
      if (updates.hasOwnProperty(key)) {
        actualUpdates[key] = updates[key];
      }
    }

    // Update the feedback
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { $set: actualUpdates },
      { new: true }
    );

    console.log(`Updated feedback ${id}:`, actualUpdates);
    res.json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ 
      message: 'Error updating feedback', 
      error: error.message 
    });
  }
});

module.exports = router;
