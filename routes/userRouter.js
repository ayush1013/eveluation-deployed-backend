const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
require("dotenv").config();

const userRouter = express();

userRouter.post("/register", async (req, res) => {
    const { email, name, gender, password } = req.body;
    try {
        const userData = await UserModel.find({ email })
        if (userData.length > 0) {
            res.send("User already exist");
        } else {
            try {
                bcrypt.hash(password, 4, async (err, hashPass) => {
                    const user = new UserModel({ email, password: hashPass, gender, name });
                    await user.save();
                    res.send("Register successful");
                })
            }catch(err){
                res.send("Couldn't Sign up")
            }
        }
    } catch (err) {
        res.send("Couldn't Sign up")
        console.log(err)
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    try{
        const userData = await UserModel.find({ email })
        if (userData.length > 0) {
            bcrypt.compare(password, userData[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userId:userData[0]._id}, process.env.key)
                    res.send({"msg": "Login Success", "token": token})
                }
            })
        } else {
            res.send("Wrong credentials");
        }
    }catch(err){
        res.send("Couldn't Log in")
        console.log(err)
    }
})

module.exports = {
    userRouter
}
