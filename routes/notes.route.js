import { Router } from "express";
import { getNotes, getNoteById, getNotesByBookIdAndUserId, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js";

const notesRouter = Router();

// GET all notes
notesRouter.get('/', getNotes);

// GET note by id
notesRouter.get('/getbyid/:id', getNoteById);


// GET notes by book id and user id
notesRouter.get('/book/:bookId/user/:userId', getNotesByBookIdAndUserId);

// POST create note
notesRouter.post('/', createNote);

// PUT update note by id
notesRouter.put('/update/:id', updateNote);

// DELETE note by id
notesRouter.delete('/delete/:id', deleteNote);

export default notesRouter;
