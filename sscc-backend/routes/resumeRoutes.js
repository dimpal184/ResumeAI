import express from "express";
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define a Mongoose Schema for the resume data
// (Schema and Model are correctly defined here)
const resumeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled Resume'
  },
  data: {
    contact: {
      name: String,
      title: String,
      phone: String,
      email: String,
      linkedin: String,
      location: String,
    },
    summary: String,
    experience: [
      {
        title: String,
        company: String,
        startDate: String,
        endDate: String,
        details: [String],
      },
    ],
    education: [
      {
        degree: String,
        university: String,
        startDate: String,
        endDate: String,
      },
    ],
    skills: [String],
    projects: [
      {
        name: String,
        description: String,
      },
    ],
    awards: [
      {
        name: String,
        description: String,
      },
    ],
    languages: [String],
    interests: [String],
    selectedTemplate: String,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

// Endpoint to generate AI content (This is fine)
router.post('/generate-resume-content', async (req, res) => {
  const { jobTitle, company } = req.body;
  if (!jobTitle || !company) {
    return res.status(400).json({ success: false, message: 'Job title and company are required.' });
  }
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate a list of 5 professional, one-sentence bullet points for a resume.
The user worked as a "${jobTitle}" at "${company}"`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const suggestions = text.split('\n').map(s => s.trim()).filter(s => s.startsWith('*')).map(s => s.substring(1).trim());
    if (suggestions.length === 0) {
      return res.status(500).json({ success: false, message: 'Failed to generate content. Please try again.' });
    }
    res.json({ success: true, suggestions });
  } catch (error) {
    console.error("Error generating AI content:", error);
    res.status(500).json({ success: false, message: "Error generating content." });
  }
});

// NEW: Endpoint to get all resumes for a user (This is fine)
router.get('/resumes', async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  try {
    const resumes = await Resume.find({ userId: userId }).sort({ lastModified: -1 });
    res.status(200).json({ success: true, resumes });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch resumes.' });
  }
});

// NEW: Endpoint to get a single resume by its ID (This is fine)
router.get('/resumes/:id', async (req, res) => {
  const userId = req.userId;
  const resumeId = req.params.id;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  try {
    const resume = await Resume.findOne({ _id: resumeId, userId: userId });
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }
    res.status(200).json({ success: true, resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch resume.' });
  }
});

// NEW: Endpoint to create a new resume (POST request)
router.post('/save-resume', async (req, res) => {
  const userId = req.userId;
  const { title, data } = req.body;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  try {
    const newResume = new Resume({ userId, title, data });
    await newResume.save();
    return res.status(201).json({ success: true, message: 'New resume created successfully.', resumeId: newResume._id });
  } catch (error) {
    console.error('Error creating new resume:', error);
    res.status(500).json({ success: false, message: 'Failed to create new resume. Please try again.' });
  }
});

// NEW: Endpoint to update an existing resume (PUT request)
router.put('/save-resume/:id', async (req, res) => {
  const userId = req.userId;
  const resumeId = req.params.id;
  const { title, data } = req.body;
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required.' });
  }
  try {
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId: userId },
      { data, title, lastModified: new Date() },
      { new: true } // Return the updated document
    );
    if (!updatedResume) {
      return res.status(404).json({ success: false, message: 'Resume not found or not authorized.' });
    }
    return res.status(200).json({ success: true, message: 'Resume updated successfully.', resume: updatedResume });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ success: false, message: 'Failed to update resume. Please try again.' });
  }
});

export default router;