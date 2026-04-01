import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
            unique : true,
            minLength : 2,
            maxLength : 100,
        },
        author_img_url:{
            type : String,
        },
        author_description : {
            type : String,
            trim : true,
            maxLength : 500,
        }
    }, {timestamps: true}
)

const Author = mongoose.model('Author', authorSchema);

export default Author;