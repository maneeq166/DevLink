import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";
import helmet from "helmet";
import { connection } from "./config/db.config.js";
import linkRouter from "./routes/link.route.js";
import profileRouter from "./routes/profile.route.js";
import notesRouter from "./routes/notes.route.js";
import githubRouter from "./routes/github.route.js";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());

connection();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());


app.use("/auth", authRouter);
app.use("/link",linkRouter);
app.use("/profile",profileRouter);
app.use("/notes",notesRouter);
app.use("/github",githubRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found! (404)", success: false });
});
