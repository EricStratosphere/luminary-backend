import { Router } from "express";
import { getAuthors, postAuthor, updateAuthor, deleteAuthor } from "../controllers/author.controller.js";
const authorRouter = Router();

// GET all authors
authorRouter.get('/', getAuthors);

// GET author by id
authorRouter.get('/:id', (req, res, next) => {
    return res.json({
        success: true,
        message: "Fetched author by id!"
    });
});

// POST create author
authorRouter.post('/', postAuthor);

// PUT update author by id
authorRouter.put('/:id', updateAuthor);

// DELETE author by id
authorRouter.delete('/:id', deleteAuthor);

export default authorRouter;
