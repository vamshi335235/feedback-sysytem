const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Attempting to connect to MongoDB...');
  
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/feedback', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB; 