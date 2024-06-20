import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['customer', 'seller'].to
    }
})

//creating model from Schema
export const UserSchemaModel = mongoose.model('User',userSchema)