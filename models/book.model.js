import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        book_title : {
            type : String,
            required : [true, 'Book title is required'],
            trim : true,
            minLength : 1,
            maxLength : 200,
        },
        book_author_id : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Author",
                required : true,
                index : true,
            }
        ],
        date_published : {
            type : Date,
            required : true,
            validate : {
                validator : (value) => {return value <= new Date()},
                messaage : "Start date must be in the past!"
            },
            default : new Date()
        },
        genre : [
            {
                type : String,
                enum : ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Biography', 'History', 'Romance', 'Horror'],
                required : true
            }
        ],
        description : {
            type : String,
            required : [true, 'Please specify a description'],
            maxLength : 1000,
        },
        image_url : {
            type : String,
            required : true,
            unique : true,
        },
        pdf_url : {
            type : String,
            required : true,
            unique : true,
        }
    }
)

const Book = mongoose.model('Book', bookSchema);

export default Book;