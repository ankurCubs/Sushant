
const express= require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const OrderItem = require('../models/OrderItem');
const Product = require('../models/Product');
  
const order = async(req,res)=>{           
    const {userId,products}=req.body; 
      //  getting productId and quantity which means we are going to 
      // save this in orderItem but usse pehle mujhe ek orderId create krna hoga
    const productId=products[0].productId;
    const quantity= products[0].quantity;

    try{

        const user =await User.findOne({_id:userId});
        
        const orderData= await Order.create({
            userId:userId,
            status:'Placed',  // isse payment status k baad  update kr denge 
            orderDate:new Date(Date.now())   //2024-03-11T19:41:21.358Z
        });
        // console.log(orderData); // okay
        // ab order items hai  iss orderId ke sath orderItem collection me save karunga
        await OrderItem.create({
            orderId:orderData._id,
            productId: productId,
            quantity: quantity
        });

        // ab orderId ko  User collection ke 'orderIds' field me push krwa denge.
        await User.findOneAndUpdate({_id:userId},{$push:{orderIds:orderData._id}}); // okay 

        //  DECREASE STOCK QUANTITY order k quantity ko product stockQuantity se decrement kr denge
        await Product.findOneAndUpdate({_id:productId},{$inc:{stockQuantity:-quantity}});  // product k stockQuantity me orderItemDetail.quantity add kr denge

        res.status(200).json({"message":"order placed successfully","orderId":orderData._id}); // as expected
        
    }catch(err){
        res.status(400).json({"message":"Internal server error"});
    }


}

router.route('/').post(order);

module.exports = router;



/*
product ids
65ef52fd524d5d9ffaf86bcb
65ef52bb524d5d9ffaf86bc8
65ef5287524d5d9ffaf86bc5
65ef5278524d5d9ffaf86bc2


userIds
65ef4c3ac3ec4d8cbe358c05 -> sushant
*/