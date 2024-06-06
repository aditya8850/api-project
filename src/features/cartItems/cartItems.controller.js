import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";
export class CartItemsController {
    constructor() {
        this.cartItemsRepository = new CartItemsRepository()
    }
    async add(req, res) {
        try {
            const { productId, quantity } = req.body;
            const userId = req.userId;
            await this.cartItemsRepository.add(productId, userId, quantity);
            res.status(201).send("cart is updated")
        } catch (error) {
            console.log(error);
            return res.status(400).send('something went wrong')
        }
    };
    async get(req, res) {
        const userId = req.userId;
        const items = await this.cartItemsRepository.get(userId);
        return res.status(200).send(items)
    }
    async delete(req, res) {
        const userId = req.userId;
        const cartItemId = req.params.id
        const isDeleted = await this.cartItemsRepository.delete( userId,cartItemId);
        if (!isDeleted) {
            return res.status(404).send("Item not found");
        } else {
            return res.status(200).send("cart item removed")
        }
    }
}