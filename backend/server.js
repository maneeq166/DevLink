// backend/server.js (Entry Point)
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/auth", authRoutes);
app.use("/links", linkRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
