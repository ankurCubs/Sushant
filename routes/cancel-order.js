const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
// const { default: mongoose } = require('mongoose');

const cancelOrder = async(req,res)=>{
    const {orderId}=req.body;
    // orderId =new ObjectId('65ef60499da0d1ad6d2ecc43');
    // console.log(orderId);
    try {
        
        await Order.findOneAndUpdate({_id:orderId},{$set:{status:'Canceled'}}); 
        // await Product.findOneAndUpdate({_id:orderItemDetail.productId},{$inc:{stockQuantity:orderItemDetail.quantity}});  // product k stockQuantity me orderItemDetail.quantity add kr denge
       
        const orderItemDetail= await OrderItem.findOne({orderId:orderId});  // orderId se orderItem cancel krna h iska matlb orderId and orderItem ke bich one-to-one relationship hai
        
        // console.log(orderItemDetail);
        // console.log(orderItemDetail.productId);
        // console.log(orderItemDetail.quantity);
        
        // STOCK RESTORATION -> extract productId & quantity from orderItemDetail  
        const pDetail =await Product.findOneAndUpdate({_id:orderItemDetail.productId},{$inc:{stockQuantity:orderItemDetail.quantity}}); 
        console.log(pDetail); // okay

        return res.status(200).json({"message":"Order canceled successfully"}) // doubt -> kon sa transactionId
    } catch (err) {
        console.log('error in cancel-order');
        console.log(err);
        res.status(500).json({"message":"Internal server error"});
    }

}

router.route('/').get(cancelOrder);

module.exports = router;
