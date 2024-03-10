require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const User=require('./models/User');
const app= express();

app.use(cookieParser());

// const jwt = require('jsonwebtoken');

const adminAuth = async (req,res,next)=>{
    try{

        //  const token =req.headers['cookie'].split('=')[1]; 
        const token =req.headers.cookie.split('=')[1];

        const verifyUser =  jwt.verify(token,process.env.SECRET_KEY);
        //  console.log(verifyUser) // okay 
        const userData = await User.findOne({_id:verifyUser.id});
        if(userData.role!=='Admin'){
            return res.status(400).json({"message":"only Admin can insert category"});
            
        }
        // console.log(userData); // okay
        next();
    }catch(err){
        console.log(err);
        res.status(400).json({"message":"Internal server error"});
    }


}
module.exports = adminAuth;