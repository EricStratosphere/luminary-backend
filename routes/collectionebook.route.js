import { Router } from "express";
import { getCollectionEBooks, getCollectionEBooksByCollectionId, createCollectionEBook, updateCollectionEBook, deleteCollectionEBook } from "../controllers/collectionebook.controller.js";

const collectionEBookRouter = Router();

// GET all collection ebooks
collectionEBookRouter.get('/', getCollectionEBooks);

// GET collection ebooks by collection id
collectionEBookRouter.get('/getbycollectionid/:collectionId', getCollectionEBooksByCollectionId);

// POST create collection ebook
collectionEBookRouter.post('/', createCollectionEBook);

// PUT update collection ebook by id
collectionEBookRouter.put('/update/:id', updateCollectionEBook);

// DELETE collection ebook by id
collectionEBookRouter.delete('/delete/:id', deleteCollectionEBook);

export default collectionEBookRouter;