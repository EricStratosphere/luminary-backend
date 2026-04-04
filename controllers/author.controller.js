import Author from "../models/author.model.js";

export const getAuthors = async(req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({
            success : true,
            data : authors
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: author
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const postAuthor = async(req, res) => {
    try{
        const author = await Author.create(
            {...req.body}
        )
        res.status(201).json(
            {
                success : true,
                data : author,
                message : "Created new author!"
            }
        )
    }
    catch(error){
        res.status(500).json(
            {
                success : false,
                message : error.message || "Failed to create author!"
            }
        )
    }
}

export const getAuthorByName = async(req, res) => {
    try{
        const search = req.query.q;
        if (!search || !search.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search text is required"
            });
        }
        const searchRegex = new RegExp(search);
        var result = await Author.find({'name' : { "$regex" : searchRegex, "$options" : 'i'}});
        if(!result){
            const error = new Error("Failed to fetch Author by name!");
            throw error;
        }
        return res.status(200).json(
            {
                success : true,
                data : result,
            }
        )
    }
    catch(error){
        return res.status(404).json(
            {
                success : false,
                errorMsg : error.message
            }
        )
    }
}

export const updateAuthor = async(req, res) => {
    try{
        const author = await Author.findById(req.params.id);
        if(!author){
            const error = new Error('Author does not exist!');
            throw error;
        }
        const prevAuthor = req.body;
        if(prevAuthor.author_img_url){
            author.author_img_url = prevAuthor.author_img_url;
        }
        if(prevAuthor.name){
            author.name = prevAuthor.name;
        } 
        if(prevAuthor.author_description){
            author.author_description = prevAuthor.author_description;
        }

        author.save();
        return res.status(200).send({
            success : true,
            message : "author successfully updated",
            data : author
        })
    }
    catch(error){
        return res.status(404).json({
            success : false,
            errorMsg : error.message
        })
    }
}

export const deleteAuthor = async (req, res) => {
    try{
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if(!deletedAuthor){
            const error = new Error('Artwork not found!');
            throw new error;
        }
        const responseJSON = {
            success : true,
            deletedData : deletedAuthor
        }
        res.status(200).json(responseJSON);
    }
    catch(error){
        return res.status(404).json({
            success : false,
            errorMsg : error.message
        })
    }
}