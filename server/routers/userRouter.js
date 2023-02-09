import express from 'express';
import { takeTokenAndAdmin, takeTokenAndAuthorization } from "../middleware/verifyToken";
import CryptoJS from "crypto-js";
import UserModel from "../models/User";

const router = express.Router();

// CRUD USER
router.post('/', takeTokenAndAdmin, async (req, res)=>{
    try {
        const newUser = new UserModel(req.body);
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json(error)
    }
})
// update user
router.put('/:id' , takeTokenAndAuthorization, async (req, res) => {
    if(req.body.password){
        const newPass = CryptoJS.AES.encrypt(req.body.password, 'register-login').toString();
        req.body.password = newPass;
    }
  
    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{ new : true});
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/find/:id', takeTokenAndAdmin, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const {password, ...other} = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/finds', takeTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    
    try {
        const results =query ? await UserModel.find().sort({updatedAt: 'desc'}).limit(5) : await UserModel.find();
        res.json(results);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', takeTokenAndAdmin, async (req, res) => {
    try {
        await UserModel.findByIdAndRemove(req.params.id);
        res.status(200).json({_id : req.params.id, message : "Product has been deleted"});
    } catch (error) {
        res.status(500).json(error);
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