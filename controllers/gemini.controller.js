import prompt from "../services/gemini-pro.js"
import mongoose from "mongoose";
import Request from "../models/requests.model.js";
import Response from "../models/response.model.js";
export const promptText = async (req, res) => {
    const session = await mongoose.startSession();
    try{
        await session.withTransaction(async() => {
            if(req.body.image_url){
                var request = await Request.create({
                book_id : req.body.book_id,
                user_id : req.body.user_id,
                request : req.body.prompt,
                image_url : req.body.image_url
                });
            }
            else{
                var request = await Request.create({
                book_id : req.body.book_id,
                user_id : req.body.user_id,
                request : req.body.prompt
                });
            }
            if(!request){
                throw new Error("Failed to process request!");
            }
            var result;
            if(req.body.image_url){
                console.log("req.body.image_url exists!");
                result = await prompt(req.body.prompt, req.body.image_url);
            }
            else{
                result = await prompt(req.body.prompt);
            }
            if(typeof result === 'string' && result.trim().length === 0){
                throw new Error("No API response generated!");
            }
            const response = await Response.create({
                book_id : req.body.book_id,
                user_id : req.body.user_id,
                response : result
            });
            res.status(200).json(
                {
                    success : true,
                    requestData : request,
                    responseData : response
                }
            )
        })
    }
    catch(error){
        return res.status(500).json(
            {
                success : false,
                message : error.message
            }
        )
    }
    finally{
        session.endSession();
    }
}

export const getConversation = async (req, res) => {
    try{
        const { book_id, user_id } = req.params;

        // Fetch requests and responses by book_id and user_id
        const requests = await Request.find({ book_id, user_id });
        const responses = await Response.find({ book_id, user_id });

        // Sort both arrays by createdAt in chronological order
        requests.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        responses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Concatenate both arrays and sort again
        const conversation = [...requests, ...responses].sort((a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt)
        );

        return res.status(200).json({
            success: true,
            conversation
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}