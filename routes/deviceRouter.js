const express = require("express");
const {DeviceModel} = require("../models/device.model")

const deviceRouter = express();

deviceRouter.get("/", async(req, res)=>{
    const query = req.query;
    try{
        const devices = await DeviceModel.find(query);
        res.send(devices)
    }catch(err){
        res.send("Data couldn't be loaded")
        console.log(err)
    }
})

deviceRouter.post("/create", async (req,res)=>{
    const payload = req.body;
    try{
        const device = new DeviceModel(payload);
        await device.save();
        res.send("Device created successfully")
    }catch(err){
        console.log("Couldn't create the device")
        console.log(err)
    }
})

deviceRouter.patch("/update/:id", async (req,res)=>{
    const payload = req.body;
    const id = req.params.id
    const deviceData =  await DeviceModel.find({_id:id})
    const userId_in_Data = deviceData[0].userId
    const userId_in_req = req.body.userId;
    try{
        if(userId_in_req === userId_in_Data){
            await DeviceModel.findByIdAndUpdate({_id:id},payload);
            res.send("Data updated successfully");
        }else{
            res.send("You are not authorized") 
        }
    }catch(err){
        res.send("Couldn't update the device")
        console.log(err)
    }
})

deviceRouter.delete("/delete/:id", async (req,res)=>{
    const id = req.params.id
    const deviceData =  await DeviceModel.find({_id:id})
    const userId_in_Data = deviceData[0].userId
    const userId_in_req = req.body.userId;
    try{
        if(userId_in_req === userId_in_Data){
            await DeviceModel.findByIdAndDelete({_id:id});
            res.send("Data Deleted successfully");
        }else{
            res.send("You are not authorized") 
        }
    }catch(err){
        res.send("Couldn't Delete the device")
        console.log(err)
    }
})

module.exports = {
    deviceRouter 
}