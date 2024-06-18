// import express
import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/carItems.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert {type:"json"}
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import ApplicationError from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.router.js";

//  create server
const server = express();

server.use(express.json())
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
server.use(loggerMiddleware)
//for all reqs related to product,redirect to product routes
server.use('/api/products',jwtAuth, productRouter)
server.use('/api/cartItems',jwtAuth,cartRouter)
server.use('/api/users',userRouter)
server.use('/api/orders',jwtAuth,orderRouter)

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
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message)
    }
    //server errs.
    res.send("Something went wrong, please try later").status(500)
})

// specify port 
server.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectToMongoDB()
});



