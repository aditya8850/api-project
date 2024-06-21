import mongoose from "mongoose";
//import model to use from the schema file
import { UserSchemaModel } from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";


export default class UserRepository {
    async signUp(user) {
        try {
            const newUser = new UserSchemaModel(user);
            await newUser.save();
            return newUser
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error
            } else {
                console.log(error);
                throw new ApplicationError("Something went wrong while registering", 400)
            }

        }
    }


    async findByEmail(email) {
        // now in order to store the data in a db
        try {
            return await UserSchemaModel.findOne({ email });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("something went wrong with db", 500)
        }

    }
    async resetPassword(userId, newPassword) {
        try {
            let user = await UserSchemaModel.findById(userId);
            if (user) {
                user.password = newPassword;
                await user.save();
            } else {
                throw new Error("User not found")
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong while updating password.", 400)
        }
    }
}