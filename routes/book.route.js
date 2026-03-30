import { Router } from "express";

const bookRouter = Router();

// GET all books
bookRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all books!"
    });
});

// GET book by id
bookRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched book by id!"
    });
});

// POST create book
bookRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new book!"
    });
});

// PUT update book by id
bookRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated book!"
    });
});

// DELETE book by id
bookRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted book!"
    });
});

export default bookRouter;