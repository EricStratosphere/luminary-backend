import { Router } from "express";
import { logIn, signOut, signUp, refresh, logInGoogle, getCode } from "../controllers/authentication.controller.js";
const authRouter = Router();


authRouter.post('/login', logIn);

authRouter.post('/signout', signOut);

authRouter.post('/signup', signUp);

authRouter.post('/refresh/', refresh);

authRouter.get('/login-google', logInGoogle);

authRouter.get('/oauth', getCode);
export default authRouter;