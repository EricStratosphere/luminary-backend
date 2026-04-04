import Bookmark from "../models/bookmark.model.js";

export const getBookmarkByBookAndUserId = async (req, res) => {
    try {
        const { book_id, user_id } = req.params;
        const bookmark = await Bookmark.findOne({
            book_id,
            user_id
        });
        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found for the given book and user ids!"
            });
        }
        res.status(200).json({
            success: true,
            data: bookmark
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookmarkById = async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found!"
            });
        }
        return res.status(200).json({
            success: true,
            data: bookmark
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const postBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: bookmark,
            message: "Created new bookmark!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark does not exist!"
            });
        }

        const updates = req.body;
        if (updates.book_id !== undefined) bookmark.book_id = updates.book_id;
        if (updates.user_id !== undefined) bookmark.user_id = updates.user_id;
        if (updates.page !== undefined) bookmark.page = updates.page;

        await bookmark.save();
        res.status(200).json({
            success: true,
            message: "Bookmark successfully updated",
            data: bookmark
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBookmark = async (req, res) => {
    try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id);
        if (!deletedBookmark) {
            return res.status(404).json({
                success: false,
                message: "Bookmark not found!"
            });
        }
        res.status(200).json({
            success: true,
            deletedData: deletedBookmark
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
