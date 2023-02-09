import express from 'express';
import { takeTokenAndAdmin, takeTokenAndAuthorization } from "../middleware/verifyToken";
import ProductModel from "../models/Product";

const router = express.Router();

// CRUD Product
// create product 
router.post('/', takeTokenAndAdmin, async (req, res)=>{
    try {
        const newProduct = new ProductModel(req.body);
        const saveProduct = await newProduct.save();
        res.status(200).json(saveProduct);
    } catch (error) {
        res.status(500).json(error)
    }
})
// update product
router.put('/:id' , takeTokenAndAdmin, async (req, res) => {
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{ new : true});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        const {password, ...other} = product._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all products
router.get('/', async (req, res) => {
    const query_new = req.query.new;
    const query_categories = req.query.categories;
    let results;
    try {
        if(query_categories){
            results = await ProductModel.find({categories: {$in: [query_categories]}});
        }else if(query_new){
            results = await ProductModel.find().sort({ createdAt : -1 }).limit(5);
        }
        else{
            results = await ProductModel.find();
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete product
router.delete('/:id', takeTokenAndAdmin, async (req, res) => {
    try {
        await ProductModel.findByIdAndRemove(req.params.id);
        res.status(200).json({_id : req.params.id, message : "Product has been deleted"});
    } catch (error) {
        res.status(500).json(err);
    }
})

router.get('/stats' , takeTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await UserModel.aggregate([
            {
                $match : { createdAt : { $gte : lastYear } },
            },
            {
                $project : { month : { $month : "$createdAt" } },
            },
            {
                $group : {
                    _id : "$month", 
                    total : { $sum : 1}
                }
            }
        ]);

        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
})

export default router;