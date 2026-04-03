import { Router } from "express";
import { getBooks, getBookById, getBooksByAuthorId, postBook, updateBook, deleteBook, getBooksByName } from "../controllers/book.controller.js";

const bookRouter = Router();

// GET all books
bookRouter.get('/', getBooks);

// GET book by id
bookRouter.get('/getbyid/:id', getBookById);

// GET book by author
bookRouter.get('/getbyauthor/:id', getBooksByAuthorId);

// GET books by name

bookRouter.get('/getbyname/:search_text', getBooksByName);

// POST create book
bookRouter.post('/', postBook);

// PUT update book by id
bookRouter.put('/update/:id', updateBook);


// DELETE book by id
bookRouter.delete('/delete/:id', deleteBook);

export default bookRouter;