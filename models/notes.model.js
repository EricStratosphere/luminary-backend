import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    book_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        required : true,
        index : true,
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
        index : true,
    },
    noteContent : {
        type : String,
        minLength : 1,
        required : true,
    },
    page : {
        type : Number,
        required : true,
    }
})

const Notes = mongoose.model('Notes', NoteSchema);

export default Notes;