import mongoose from "mongoose";

// Define the Resume Schema and Model
const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  resumeData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Resume = mongoose.model("Resume", resumeSchema);

// --- 1. Database Operations ---

export const saveResume = async (userId, title, resumeData) => {
  const newResume = new Resume({ userId, title, resumeData });
  await newResume.save();
  return { message: "Resume saved successfully!", resumeId: newResume._id };
};

export const getResumes = async (userId) => {
  const resumes = await Resume.find({ userId }).select("title createdAt");
  return resumes;
};

export const deleteResume = async (userId, resumeId) => {
  const result = await Resume.deleteOne({ _id: resumeId, userId });
  if (result.deletedCount === 0) {
    throw new Error("Resume not found or you do not have permission to delete it.");
  }
};

// --- 2. AI Content Generation ---

export const generateResume = async (prompt) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is not set in environment variables.");
  }
  
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";
  
  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    tools: [{ "google_search": {} }], // Use Google Search for grounding
  };
  
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API call failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      throw new Error("Failed to parse generated content from API response.");
    }
    
    return generatedText;
  } catch (error) {
    console.error("Error during Gemini API call:", error);
    throw new Error("Failed to generate resume content. Please try again.");
  }
};
