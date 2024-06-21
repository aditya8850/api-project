// manage routes/paths to ProductController
//1. Import express here
import  UserController  from "./user.controller.js";
import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js"
// initialise routers
const userRouter = express.Router();
const userController = new UserController()
//all the path to controller methods.
userRouter.post('/signup',(req,res,next)=>{
    userController.signUp(req,res,next)
})
userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res,next)
})
userRouter.put('/reset-password',jwtAuth,(req,res,next)=> userController.resetPassword(req,res,next))
export default userRouter;