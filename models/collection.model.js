import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            minLength : 10,
            maxLength : 40,
        },
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
            index : true,
        },
        copy_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Collection',
            index : true
        },
        public : {
            type : Boolean,    
            required : true,        
            default : true
        }
    }
)

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;