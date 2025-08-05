import express from "express"
import { createNotes, deleteNote, getAllNotesOfYours, getSearchedNote, updateNote } from "../controller/note.controller.js";

const notesRouter = express.Router();


notesRouter.post("/create-note",createNotes);
notesRouter.put("/update-note",updateNote);
notesRouter.get("/read-note",getAllNotesOfYours);

notesRouter.post("/search-note",getSearchedNote);

notesRouter.delete("/delete-note",deleteNote);


export default notesRouter;
