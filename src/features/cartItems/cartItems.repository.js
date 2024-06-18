import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";


export default class CartItemsRepository {

    constructor() {
        this.collection = "cartItems";
    }

    async get(userId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection)
            console.log(result)
            const result = await collection.find({ userId: new ObjectId(userId) }).toArray();
            // const result = await collection.find({ userId:new ObjectId("666ee64ca940a5113d89d480") }).toArray();
            console.log(result);
            return result
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(userId, cartItemId) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection)
            const result = await collection.deleteOne({ _id: new ObjectId(cartItemId), userId: new ObjectId(userId) });
            return result.deletedCount > 0;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getNextCounter(db){

        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'cartItemId'},
            {$inc:{value: 1}},
            {returnDocument:'after'}
        )  
        console.log(resultDocument);
        return resultDocument.value;
    }
      
    async add(productId, userId, quantity) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection)
            const id = await this.getNextCounter(db);
            console.log("ID",id);
            // find the document
            // either insert or update
            // Insertion.
            const result = await collection.updateOne(
                { productId: new ObjectId(productId), userId: new ObjectId(userId) },
                {
                    $setOnInsert: { _id: id },
                    $inc: {
                        quantity: quantity
                    }
                },
                { upsert: true })

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }


  
}