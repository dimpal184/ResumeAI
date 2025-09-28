import dotenv from "dotenv";
dotenv.config({ path: './.env' }); // Load environment variables from .env


import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Google Generative AI is now handled in resumeRoutes.js
console.log("Loaded Gemini API Key:", process.env.GEMINI_API_KEY ? "✅ Found" : "❌ Missing");

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/resumeai")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Simple mock authentication middleware for saving data.
// In a real application, this would verify a user's token.
app.use((req, res, next) => {
  // Replace this with your actual authentication logic
  // For now, we will use a hardcoded user ID.
  req.userId = "test-user-123"; 
  next();
});

// Routes
app.use("/api", authRoutes);
app.use("/api", resumeRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
