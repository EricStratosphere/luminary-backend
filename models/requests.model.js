import {Schema, model} from 'mongoose';

const requestModel = new Schema(
    {
        book_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book',
            required : true,
        },
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
        },
        request : {
            type : String,
            required : true
        }
    }, {timestamps : true}
)