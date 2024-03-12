const mongoose =require('mongoose');

const transactionSchema= mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    transactionAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        enum:['success','failure'],
        
    }
});

module.exports=mongoose.model('Transaction',transactionSchema);