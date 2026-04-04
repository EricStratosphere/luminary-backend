import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {   
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            require : true,
            index : true,
        },
        book_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Book',
            require : true,
            index : true,
        },
        like_count : {
            type : Number,
            default : 0,
        },
        rating : {
            type : Number,
            enum : [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
            require : false,
        },
        content : {
            type : String,
            require : true,
        },
        replying_to : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment',
            require : false,
        },
    }, {timestamps : true}
)


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;