import { getDB } from "../../config/mongodb.js"
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";

class CartItemsRepository {
    constructor() {
        this.collection = "cartItems"
    }
    async add(productId, userId, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne({ productId: new ObjectId(productId), userId: new ObjectId(userId), quantity })
        } catch (error) {
            console.error(error);
            throw new ApplicationError("something wrong with db", 500)
        }

    };
    async get(userId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.find({ userId: new ObjectId(userId) }).toArray();
        } catch (error) {
            console.error(error);
            throw new ApplicationError("something wrong with db", 500)
        }
    };
    async delete(userId,cartItemId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result= await collection.deleteOne({_id: new ObjectId(cartItemId),userId:new ObjectId(userId)});
            return result.deletedCount>0;
    } catch(error) {
        console.error(error);
        throw new ApplicationError("something wrong with db", 500)
    }
}

}
export default CartItemsRepository