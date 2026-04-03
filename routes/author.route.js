import { Router } from "express";
import { getAuthors, getAuthorById, postAuthor, updateAuthor, deleteAuthor, getAuthorByName } from "../controllers/author.controller.js";
const authorRouter = Router();

// GET all authors
authorRouter.get('/', getAuthors);

// GET author by id
authorRouter.get('/getbyid/:id', getAuthorById);

authorRouter.get('/getbyname/:search_text', getAuthorByName);
// POST create author
authorRouter.post('/', postAuthor);

// PUT update author by id
authorRouter.put('/:id', updateAuthor);

// DELETE author by id
authorRouter.delete('/:id', deleteAuthor);

export default authorRouter;
