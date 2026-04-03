import { Router } from "express";
import { getCollectionsByUserId, getCollectionById, getCollectionsByName, postCollection, updateCollection, deleteCollection } from "../controllers/collection.controller.js";

const collectionRouter = Router();

// GET collections by user id
collectionRouter.get('/user/:user_id', getCollectionsByUserId);

// GET collection by id
collectionRouter.get('/getbyid/:id', getCollectionById);

// GET collections by name
collectionRouter.get('/getbyname/:search_text', getCollectionsByName);

// POST create collection
collectionRouter.post('/', postCollection);

// PUT update collection by id
collectionRouter.put('/:id', updateCollection);

// DELETE collection by id
collectionRouter.delete('/:id', deleteCollection);

export default collectionRouter;
