
const mongoose = require("mongoose");


const colorschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Hexcode: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    status: {
         type: Boolean,
         default: true 
        }
}, { timestamps: true });


const colormodel = mongoose.model('color', colorschema)
module.exports = colormodel;