const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  stockQuantity:{
    type:Number,
    required:true
  },
  categories:{
    type:String,
    required:true
  },
  weight:{
    type:String
  },
  image:{
    type:String
  }
})

module.exports = mongoose.model('Product',ProductSchema);