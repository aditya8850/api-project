import ApplicationError from "../../error-handler/applicationError.js";
import OrderRepository from "./order.repository.js";
export default class OrderController {
    constructor() {
        this.orderRepository = new OrderRepository;
    }
    async getAll(req,res,next){
        try {
            
        } catch (error) {
            throw new ApplicationError("something went wrong",400)
        }
    }
    async placeOrder(req, res, next) {
        try {
            const userId = req.userId;
             await this.orderRepository.placeOrder(userId)
            res.status(201).send("Order Placed succesfully")
        } catch (error) {
            throw new ApplicationError("Failed placing the order",400)
        }
    }
}