import {Schema, model} from 'mongoose';

const responseModel = new Schema(
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
        response : {
            type : String,
            required : true
        }
    }, {timestamps : true}
)

const Request = model('Response', responseModel);

export default Response;