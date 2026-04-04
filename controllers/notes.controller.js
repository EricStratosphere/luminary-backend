import Notes from "../models/notes.model.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: note
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getNotesByBookIdAndUserId = async (req, res) => {
    try {
        const notes = await Notes.find({ book_id: req.params.bookId, user_id: req.params.userId });
        if (!notes || notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found for this book and user!"
            });
        }
        res.status(200).json({
            success: true,
            data: notes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const note = await Notes.create({ ...req.body });
        res.status(201).json({
            success: true,
            data: note,
            message: "Created new note!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create note!"
        });
    }
};

export const updateNote = async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            throw new Error('Note does not exist!');
        }
        const updatedData = req.body;
        if (updatedData.book_id) {
            note.book_id = updatedData.book_id;
        }
        if (updatedData.user_id) {
            note.user_id = updatedData.user_id;
        }
        if (updatedData.noteContent) {
            note.noteContent = updatedData.noteContent;
        }
        if (updatedData.page !== undefined) {
            note.page = updatedData.page;
        }

        await note.save();
        return res.status(200).json({
            success: true,
            message: "Note successfully updated",
            data: note
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            throw new Error('Note not found!');
        }
        const responseJSON = {
            success: true,
            deletedData: deletedNote
        };
        res.status(200).json(responseJSON);
    } catch (error) {
        return res.status(404).json({
            success: false,
            errorMsg: error.message
        });
    }
};