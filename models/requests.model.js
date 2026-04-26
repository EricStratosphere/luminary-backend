import {Schema, model} from 'mongoose';

const requestModel = new Schema(
    {
        book_id : {
            type : Schema.Types.ObjectId,
            ref : 'Book',
            required : true,
        },
        user_id : {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true,
        },
        request : {
            type : String,
            required : true
        },
        image_url : {
            type : String,
            required : false
        }
    }, {timestamps : true}
)

const Request = model('Request', requestModel);

export default Request;