const { default: mongoose } = require('mongoose');
const mongoose= require('mongoose');

const couponSchema= new mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    couponCode:{
        type:String,
        required:true
    },
    discountPercentage:{
        type:Number,
        required:true
    },
    expirationStatus:{
        type: Boolean,
        required:true
    }
})

module.exports = mongoose.model('Coupon',couponSchema);