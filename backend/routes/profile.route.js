import { Router } from "express";
import { getOtherProfile, getProfile } from "../controller/profile.controller.js";
import authMiddleware from "../middleware/authMiddleware.js"; 
const profileRouter = Router();

profileRouter.get("/get-profile", authMiddleware, getProfile);
profileRouter.get("/get-other-profile/:id", getOtherProfile);

export default profileRouter;
