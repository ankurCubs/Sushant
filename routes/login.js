require('dotenv').config();
const express = require('express');
const router = express.Router();

const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const user = require('../models/User');

const login = async(req,res)=>{
//     console.log(req.cookie.cookiename);

    const {username,password}=req.body;
        try{
                const userData= await user.findOne({username:username});
                // console.log(userData);
                if(!userData){
                    res.status(400).json({"massage":"username not found"});
                }
            
                const verifyPass = await bcrypt.compare(password,userData.password);
            
                if(!verifyPass){
                        res.status(400).json({"message":"wrong Password"});
                }else{
                        const token = jwt.sign(
                        {id:userData._id},
                        process.env.SECRET_KEY,
                        {expiresIn:'2h'}
                        );
                       
                        const expirein=new Date(Date.now()+2*60*60*1000);
                        const options={
                            expires:expirein,
                            httpOnly:true
                        };
                        res.status(200).cookie('token',token,options).json({token:token,expiresIn:expirein});
                }
            }catch(err){
                    console.log(err);
                    res.status(500).json({ message: 'Internal server error' });
            }
        }
router.route('/').post(login);

module.exports=router;