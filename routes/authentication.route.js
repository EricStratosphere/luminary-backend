import { Router } from "express";
import { logIn, signOut, signUp } from "../controllers/authentication.controller.js";
const authRouter = Router();


authRouter.post('/login', logIn);

authRouter.post('/signout', signOut);

authRouter.post('/signup', signUp);


export default authRouter;