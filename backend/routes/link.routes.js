import {Router} from "express"
import { addLink, deleteLink, getLink, getLinks } from "../controller/link.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
const linkRouter = Router();

linkRouter.post("/add-link",authMiddleware,addLink);
linkRouter.get("/get-links",authMiddleware,getLinks);
linkRouter.get("/get-link/:id",authMiddleware,getLink);
linkRouter.delete("/delete-link/:id",authMiddleware,deleteLink);

export default linkRouter