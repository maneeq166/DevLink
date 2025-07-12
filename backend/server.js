import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import { Link } from "./models/link.model.js";
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import helmet from "helmet";
import { connection } from "./config/db.config.js";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());

connection();

app.use(cors());
app.use(express.json());

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
    const { title, url } = req.body;
    const newLink = new Link({ title, url });
    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLink = async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

app.use("/auth", authRouter);
app.post("/addlink", authMiddleware, addLink);
app.get("/links", authMiddleware, getLinks);
app.delete("/deletelink/:id", authMiddleware, deleteLink);

function started() {
  console.log(`Example app listening on port ${port}`);
}
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found!", success: false });
});
