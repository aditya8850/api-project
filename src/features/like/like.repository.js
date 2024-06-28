import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
const LikeModel = mongoose.model('Like', likeSchema)
export class LikeRepository {
    async getLikes(type,id){
        return await LikeModel.find({
            likeable: new ObjectId(id),
            on_model:type
        }).populate('user').populate({path:'likeable',model:type})
    }

    async likeProduct(userId, productId) {
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable:new ObjectId(productId),
                on_model:'Product'
            });
            console.log("Attempting to save new like:", newLike);

            await newLike.save();

            console.log("New like saved successfully");
        } catch (error) {
            throw new ApplicationError("db error while liking a product", 500)
        }
    }

    async likeCategory(userId, categoryId) {
        try {
            const newLike = new LikeModel({
                user: new ObjectId(userId),
                likeable:new ObjectId(categoryId),
                on_model:'Category'
            });
            await newLike.save()
        } catch (error) {
            throw new ApplicationError("db error while liking a product", 500)
        }
    }
}