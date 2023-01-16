const mongoose = require("mongoose");

const deviceSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userId: String
})

const DeviceModel = mongoose.model("device", deviceSchema);

module.exports = {
    DeviceModel
}