import express from 'express';
import { takeTokenAndAdmin, takeTokenAndAuthorization, takeToken } from "../middleware/verifyToken";
import OrderModel from "../models/Order";

const router = express.Router();

// create order 
router.post('/', takeToken, async (req, res)=>{
    try {
        const newOrder = new OrderModel(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(500).json(error)
    }
})
// update 
router.put('/:id' , takeTokenAndAdmin, async (req, res) => {
    try {
        const updateOrder = await OrderModel.findByIdAndUpdate(req.params.id, {
            $set : req.body
        },{ new : true});
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all order of ,:id = userId
router.get('/find/:id', takeTokenAndAuthorization,async (req, res) => {
    try {
        const orders = await OrderModel.find({userId : req.params.id});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get all order
router.get('/', takeTokenAndAdmin, async (req, res) => {
    try {
        const results = await OrderModel.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete order
router.delete('/:id', takeTokenAndAdmin, async (req, res) => {
    try {
        await OrderModel.findByIdAndRemove(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

// get monthly income : doanh thu hằng tháng
router.get("/income", takeTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        // $gte giá trị phải >= điều kiện
        // % doanh thu (amount) của tháng hiện tại và tháng trước;
      const income = await OrderModel.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
});

export default router;