import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('user_id');
        res.status(200).json({
            success: true,
            data: comments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentsByBookId = async (req, res) => {
    try {
        const comments = await Comment.find({ book_id: req.params.bookId }).populate('user_id');
        if (!comments || comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No comments found for this book!"
            });
        }
        res.status(200).json({
            success: true,
            data: comments
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const comment = await Comment.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: comment,
            message: "Created new comment!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create comment!"
        });
    }
};

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            throw new Error('Comment does not exist!');
        }
        const updatedData = req.body;
        if (updatedData.user_id) {
            comment.user_id = updatedData.user_id;
        }
        if (updatedData.book_id) {
            comment.book_id = updatedData.book_id;
        }
        if (updatedData.like_count !== undefined) {
            comment.like_count = updatedData.like_count;
        }
        if (updatedData.rating !== undefined) {
            comment.rating = updatedData.rating;
        }
        if (updatedData.content) {
            comment.content = updatedData.content;
        }
        if (updatedData.replying_to) {
            comment.replying_to = updatedData.replying_to;
        }

        await comment.save();
        return res.status(200).json({
            success: true,
            message: "Comment successfully updated",
            data: comment
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            throw new Error('Comment not found!');
        }
        const responseJSON = {
            success: true,
            deletedData: deletedComment
        };
        res.status(200).json(responseJSON);
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};