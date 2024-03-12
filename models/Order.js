const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    status:{
        type:String,
        enum:['Placed','Paid','Canceled','Transit','Failed']
    },
    orderDate:{
        type:mongoose.Schema.Types.Date,
        required:true
    }
})
module.exports=mongoose.model('Order',orderSchema);