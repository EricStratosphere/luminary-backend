import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';
import RefreshToken from "../models/refresh.model.js";
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    const token = authHeader && authHeader.split(' ')[1];
    //the authHeader && implies to check if authHeader is not undefined first before performing the split function.
    //console.log("auth middleware called!");
    //console.log(token);
    if(!token){ 
        return res.status(401).json({
        success : false,
        message : "Failed to authenticate. Token undefined."
        })
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err){
            return res.status(401).json({
                success : false,
                message : "Unauthorized token. Token invalid."
            })
        }
        next();
    });
    
}

export default authenticateToken;