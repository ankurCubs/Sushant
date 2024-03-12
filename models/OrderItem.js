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
    },
    transactionDetail:{  // added leter (when '/process-payment' endpoint created)
        type:mongoose.Schema.Types.ObjectId
    }
});

module.exports= mongoose.model('OrderItem',orderItemSchema);
