const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PATCH') {
    console.log('Request body:', req.body);
  }
  next();
});

// MongoDB Connection with better error handling
console.log('Attempting to connect to MongoDB...');

// Create the feedback schema before connecting
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: null
  },
  resolved: {
    type: Boolean,
    default: false
  },
  response: {
    type: String,
    default: ''
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/feedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  // Only start the server after successful DB connection
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try accessing:`);
    console.log(`- Frontend: http://localhost:${PORT}`);
    console.log(`- API endpoint: http://localhost:${PORT}/api/feedback`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// API Routes
app.post('/api/feedback', async (req, res) => {
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
    console.error('Error in POST /api/feedback:', error);
    res.status(500).json({ 
      message: 'Error submitting feedback', 
      error: error.message,
      stack: error.stack
    });
  }
});

// Add a test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Get all feedback entries
app.get('/api/feedback', async (req, res) => {
  try {
    console.log('Fetching all feedback');
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .select('name email message createdAt approved resolved response');

    console.log(`Found ${feedbacks.length} feedback entries`);
    res.json(feedbacks);
  } catch (error) {
    console.error('Error in GET /api/feedback:', error);
    res.status(500).json({ 
      message: 'Error fetching feedback', 
      error: error.message 
    });
  }
});

// Search feedback by email
app.get('/api/feedback/search', async (req, res) => {
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
app.patch('/api/feedback/:id', async (req, res) => {
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

// For any unknown route, send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
