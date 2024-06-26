import { getClient, getDB } from "../../config/mongodb.js"
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";
export default class OrderRepository {
    constructor() {
        this.collection = "orders";
    }
    //this method requires the dev to create a replica set in order to use transactions.
    // async placeOrder(userId) {
    //     const client = getClient();
    //     console.log(client);
    //     const session = client.startSession();
    //     try {///setting up transactions feature:

    //         session.startTransaction();
    //         // 1.get the cartItems, and calculate the total amount.
    //         const items = await this.getTotalAmount(userId, session);
    //         const finalTotalAmount = items.reduce((acc, item) => {
    //             return acc += item.totalAmount;
    //         }, 0)
    //         console.log("final amount", finalTotalAmount)
    //         // 2.create an order record.
    //         const db = getDB();
    //         const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
    //         await db.collection(this.collection).insertOne(newOrder, { session })
    //         // 3. reduce the stock.
    //         for (let item of items) {
    //             await db.collection("products").updateOne(
    //                 { _id: item.productId },
    //                 { $inc: { stock: -item.quantity } }, { session }
    //             )
    //         }
    //         // 4. clear the cart items.
    //         await db.collection("cartItems").deleteMany({
    //             userId: new ObjectId(userId)
    //         }, { session });
    //         await session.commitTransaction();
    //         session.endSession();
    //         return;
    //     } catch (err) {
    //         await session.abortTransaction();
    //         console.log(err);
    //         throw new ApplicationError("Something went wrong while placing order.", 500)
    //     }

    // }

    async placeOrder(userId) {
        
        try {///setting up transactions feature:

            // 1.get the cartItems, and calculate the total amount.
            const items = await this.getTotalAmount(userId);
            const finalTotalAmount = items.reduce((acc, item) => {
                return acc += item.totalAmount;
            }, 0)
            console.log("final amount", finalTotalAmount)
            // 2.create an order record.
            const db = getDB();
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, )
            // 3. reduce the stock.
            for (let item of items) {
                await db.collection("products").updateOne(
                    { _id: item.productId },
                    { $inc: { stock: -item.quantity } }
                )
            }
            // 4. clear the cart items.
            await db.collection("cartItems").deleteMany({
                userId: new ObjectId(userId)
            });
            return;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong while placing order.", 500)
        }

    }

    async getTotalAmount(userId, session) {
        //get the cart items for the user
        const db = getDB();
        const items = await db.collection("cartItems").aggregate([
            // 1. get cart items of the user:
            {
                $match: { userId: new ObjectId(userId) }
            },
            // we're going to learn to use lookup aggregator operator
            // 2. get the product from product collection
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // 3. unwind the productInfo array
            {
                $unwind: "$productInfo"
            },

            // // calculate total amt foreach cart items:
            {
                $addFields: {
                    "totalAmount": {
                        $multiply: ["$quantity", "$productInfo.price"]
                    }
                }
            }

        ], { session }).toArray()
        return items;

    }

    async getAllOrders(userId){
        try {
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong while fetching userDetails from the DB")
        }
    }
}