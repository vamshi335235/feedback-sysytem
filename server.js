const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/database');
const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' || req.method === 'PATCH') {
    console.log('Request body:', req.body);
  }
  next();
});

// Routes
app.use('/api/feedback', feedbackRoutes);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Connect to database and start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Try accessing:`);
      console.log(`- Frontend: http://localhost:${PORT}`);
      console.log(`- API endpoint: http://localhost:${PORT}/api/feedback`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
