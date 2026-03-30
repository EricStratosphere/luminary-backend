import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true,
            minLength : 2,
            maxLength : 100,
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