import mongoose from "mongoose";
//import model to use from the schema file
import { UserSchemaModel } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";


export default class UserRepository{
    async signUp(user){
        try {
            const newUser = new UserSchemaModel(user);
            await newUser.save();
            return newUser
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong while registering",400)
        }
    }

    async signIn(email,password){
        try {
            return await UserSchemaModel.findOne({email,password})
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Error loggingin!",400)

        }
    }
    async findByEmail(email) {
        // now in order to store the data in a db
        try {
            return await UserSchemaModel.findOne({email});
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with db", 500)
        }

    }
}