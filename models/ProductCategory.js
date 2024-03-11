const mongoose = require('mongoose');
const Product = require('./Product');
const Category = require('./Category');
const ProductCategorySchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
});

module.exports = mongoose.model('ProductCategory',ProductCategorySchema);