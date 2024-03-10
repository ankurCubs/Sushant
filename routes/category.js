const express= require('express');
const router = express.Router();

const catCollection = require('../models/Category');

const category = async(req,res)=>{
    
    const {name,description}=req.body;
    
    try{
        const collResponse = await catCollection.create({
            name:name,
            description:description
        });
        res.status(200).json({"message":"category added successfully"});

    }catch(err){
        console.log(err);
        // res.status(400).send(err);
    }
}

router.route('/').post(category);

module.exports =router;


