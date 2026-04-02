import { Router } from "express";
import { getBooks, getBookById, getBooksByAuthorId, postBook, updateBook, deleteBook } from "../controllers/book.controller.js";

const bookRouter = Router();

// GET all books
bookRouter.get('/', getBooks);

// GET book by id
bookRouter.get('/:id', getBookById);

bookRouter.get('/getbyauthor/:id', getBooksByAuthorId);
// POST create book
bookRouter.post('/', postBook);

// PUT update book by id
bookRouter.put('/:id', updateBook);


// DELETE book by id
bookRouter.delete('/:id', deleteBook);

export default bookRouter;