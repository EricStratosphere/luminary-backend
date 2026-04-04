import Collection from "../models/collection.model.js";

export const getCollectionsByUserId = async (req, res) => {
    try {
        const collections = await Collection.find({
            user_id: req.params.user_id
        });
        if (!collections || collections.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No collections found for this user!"
            });
        }
        res.status(200).json({
            success: true,
            data: collections
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: collection
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getCollectionsByName = async (req, res) => {
    try {
        const searchText = req.query.q;
        if (!searchText || !searchText.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search text is required"
            });
        }
        const regex = new RegExp(searchText, "i");
        const result = await Collection.find({ name: { $regex: regex } });

        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const postCollection = async (req, res) => {
    try {
        const collection = await Collection.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: collection,
            message: "Created new collection!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCollection = async (req, res) => {
    try {
        const collection = await Collection.findById(req.params.id);
        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection does not exist!"
            });
        }

        const updates = req.body;
        if (updates.name !== undefined) collection.name = updates.name;
        if (updates.user_id !== undefined) collection.user_id = updates.user_id;
        if (updates.copy_id !== undefined) collection.copy_id = updates.copy_id; 
        await collection.save();
        res.status(200).json({
            success: true,
            message: "Collection successfully updated",
            data: collection
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteCollection = async (req, res) => {
    try {
        const deletedCollection = await Collection.findByIdAndDelete(req.params.id);
        if (!deletedCollection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found!"
            });
        }
        res.status(200).json({
            success: true,
            deletedData: deletedCollection
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
