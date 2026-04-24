import { Router } from "express";
import { promptText } from "../controllers/gemini.controller.js";
const geminiAPIRouter = Router();

geminiAPIRouter.post('/prompt-text', promptText);

export default geminiAPIRouter;