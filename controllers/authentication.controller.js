import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { encryptAuth } from "../authentication/encrypt.auth.js"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js"
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
            throw new Error('E-mail does not exist! User not found');
        }
        const logInSuccessful = await bcrypt.compare(req.body.password, user.password);
        if(logInSuccessful){
            const accessToken = jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET, {expiresIn : '3600s'});
            const refreshToken = jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET, {expiresIn : '7d'})
            return res.status(200).json(
                {
                    success : true,
                    message : "login successful!",
                    access_token : accessToken,
                    refresh_token : refreshToken
                }
            )
        }else{
            throw new Error('Incorrect password!');
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

}