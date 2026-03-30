import { Router } from "express";

const collectionRouter = Router();

// GET all collections
collectionRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all collections!"
    });
});

// GET collection by id
collectionRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched collection by id!"
    });
});

// POST create collection
collectionRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new collection!"
    });
});

// PUT update collection by id
collectionRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated collection!"
    });
});

// DELETE collection by id
collectionRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted collection!"
    });
});

export default collectionRouter;
