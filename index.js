const express = require("express");
const { connection } = require("./config/db");
const {userRouter} = require("./routes/userRouter");
const {deviceRouter} = require("./routes/deviceRouter");
const {authenticate} = require("./middlewares/authenticate");
require("dotenv").config();
const cors = require("cors")

const app = express();

app.use(express.json());

app.use(cors())

app.get("/", (req,res)=>{
    res.send("Welcome")
})

app.use("/users",userRouter);

app.use(authenticate);

app.use("/posts", deviceRouter);

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("Connected successfully")
    }catch(err){
        console.log("Error while connecting to the database")
        console.log(err)
    }
    console.log(`This server is running at port ${process.env.port}`)
})