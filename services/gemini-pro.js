import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env.js";

const genAI = new GoogleGenAI(
    {
        apiKey : GEMINI_API_KEY
    }
);

async function prompt(prompt){
    const result = await genAI.models.generateContent(
        {
            model : "gemini-3-flash-preview",
            contents : (prompt + "Format in simple text. Don't add things like asterisks to make the text bold.")
        }
    )
    if(!result){
        throw new Error("Error generating content.");
    }
    const text = result.text;
    console.log("result", result);
    console.log("result text", result.text);
    if(!result.text){
        throw new Error("Result is empty!");
    }
    return text;
}

export default prompt;