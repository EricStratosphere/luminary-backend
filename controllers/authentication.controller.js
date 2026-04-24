import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { encryptAuth } from "../authentication/encrypt.auth.js"
import { ACCESS_TOKEN_SECRET, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN_SECRET } from "../config/env.js"
import RefreshToken from "../models/refresh.model.js"
import initalizePassport from "../config/passport.js"

import { OAuth2Client } from "google-auth-library"

const passport = initializePassport();

export const signUp = async (req, res) =>{
    console.log("sign up called!");
    try{
        const user = req.body;
        user.password = await encryptAuth(req.body.password);
        const createdUser = await User.create({...user});
        if(!createdUser){
            throw new Error('Failed to create user.');
        }
        return res.status(201).json({
            success : true,
            data : createdUser
        })
    }
    catch(error){
        return res.status(400).json({
            success : false,
            error : error.message
        });
    }
}

export const logIn = async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(!user){
            throw new Error('Incorrect credentials');
        }
        const logInSuccessful = await bcrypt.compare(req.body.password, user.password);
        if(logInSuccessful){
            delete user.password;
            const accessToken = jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET, {expiresIn : '3600s'});
            const refreshToken = jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET, {expiresIn : '7d'});
            const refreshTokenExists = await RefreshToken.exists(
                {
                    user_id : user._id
                }
            );
            if(refreshTokenExists){
                const updatedToken = await RefreshToken.findOne({user_id : user._id});
                updatedToken.refresh_token = refreshToken;
                await updatedToken.save();
                return res.status(200).json(
                        {
                            success : true,
                            message : "login successful! new access token generated",
                            access_token : accessToken,
                            refresh_token_data : updatedToken,
                            user : user
                        }
                    )
            }
            else{
                const createdToken = await RefreshToken.create(
                    {
                        user_id : user._id,
                        refresh_token : refreshToken
                    }
                );
                if(createdToken)
                {
                    return res.status(200).json(
                        {
                            success : true,
                            message : "login successful!",
                            access_token : accessToken,
                            refresh_token_data : createdToken,
                            user : user
                        }
                    )
                }
            }
        }else{
            throw new Error('Incorrect credentials');
        }
    }
    catch(error){
        return res.status(400).json(
            {
                success : false, 
                message : error.message
            }
        )
    }
}

export const signOut = async(req, res) => {
    try{
        const user_id = req.params.id;
        const signOut = await RefreshToken.delete({user_id : user_id});
        if(!signOut){
            throw new Error("Failed to sign out!");
        }
        return res.status(200).json(
            {
                success : true,
                message : "User logged out successfully."
            }
        )
    }
    catch(error){
        return res.status(500).json(
            {
                success : false,
                message : "Failed to log out user."
            }
        )
    }
}

export const refresh = async(req, res) => {
    try{
        const user_id = req.body.id;
        const refreshTokenData = await RefreshToken.findOne({user_id : user_id});
        if(!refreshTokenData){
            throw new Error("Refresh token not found.");
        }
        const refreshToken = refreshTokenData.refresh_token;
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, userId) => {
            if(err){
                return res.status(401).json(
                    {
                        success : false,
                        message : "Failed to refresh access token."
                    }
                )
            }
            const accessToken = jwt.sign({user_id : user_id}, ACCESS_TOKEN_SECRET, {expiresIn : '3600s'});
            return res.status(200).json(
                {
                    success : true,
                    message : "New Access Token Generated",
                    access_token : accessToken
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
}

export const logInGoogle = async(req, res) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    
    // const oAuth2Client = new OAuth2Client(
    //     CLIENT_ID,
    //     CLIENT_SECRET,
    //     REDIRECT_URI
    // )

    // const authorizeUrl = oAuth2Client.generateAuthUrl(
    //     {
    //         access_type : 'offline',
    //         scope : 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
    //         prompt : 'consent',
    //         expiresIn : '3600s'
    //     }
    // );

    // return res.status(200).json({url : authorizeUrl});
    passport.authenticate('google', {scope : ['email', 'profile']});
} 

async function getUserData(access_token){
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`);
    const data = await response.json();
    console.log("User_data: ", data);
    return {
        user_data : data
    }
}

export const getCode = async (req, res) => {
    const code = req.query.code;
    console.log("Code: ", code);
    try{
        const redirectUrl = REDIRECT_URI;
        const oAuth2Client = new OAuth2Client(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );
        const res = await oAuth2Client.getToken(code);
        console.log("Token: ", res);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Tokens acquired!');
        const user = oAuth2Client.credentials;
        console.log("User: ", user);
        const userData = await getUserData(oAuth2Client.credentials.access_token);
        console.log("Userdata:" , userData);
        
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}
