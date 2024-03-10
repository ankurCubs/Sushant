const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
   // id:{
   //  type:Number,
   // },
   name:{
    type:String,
    unique:true
   },
   description:{
    type:String
   }

})

module.exports = mongoose.model('Category',CategorySchema);
