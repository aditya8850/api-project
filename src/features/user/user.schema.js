import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']

    },
    password: {
        type: String,
        required: true,
        // minlength: 8,
        // maxlength: 12,
        validate:{
            validator:function(value){
                return /^.{8,}$/.test(value);
            },
            message:"Password should be between 8 and 12 characters"
        }
    },
    type: {
        type: String,
        enum: ['customer', 'seller']
    }
})


//creating model from Schema
export const UserSchemaModel = mongoose.model('User',userSchema)