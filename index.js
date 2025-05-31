const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const feedbackRoutes = require("./routes/feedback");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS) from public folder
app.use(express.static(path.join(__dirname, "public")));

// Feedback API routes
app.use("/api/feedback", feedbackRoutes);

// Serve index.html on root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
