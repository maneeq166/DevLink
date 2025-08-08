import express from "express";
import { fetchRepos, fetchProfile } from "../controllers/github.controller.js";

const githubRouter = express.Router();

// Pass username in the URL
router.get("/:username/repos", fetchRepos);
router.get("/:username/profile", fetchProfile);

export default githubRouter;
