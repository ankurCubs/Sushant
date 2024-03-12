const mongoose = require('mongoose');

const reviewSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    rating:{
        type:Number
    },
    comment:{
        type:String
    }
});

module.exports = mongoose.model('Review',reviewSchema);