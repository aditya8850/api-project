import { ObjectId } from "mongodb";
import mongoose from "mongoose";
export const cartItemsSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    userdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    quantity:{
        type:Number 
    }
})