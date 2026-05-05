import { Router } from "express";
import { logIn, signOut, signUp, refresh, getOTP, verifyOTP } from "../controllers/authentication.controller.js";

const authRouter = Router();


authRouter.post('/login', logIn);

authRouter.post('/signout', signOut);

authRouter.post('/signup', signUp);

authRouter.post('/refresh/', refresh);

authRouter.post('/get-otp', getOTP);

authRouter.post('/verify-otp', verifyOTP);

export default authRouter;