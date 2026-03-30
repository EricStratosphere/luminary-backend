import { Router } from "express";

const notesRouter = Router();

// GET all notes
notesRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all notes!"
    });
});

// GET note by id
notesRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched note by id!"
    });
});

// POST create note
notesRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new note!"
    });
});

// PUT update note by id
notesRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated note!"
    });
});

// DELETE note by id
notesRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted note!"
    });
});

export default notesRouter;
