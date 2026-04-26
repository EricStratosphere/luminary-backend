import { Router } from "express";
import { promptText, getConversation } from "../controllers/gemini.controller.js";
const geminiAPIRouter = Router();

geminiAPIRouter.post('/prompt-text', promptText);
geminiAPIRouter.get('/conversation/:book_id/:user_id', getConversation);

export default geminiAPIRouter;