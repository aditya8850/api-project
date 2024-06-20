import mongoose from "mongoose";
export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    sizes:{
    },
    inStock: Number
})