import { Router } from "express";

const collectionBookRouter = Router();

// GET all collection-books
collectionBookRouter.get('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched all collection books!"
    });
});

// GET collection-book by id
collectionBookRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched collection book by id!"
    });
});

// POST create collection-book
collectionBookRouter.post('/', (req, res, next) => {
    return res.json({
        success: true,
        message: "Created new collection book!"
    });
});

// PUT update collection-book by id
collectionBookRouter.put('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Updated collection book!"
    });
});

// DELETE collection-book by id
collectionBookRouter.delete('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Deleted collection book!"
    });
});

export default collectionBookRouter;
