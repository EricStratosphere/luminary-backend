import Book from "../models/book.model.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const postBook = async (req, res) => {
    try {
        const book = await Book.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: book,
            message: "Created new book!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create book!"
        });
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book does not exist!"
            });
        }
        const updates = req.body;
        if (updates.book_title !== undefined) book.book_title = updates.book_title;
        if (updates.book_author_id !== undefined) book.book_author_id = updates.book_author_id;
        if (updates.date_published !== undefined) book.date_published = updates.date_published;
        if (updates.genre !== undefined) book.genre = updates.genre;
        if (updates.description !== undefined) book.description = updates.description;
        if (updates.image_url !== undefined) book.image_url = updates.image_url;
        if (updates.pdf_url !== undefined) book.pdf_url = updates.pdf_url;

        await book.save();
        res.status(200).json({
            success: true,
            message: "Book successfully updated",
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found!"
            });
        }
        res.status(200).json({
            success: true,
            deletedData: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};