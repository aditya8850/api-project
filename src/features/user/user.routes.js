// manage routes/paths to ProductController
//1. Import express here
import  UserController  from "./user.controller.js";
import express from "express";
// initialise routers
const userRouter = express.Router();
const userController = new UserController()
//all the path to controller methods.
userRouter.post('/signup',(req,res)=>{
    userController.signUp(req,res)
})
userRouter.post('/signin',(req,res,next)=>{
    userController.signIn(req,res)
})
export default userRouter;