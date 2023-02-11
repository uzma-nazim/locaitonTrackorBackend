const mongoose = require("mongoose");

const LocationScheme = new mongoose.Schema({
    
    lat: {
        type : Number
    },
    
    lng: {
        type : Number
    },





});

const LocationMoadal = mongoose.model("loaction", LocationScheme);

module.exports = LocationMoadal;