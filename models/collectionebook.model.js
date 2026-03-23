import mongoose from "mongoose";

const collectionEBookSchema = mongoose.Schema(
    {
        collection_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Collection',
            required : true,
            index : true,
        },

        book_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book',
            required : true,
            index : true,
        }
    }
)

const CollectionEBook = mongoose.model('CollectionEBook', collectionEBookSchema);

export default CollectionEBook;