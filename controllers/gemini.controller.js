import prompt from "../services/gemini-pro.js"
import mongoose from "mongoose";
import Request from "../models/requests.model.js";
import Response from "../models/response.model.js";
export const promptText = async (req, res) => {
    const session = await mongoose.startSession();
    try{
        await session.withTransaction(async() => {
            const request = await Request.create({
            book_id : req.body.book_id,
            user_id : req.body.user_id,
            request : req.body.prompt
            });
            if(!request){
                throw new Error("Failed to process request!");
            }
            const result = await prompt(req.body.prompt);
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
        
    }
    catch(error){

    }
}