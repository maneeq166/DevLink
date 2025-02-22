import express from "express";
import { createLink, getLinks } from "../controllers/linkController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createLink);
router.get("/", authMiddleware, getLinks);

export default router;