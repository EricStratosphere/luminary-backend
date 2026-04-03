import { Router } from "express";
import { getBookmarkByBookAndUserId, getBookmarkById, postBookmark, updateBookmark, deleteBookmark } from "../controllers/bookmark.controller.js";

const bookmarkRouter = Router();

// GET bookmark by book id and user id
bookmarkRouter.get('/book/:book_id/user/:user_id', getBookmarkByBookAndUserId);

// GET bookmark by id
bookmarkRouter.get('/getbyid/:id', getBookmarkById);

// POST create bookmark
bookmarkRouter.post('/', postBookmark);

// PUT update bookmark by id
bookmarkRouter.put('/update/:id', updateBookmark);

// DELETE bookmark by id
bookmarkRouter.delete('/delete/:id', deleteBookmark);

export default bookmarkRouter;

