import { getDB } from "../../config/mongodb.js"
import { ObjectId } from "mongodb";
import ApplicationError from "../../error-handler/applicationError.js";
import OrderModel from "./order.model.js";
export default class OrderRepository {
    constructor() {
        this.collection = "orders";
    }
    async placeOrder(userId) {
        try {///setting up transactions feature:
            const db = getDB();
            // 1.get the cartItems, and calculate the total amount.
            const items = await this.getTotalAmount(userId);
            const finalTotalAmount = items.reduce((acc, item) => {
                return acc += item.totalAmount;
            }, 0)
            console.log("final amount",finalTotalAmount)
            // 2.create an order record.
            const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder)
            // 3. reduce the stock.
            for (let item of items) {
                await db.collection("products").updateOne(
                    {_id: item.productId},
                    {$inc:{stock: -item.quantity}}
                )
            }
            // 4. clear the cart items.
            await db.collection("cartItems").deleteMany({
                userId: new ObjectId(userId)
            })
            return;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong while placing order.", 500)
        }

    }

    async getTotalAmount(userId) {
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

        ]).toArray()
        return items;

    }
}