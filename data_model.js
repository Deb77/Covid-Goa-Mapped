const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    shopname: {type:String, required:true},
    home_delivery: {type:Boolean, required:true},
    phone_numder: {type:Number,required:true},
    last_open: Date,
    latitude: Number,
    longitude: Number
});
const Data = mongoose.model('Data', dataSchema);
module.exports = Data;