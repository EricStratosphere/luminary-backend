import { Router } from "express";
import { getComments, getCommentsByBookId, createComment, updateComment, deleteComment } from "../controllers/comment.controller.js";

const commentRouter = Router();

// GET all comments
commentRouter.get('/', getComments);

// GET comments by book id
commentRouter.get('/book/:bookId', getCommentsByBookId);

// POST create comment
commentRouter.post('/', createComment);

// PUT update comment by id
commentRouter.put('/update/:id', updateComment);

// DELETE comment by id
commentRouter.delete('/delete/:id', deleteComment);

export default commentRouter;
