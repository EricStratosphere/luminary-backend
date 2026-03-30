import { Router } from "express";

const authorRouter = Router();

// GET all authors
authorRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all authors!"
    });
});

// GET author by id
authorRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched author by id!"
    });
});

// POST create author
authorRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new author!"
    });
});

// PUT update author by id
authorRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated author!"
    });
});

// DELETE author by id
authorRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted author!"
    });
});

export default authorRouter;
