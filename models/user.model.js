import mongoose from "mongoose";

const userSchema = mongoose.Schema(
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
            match : [/\S+@\S+\/\S+/, 'Please fill a valid email address'],            
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