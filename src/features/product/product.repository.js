import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

class ProductRepository {
    constructor() {
        this.collection = "products";
    }
    async add(newProduct) {
        //logic to add new product
        try {//db operations
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct)
            return newProduct
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500)
        }
    };

    async getAll() {
        try {//db operations
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log("products:", products);
            return products

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500)
        }
    };

    async get(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({ _id: new ObjectId(id) })

        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500)
        }
    };

    async filter(minPrice, maxPrice, category) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) };
            }
            if (maxPrice) {
                filterExpression.price = { $lte: parseFloat(maxPrice) };
            }
            if (category) {
                filterExpression.category = category;
            }
            return await collection.find(filterExpression).toArray();
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500)
        }
    };

    async rate(userId, productId, rating) {
        try {
            const db = getDB();
            const collection= db.collection(this.collection);
           
            collection.updateOne({_id:new ObjectId(productId)},{$push:{ratings:{userId:new ObjectId(userId),rating}}})
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500)
        }
    }
};
export default ProductRepository;