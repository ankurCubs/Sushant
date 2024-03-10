const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:{
    type:String
  },
  description:{
    type:String
  },
  price:{
    type:Number
  },
  stockQuantity:{
    type:Number
  },
  weight:{
    type:String
  },
  image:{
    type:String
  }
})

module.exports = mongoose.model('Product',ProductSchema);