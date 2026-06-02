import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { encryptAuth } from "../authentication/encrypt.auth.js"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js"
import RefreshToken from "../models/refresh.model.js"
import { generateOTP, transporter, getMailOptions } from "../authentication/nodemailer.auth.js"
import OTP from "../models/otp.model.js"

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
};



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
};



export const getOTP = async(req, res) => {
    try{
        const OTPObject = generateOTP();
        const user = await User.findOne({email : req.body.email}, '-password');
        if(!user){
            throw new Error("Username not found!");
        }
        const otpData = await OTP.create(
            {
                user_id : user._id,
                otp : OTPObject
                
            }
        )
        if(otpData){

            const textContent = `Hello!\n Your OTP is ${OTPObject}.\nPlease input to complete authorization.\nThank you for using Luminary!`
            const mailOptions = getMailOptions(
                req.body.email,
                "OTP-Verification",
                textContent
            )
            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    throw err;
                }else{
                    return res.status(200).json(
                    {   
                        success : true,
                        email_info : info,
                        user_id : user._id,
                        otpData : otpData
                    }
                )        
                }
            })
            
        }
        else{
            throw new Error("Failed to save OTP!");
        }
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


export const getOTPSignUp = async(req, res) => {
    try{
        const OTPObject = generateOTP();
        const email = req.body.email;
        const otpData = await OTP.create(
            {
                otp : OTPObject
            }
        )
        if(otpData){
            const textContent = `Hello!\n Your OTP is ${OTPObject}.\nPlease input to complete authorization.\nThank you for using Luminary!`
            const mailOptions = getMailOptions(
                req.body.email,
                "OTP-Verification",
                textContent
            )
            transporter.sendMail(mailOptions, (err, info) => {
                if(err){
                    throw err;
                }else{
                    return res.status(200).json(
                    {   
                        success : true,
                        email_info : info,
                        user_id : user._id,
                        otpData : otpData
                    }
                )        
                }
            })
        }
        else{
            throw new Error("Failed to save OTP!");
        }
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

export const verifyOTP = async (req, res) => {
    try{
        const otpData = await OTP.findOne({otp : req.body.otp});
        if(!otpData){
            throw new Error("No OTP Found!");
        }
        const otp = req.body.otp;
        if(otpData){
            return res.status(200).json({
                success : true,
                data : otpData
            });
        }
        else{
            return res.status(401).json(
                {
                    success : false,
                    message : "Unauthorized OTP."
                }
            )
        }
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