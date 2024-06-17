import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

class ProductRepository {
    constructor() {
        this.collection = "products";
    }
    async add(newProduct) {
        //logic to add new product
        try {
            //db operations
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500);
        }
    }

    
    async getAll() {
        try {
            //db operations
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            console.log("products:", products);
            return products;
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500);
        }
    }

    
    
    async get(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500);
        }
    }
    // product should have minPrice specified and specified category
    
    
    async filter(minPrice, categories) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {}; //expression to be passed to the DB
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) };
                // console.log(filterExpression)
            }
            categories = (categories.replace(/[\[\] ]/g, '').trim().split(','));
            //   categories = JSON.parse(categories.replace);
            if (categories) {
                filterExpression = { $and: [{ category: { $in: categories } }, filterExpression] };
            }
            // return await collection.find({ '$and': [ { category }, { price: {"$gte":parseInt(minPrice)} } ] }).toArray();

            return await collection.find(filterExpression).project({ price: 1, name: 1, category: 1, ratings: { $slice: 1 }, _id: 0 }).toArray(); //projection operators
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500);
        }
    }

    
    
    // async rate(userId, productId, rating) {
    //     try {
    //         const db = getDB();
    //         const collection = db.collection(this.collection);
    //         //1.find the product
    //         const product = await collection.findOne({ _id: new ObjectId(productId) });
    //         //2. check if the user already rated the product
    //         const userRating = product.ratings.find(r => r.userId === userId);
    //         if (userRating) {
    //             //3. update the rating
    //             await collection.updateOne({
    //                 _id: new ObjectId(productId), "ratings.userId": new ObjectId(userId)
    //             }, {
    //                 $set: {
    //                     "ratings.$.rating": rating
    //                 }
    //             })
    //         } else {
    //             await collection.updateOne({ _id: new ObjectId(productId) }, { $push: { ratings: { userId: new ObjectId(userId), rating } } })
    //         }

    //     } catch (err) {
    //         console.log(err);
    //         throw new ApplicationError("Something wrong with the DB", 500)
    //     }
    // }
    async rate(userId, productId, rating) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            //1.remove exisiting entry
            await collection.updateOne(
                {
                    _id: new ObjectId(productId),
                },
                {
                    $pull: { ratings: { userId: new ObjectId(userId) } },
                }
            );
            //2.add new entry
            await collection.updateOne(
                { _id: new ObjectId(productId) },
                {
                    $push: { ratings: { userId: new ObjectId(userId), rating } },
                }
            );
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something wrong with the DB", 500);
        }
    }
    //implementing aggregiation pipelines
    
    
    
    async averageProductPricePerCategory() {
        try {
            const db = getDB();
            return await db.collection(this.collection)
                .aggregate([
                    { //stage:1
                        $group: {
                            _id: "$category",
                            averagePrice: { $avg: "$price" },
                        }
                    }
                ]).toArray()
         
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something wrong with the DB", 500);

        }
    }
}
export default ProductRepository;







//aggregating pipelines usecases:::::

   // return await db.collection(this.collection)
            //     .aggregate([
            //         {
            //             $unwind: "$ratings"
            //         },
            //         {
            //             $group: {
            //                 _id: "$_id",
            //                 averageRating: { $avg: "$ratings.rating" }
            //             }
            //         }
            //     ]).toArray()

// ratings count:

// db.products.aggregate([
//     {
//         $project: {
//             name: 1, countOfRatings: {
//                 $cond: {
//                     if: { $isArray: "$ratings" }, then: { $size: "$ratings" }, else: 0  } } }
//     }
// ])






//product with highest number of ratings:

// db.products.aggregate([
//     { //project the name of product ,and countOfRatings
//         $project: {
//             name: 1, countOfRatings: {
//                 $cond: {
//                     if: { $isArray: "$ratings" }, then: { $size: "$ratings" }, else: 0  } } }
//     }, //sort the collection that we received
//     {
//         $sort: { countOfRatings: -1 }
//     }, //limit to just one item in result
//     {
//         $limit:1
//     }

// ])
