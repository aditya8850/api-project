import mongoose from "mongoose";
import dotenv  from "dotenv";
dotenv.config();
import { categorySchema } from "../features/product/category.schema.js";
const url = process.env.DB_URL;

export const connectUsingMongoose = async() => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB using Mongoose");
        addCategories()
    } catch (error) {
        console.log(error);
    }
}

//a fucntion to pre-populate categories
async function addCategories(){
    const CategoryModel = mongoose.model("Category",categorySchema);
    const categories = await CategoryModel.find();
    if(!categories || categories.length == 0){
        await CategoryModel.insertMany([{name:'Books'},{name:'Clothing'},{name:'Electronics'}])
        console.log("cateogies added");
    }else{
        console.log("categories already exist");
    }
    
}