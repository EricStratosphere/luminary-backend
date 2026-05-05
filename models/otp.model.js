import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true,
            index : true
        },
        otp : {
            type : Number,
            required : true,
            min : 100000,
            max : 999999
        },        
        expiresAt : {
            type : Date,
            default : Date.now(),
            expires : 60*5,
            required : true
        }
    }
);

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;