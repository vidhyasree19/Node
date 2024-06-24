const mongoose = require('mongoose');
const DataSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    mobileNumber:Number,
    email:String
});
const DataModel = mongoose.model('user_data',DataSchema);
module.exports = DataModel;