import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import jwt from 'jsonwebtoken';
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log("auth middleware called!");
    //console.log(token);
    if(!token){ 
        return res.status(401).json({
        success : false,
        message : "Failed to authenticate. Token undefined."
        })
    }
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({
                success : false,
                message : "Unauthorized token. Token invalid."
            })
        }
        next();
    });
    
}


export {authenticateToken}