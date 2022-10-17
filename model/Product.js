const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    charges: {
        gst: {
            type: Number,
            required: true
        },
        delivery: {
            type: Number,
            required: true
        }
    },
    finalPrice: {
        type: Number,
        required: true
    }

});
module.exports = mongoose.model("product", ProductSchema)