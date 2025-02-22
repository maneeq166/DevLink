import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with frontend URL (adjust if needed)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware for JSON parsing
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error(" MongoDB connection error:", err);
    process.exit(1); // Exit if database connection fails
  });

// Routes
app.use("/auth", authRoutes);
app.use("/links", linkRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
