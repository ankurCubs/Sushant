const mongoose = require('mongoose');

const orderItemSchema=mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

module.exports= mongoose.model('OrderItem',orderItemSchema);
