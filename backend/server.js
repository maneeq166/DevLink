import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import helmet from "helmet";
import { connection } from "./config/db.config.js";
import linkRouter from "./routes/link.routes.js";
import profileRouter from "./routes/profile.route.js";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());

connection();

app.use(cors());
app.use(express.json());


app.use("/auth", authRouter);
app.use("/link",linkRouter);
app.use("/profile",profileRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found! (404)", success: false });
});
