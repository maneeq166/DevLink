import {Router} from "express"
import { addLink, getLink, getLinks } from "../controller/link.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const linkRouter = Router();

linkRouter.post("/add-link",authMiddleware,addLink);
linkRouter.get("/get-links",authMiddleware,getLinks);
linkRouter.get("/get-link/:id",authMiddleware,getLink);

export default linkRouter