// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";
// import linkRoutes from "./routes/linkRoutes.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Enable CORS with frontend URL (adjust if needed)
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// // Middleware for JSON parsing
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => {
//     console.error(" MongoDB connection error:", err);
//     process.exit(1); // Exit if database connection fails
//   });

// // Routes
// app.use("/auth", authRoutes);
// app.use("/links", linkRoutes);

// // Start server
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { User } from "./models/userModel.js";
import { Link } from './models/linkModel.js';
import dotenv from 'dotenv';
import authMiddleware from "./middleware/authMiddleware.js";
dotenv.config();

const app = express();

const port = 3000;

const SECRET = "SECr3t";
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const Register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }
  const user = await User.findOne({ username });

  if (user) {
    res.status(403).send("User Already Existed");
  } else {
    const newuser = new User({ username, password });
    await newuser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "User created successfully", token });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ message: "Logged in successfully", token });
  } else {
    res.status(403).send("Invalid username or password");
  }
};

const addLink = async (req, res) => {
  try {
    const { url } = req.body;
    const newLink = new Link({ title , url });
    await newLink.save();
    res.json(newLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ user: req.user.id });
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteLink = async (req, res) => {
  try {
    const { id } = req.params; // Get link ID from request params

    // Find the link by ID and ensure it belongs to the logged-in user
    const link = await Link.findOne({ _id: id, user: req.user.id });

    if (!link) {
      return res.status(404).json({ error: "Link not found or unauthorized" });
    }

    // Delete the link
    await Link.findByIdAndDelete(id);

    res.json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



app.post("/register", Register);
app.post("/login", Login);
app.post("/addlink", authMiddleware , addLink);
app.post("/", authMiddleware , getLinks);
app.delete("/deletelink/:id", authMiddleware , deleteLink);

function started() {
  console.log(`Example app listening on port ${port}`);
}

app.listen(port, started);
console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "DVL",
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));