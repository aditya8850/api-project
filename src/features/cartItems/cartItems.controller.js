import CartItemModel from "./cartItems.model.js";
export class CartItemsController{
    add(req,res){
        const {productId,quantity}=req.query;
        const userId=req.userId;
        CartItemModel.add(productId,userId,quantity);
        res.status(201).send("cart is updated")
    }
    get(req,res){
        const userId=req.userId;
        const items= CartItemModel.get(userId);
        return res.status(200).send(items)
    }
    delete(req,res){
        const userId= req.userId;
        const cartItemId= req.params.id;
        const error= CartItemModel.delete(cartItemId,userId);
        if(error){
            return res.status(404).send(error);
        }else{
            return res.status(200).send("cart item removed")
        }
    }
}