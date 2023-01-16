const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    console.log("The token is :-", token);
    if(token){
        const decode = jwt.verify(token, process.env.key);
        if(decode){
            console.log("This is decode",decode);
            const userId = decode.userId;
            req.body.userId = userId;
            next();
        }else{
            res.send("Please login first")
        }
    }else{
        res.send("Please login first")
    }
}

module.exports = {
    authenticate
}