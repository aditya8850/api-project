import { getDB } from "../../config/mongodb.js"
import { ObjectId,  } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";

class CartItemsRepository {
    constructor() {
        this.collection = "cartItems"
    }
    async add(productId, userId, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const id = await this.getNextCounter(db)
            //insertion
            //we need to check if theres already a cartitem,then increment either insert
            //update takes three parameters first is to filter , 2nd is the data to be updated and third one is options
            await collection.updateOne({ productId: new ObjectId(productId), userId: new ObjectId(userId) },
                {
                    $setOnInsert:{_id:id},
                    $inc: {quantity: quantity}
                },
                { upsert: true })
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
    async delete(userId, cartItemId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.deleteOne({ _id: new ObjectId(cartItemId), userId: new ObjectId(userId) });
            return result.deletedCount > 0;
        } catch (error) {
            console.error(error);
            throw new ApplicationError("something wrong with db", 500)
        }
    }
    async getNextCounter(db){
        const counter = await db.collection("counters").findOneAndUpdate(
            {_id: "cartItemId",},
            {$inc:{value:1}},
            {returnDocument:'after'}
        )
        console.log(counter);
        return counter.value.value;
    }

}
export default CartItemsRepository