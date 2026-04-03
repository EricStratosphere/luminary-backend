import CollectionEBook from "../models/collectionebook.model.js";

export const getCollectionEBooks = async (req, res) => {
    try {
        const collectionEBooks = await CollectionEBook.find().populate('collection_id').populate('book_id');
        res.status(200).json({
            success: true,
            data: collectionEBooks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCollectionEBooksByCollectionId = async (req, res) => {
    try {
        const collectionEBooks = await CollectionEBook.find({ collection_id: req.params.collectionId }).populate('collection_id').populate('book_id');
        if (!collectionEBooks || collectionEBooks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No ebooks found for this collection!"
            });
        }
        res.status(200).json({
            success: true,
            data: collectionEBooks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCollectionEBook = async (req, res) => {
    try {
        const collectionEBook = await CollectionEBook.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: collectionEBook,
            message: "Created new collection ebook!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create collection ebook!"
        });
    }
};

export const updateCollectionEBook = async (req, res) => {
    try {
        const collectionEBook = await CollectionEBook.findById(req.params.id);
        if (!collectionEBook) {
            throw new Error('Collection ebook does not exist!');
        }
        const updatedData = req.body;
        if (updatedData.collection_id) {
            collectionEBook.collection_id = updatedData.collection_id;
        }
        if (updatedData.book_id) {
            collectionEBook.book_id = updatedData.book_id;
        }

        await collectionEBook.save();
        return res.status(200).json({
            success: true,
            message: "Collection ebook successfully updated",
            data: collectionEBook
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};

export const deleteCollectionEBook = async (req, res) => {
    try {
        const deletedCollectionEBook = await CollectionEBook.findByIdAndDelete(req.params.id);
        if (!deletedCollectionEBook) {
            throw new Error('Collection ebook not found!');
        }
        const responseJSON = {
            success: true,
            deletedData: deletedCollectionEBook
        };
        res.status(200).json(responseJSON);
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};