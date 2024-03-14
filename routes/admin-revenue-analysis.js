const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const AdminRevenueAnalysis = async (req,res)=>{

    try{
        let {startDate,endDate}=req.query;
        //2024-03-11T
        startDate = startDate+"T00:00:00.000+00:00";
        endDate = endDate+"T23:59:59.000+00:00"; 
        console.log(startDate);
        console.log(endDate);
        const allItem = await Order.find({
                                        $and:[
                                            {orderDate:{$gte:new Date(startDate)}},
                                            {orderDate:{$lte:new Date(endDate)}}
                                            ]
                                        });

        console.log(allItem);
        res.status(200).json({"message":"okkkay"});

    }catch(err){
        console.log(err);
        res.status(500).json({"message":"internal server error"});

    }   
    // console.log(startDate,endDate);
    // const date = new Date("2024-03-11T19:55:29.797+00:00");
    // const 
    // console.log(date);
    // console.log(Date.now().day());
}


router.route('/').get(AdminRevenueAnalysis);

module.exports=router;


/*
{ "revenueByCategory": [ { "category": "Electronics", "t
otalRevenue": 15000.0,"totalProductsSold": 50, "averageP
roductPrice": 300.0 }, { "category": "Clothing","totalRe
venue": 8000.0, "totalProductsSold": 30, "averageProduct
Price": 266.67 }, // ...other categories ] }


2024-03-11T19:40:13.907+00:00

2024-03-11T00:00:00.000+00:00
2024-03-11T00:00:00.000+00:00

*/