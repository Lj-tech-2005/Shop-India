

const mongoose = require("mongoose")



const categorySchema = new mongoose.Schema(
    {

        name: {

            type: String,
            require: true,
            trim: true,
            unique: true,

        },
        slug: {

            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },
        categoryImage: {

            type: String,
            require: true,

        },
        status: {

            type: Boolean,
            default: true,
        },

    },
    {
        timestamps: true,

    }

)

const categorymodel = mongoose.model('category', categorySchema)

module.exports = categorymodel