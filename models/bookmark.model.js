import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
    {
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
        }
    }
)

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;