// import express
import "./env.js";
import mongoose from "mongoose";
import express from "express";
import swagger from "swagger-ui-express";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert {type:"json"}
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import ApplicationError from "./src/error-handler/applicationError.js";
// import {connectToMongoDB} from "./src/config/mongodb.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";


//route imports
import orderRouter from "./src/features/order/order.router.js";
import cartRouter from "./src/features/cartItems/carItems.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import productRouter from "./src/features/product/product.routes.js";
import likeRouter from "./src/features/like/like.router.js";
import { connectToMongoDB } from "./src/config/mongodb.js";


//  create server
const server = express();
server.use(express.json())
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
server.use(loggerMiddleware)

//for all reqs related to apis
server.use('/api/products',jwtAuth, productRouter)
server.use('/api/cartItems',jwtAuth,cartRouter)
server.use('/api/users',userRouter)
server.use('/api/orders',jwtAuth,orderRouter)
server.use('/api/likes',jwtAuth,likeRouter)

// default req handler
server.get('/', (req, res) => {
    res.send('Welcome to Ecommerce Api.');
})

//middleware to handle 404 reqs.
server.use((req,res)=>{
    res.status(404).send("Api not found")
})
//err handler application level middleware
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        throw err
    }
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message)
    }
    //server errs.
    res.send("Something went wrong, please try later").status(500)
})

// specify port 
const port = 5000
server.listen(port, () => {
    console.log('Server is running on port: ',port);
    connectUsingMongoose()
    connectToMongoDB()
    
});



