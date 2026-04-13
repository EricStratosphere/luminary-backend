import { Router } from "express";
import { logIn, signOut, signUp, refresh } from "../controllers/authentication.controller.js";
const authRouter = Router();


authRouter.post('/login', logIn);

authRouter.post('/signout', signOut);

authRouter.post('/signup', signUp);

authRouter.post('/refresh/:id', refresh);

export default authRouter;