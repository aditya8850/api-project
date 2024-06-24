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
        type: String
    },
    // category: {
    //     type: Array,
    //     required: true
    // },
    sizes: {
    },
    inStock: Number,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    ]
})