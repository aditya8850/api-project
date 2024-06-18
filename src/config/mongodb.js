import { MongoClient } from "mongodb";
import ApplicationError from "../error-handler/applicationError.js";
// import dotenv from "dotenv";
// dotenv.config();
let client;
export const connectToMongoDB=()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client= clientInstance;
        console.log("mongodb is connected");
        createCounter(client.db());
        createIndexes(client.db());
    })
    .catch(err=>{
        console.log(err);
    })
}
export const getClient = ()=>{
    return client;
}
export const getDB=()=>{
    return client.db();
}
const createCounter = async(db)=>{
    const existingCounter = await db.collection("counters").findOne({_id:'cartItemId'})
    if(!existingCounter){
        await db.collection("counters").insertOne({_id:'cartItemId',value:0})
    }
}
const createIndexes = async(db) => {
   try {
     await db.collection("products").createIndex({ price:1}); //single indexes
     await db.collection('products').createIndex({name:1,category:1}) //compound indexes
     await db.collection('products').createIndex({desc:"text"}) //text based description
     console.log("indexes created in db");
   } catch (error) {
        throw new ApplicationError("index creation failed",400)
   }
}