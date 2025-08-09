import express from "express";
import { fetchRepos, fetchProfile, fetchUserTotalCommitsFast } from "../controller/github.controller.js";

const githubRouter = express.Router();

// Pass username in the URL
githubRouter.get("/:username/repos", fetchRepos);
githubRouter.get("/:username/profile", fetchProfile);
githubRouter.get("/:username/total-commits", fetchUserTotalCommitsFast);

export default githubRouter;
