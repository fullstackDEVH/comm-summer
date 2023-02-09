import express from 'express';
import { takeTokenAndAdmin, takeTokenAndAuthorization, takeToken } from "../middleware/verifyToken";
import CartModel from "../models/Cart";

const router = express.Router();

// CRUD cart
// create cart 
router.post('/', takeToken, async (req, res)=>{
    try {
        const newCart = new CartModel(req.body);
        const saveCart = await newCart.save();
        res.status(200).json(saveCart);
    } catch (error) {
        res.status(500).json(error)
    }
})
// update cart
router.put('/:id', takeTokenAndAuthorization, async (req, res) => {
    try {
        const updateCart = await CartModel.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{ new : true});
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get cart
// we shouldn't change params :id because takeTokenAndAuthorization takes req.params.id
router.get('/find/:id', takeTokenAndAuthorization,async (req, res) => {
    try {
        const Cart = await CartModel.findOne({userId : req.params.id});
        res.status(200).json(Cart);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all carts 
// get all must the admin
router.get('/', takeTokenAndAdmin, async (req, res) => {   
    try {
        const results = await ProductModel.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete cart
router.delete('/:id', takeTokenAndAuthorization, async (req, res) => {
    try {
        await CartModel.findByIdAndRemove(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

export default router;