const mongoose = require('mongoose')

var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    quantity: {
        type: Number,
        required: true
    },
    images: {
        type: Array
    },
    color: {
        type: String,
        enum: ["Black", "Brown", "Red"]
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Lenovo"]
    },
    sold: {
        type: Number,
        default: 0
    },
    ratings: [{
        star: Number,
        postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }]
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)