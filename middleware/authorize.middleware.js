function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log("auth middleware called!");
    //console.log(token);
    if(!token){ 
        return res.status(401).json({
        success : false,
        message : "Failed to authenticate. Token invalid."
        })
    }
    next();
}


export {authenticateToken}