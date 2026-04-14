import mongoose from "mongoose";

const refreshSchema = new mongoose.Schema(
    {
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
            index : true
        },
        refresh_token : {
            type : String,
            required : true
        }
    }
)

const RefreshToken = mongoose.model('RefreshToken', refreshSchema);

export default RefreshToken;