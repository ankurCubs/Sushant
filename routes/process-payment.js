const express= require('express');
const Transaction = require('../models/Transaction');
const OrderItem = require('../models/OrderItem');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

const processPayment = async(req,res)=>{
    const {orderId,paymentMethod,transactionAmount,paymentStatus}=req.body;
    if(!(orderId && paymentMethod && transactionAmount && paymentStatus)){
        return res.status(400).json({"message":"All fields mendatory"});
    }

    try{
        // payment fail ho ya success Transaction  me store krwa do
        const paymentDetail = await Transaction.create({  
            orderId:orderId,
            paymentMethod:paymentMethod,
            transactionAmount:transactionAmount,
            paymentStatus:paymentStatus
        });

        // console.log(paymentDetail); // okay

        // now push this transaction id in the orderItem collection
        const orderItemDetail = await OrderItem.findOneAndUpdate({orderId:orderId},{$push:{transactionDetail:paymentDetail._id}});
        console.log(orderItemDetail);

        // if paymentStatus === failure then set orderStatus "failed" and Product's quantity(in Product collec. ) increment by 1. 
        if(paymentStatus==='failure'){
            await Order.findOneAndUpdate({_id:orderId},{$set:{status:'Failed'}}); // okay
          
            // orderItemDetail se productId find karenge -> productId se product stock quantity increment kr denge
            await Product.findOneAndUpdate({_id:orderItemDetail.productId},{$inc:{stockQuantity:orderItemDetail.quantity}});  // product k stockQuantity me orderItemDetail.quantity add kr denge
            return res.status(200).json({"message":"Payment failed","transactionId":paymentDetail._id});
        }  
        return res.status(200).json({"message":"Payment success","transcationId":paymentDetail._id});

    }catch(err){
        console.log(err);
        res.status(500).json({"message":"Internal Server Error"});
    }

}

router.route('/').post(processPayment);
module.exports = router;

/*

 orderId = 65ef5e1ddf8278d580affd30

 orderItemDetail= {
  _id: new ObjectId('65ef60499da0d1ad6d2ecc45'),
  orderId: new ObjectId('65ef60499da0d1ad6d2ecc43'),
  productId: new ObjectId('65ef52bb524d5d9ffaf86bc8'),
  quantity: 2,
  __v: 0
}
 */