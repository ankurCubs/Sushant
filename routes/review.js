const express = require('express');
const router = express.Router();
const Review= require('../models/Review');


const review= async(req,res)=>{
    // console.log(req.body);
    try {
        
        const {userId,productId,rating,comment}=req.body;
        const updatedData = await Review.create({
            userId: userId, 
            productId: productId,
            rating: rating,
            comment: comment
        });
        res.status(500).json({"message":"Review Posted Successfully"});

        // console.log(updatedData); // okay
    } catch (error) {
        res.status(500).json({"message":"Internal server error"});
    }
    
}

router.route('/').post(review);

module.exports=router;