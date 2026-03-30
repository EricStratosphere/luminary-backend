import { Router } from "express";

const commentRouter = Router();

// GET all comments
commentRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all comments!"
    });
});

// GET comment by id
commentRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched comment by id!"
    });
});

// POST create comment
commentRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new comment!"
    });
});

// PUT update comment by id
commentRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated comment!"
    });
});

// DELETE comment by id
commentRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted comment!"
    });
});

export default commentRouter;
