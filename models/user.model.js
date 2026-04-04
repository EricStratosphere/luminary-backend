import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            minLength : 2,
            maxLength : 50
        },
        email : {
            type : String,
            required : [true, 'User Email is required'],
            unique : true,
            maxLength : 255,
            match : [/\S+@\S+\.\S+/, 'Please fill a valid email address'],            
        },
        password : {
            type : String,
            required : [true, 'User password is required'],
            minLength : 6,
        },
        is_admin : {
            type : Boolean,
            default : false,
        },
        is_writer : {
            type : Boolean,
            default : false,
        }
    }, {timestamps : true}
)
const User = mongoose.model('User', userSchema);
export default User;

/*
Something to consider in the future is when you make a schema or a caching system for the continue_reading feature.

The attributes should contain as follows:

book_id : {type : mongoose.Schema.Types.ObjectId, ref : 'Book'}
page : Number
*/