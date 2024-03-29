const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); 
const adminAuth = require('../middlewares/adminAuth');
const ProductCategory = require('../models/ProductCategory');
const Categories = require('../models/Category');

const getProducts = async(req,res)=>{
    try {
        let query = {}; 
        
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * pageSize;

        
        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.priceRange) {
            const [minPrice, maxPrice] = req.query.priceRange.split('-');
            query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        }
        if (req.query.rating) {
            const [minRating, maxRating] = req.query.rating.split('-');
            query.rating = { $gte: parseFloat(minRating), $lte: parseFloat(maxRating) };
        } 
        const sortField = req.query.field;
        const sortOrder = req.query.order || 'desc';
        const sortCriteria = {};
        sortCriteria[sortField] = sortOrder === 'asc' ? 1 : -1;

                                // Fetching products from MongoDB
        const products = await Product.find(query).sort(sortCriteria).skip(skip).limit(pageSize);
        
                    // Count total products
         const totalProducts = await Product.countDocuments(query);
        const totalPages = totalProducts/pageSize;
        res.json({
            products:products,
            pagination:{
                currentPage: page,
                totalPages: totalPages,
                pageSize: pageSize,
                totalItems:totalProducts
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

} 

const postProduct = async(req,res)=>{
    try{
        const {name,description,price,stockQuantity,categories,weight,images}=req.body;

        // if(!(name&&description&&price&&stockQuantity&&categories&&weight&&images)){
        //     return res.status(400).json({"message":"provide all values correctly"});

        // }
        const insertedData=await Product.create({
            name:name,
            description:description,
            price: price,
            stockQuantity: stockQuantity,
            categories: categories,
            weight: weight,
            images: images
        });
         console.log(insertedData); // okay
        // find category id using category name
        const categoryId= await Categories.findOne({name:categories});
        console.log(categoryId);
        // maintain Product-category junction callection for querying data based on category
        const addpdtCat =await ProductCategory.create({
            productId:insertedData._id,
            categoryId:categoryId._id
        })
        console.log(addpdtCat);
        res.json({"message":"Product added successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({"message":"Internal server error"});
    }
}

router.get('/', getProducts); //
router.post('/',adminAuth,postProduct); // okay

module.exports = router;

