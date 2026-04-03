import { Router } from "express";
import { getCollectionsByUserId, getCollectionById, postCollection, updateCollection, deleteCollection } from "../controllers/collection.controller.js";

const collectionRouter = Router();

// GET collections by user id
collectionRouter.get('/user/:user_id', getCollectionsByUserId);

// GET collection by id
collectionRouter.get('/:id', getCollectionById);

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
