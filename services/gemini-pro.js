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
            contents : prompt
        }
    )
    if(!result){
        throw new Error("Error generating content.");
    }
    const text = result.text;
    console.log("result", result);
    if(!result.text){
        throw new Error("Result is empty!");
    }
    return text;
}

export default prompt;