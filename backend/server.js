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
import dotenv from 'dotenv';
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


app.post("/register", Register);
app.post("/login", Login);

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