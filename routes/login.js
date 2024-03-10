require('dotenv').config();
const express = require('express');
const router = express.Router();

const mongoose =require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const user = require('../models/User');

const login = async(req,res)=>{

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
                        {expiresIn:'1h'}
                        );
                        const expiresIn = new Date(Date.now()+1*60*60*1000);
                        res.status(200).json({token:token,expiresIn:expiresIn});
                }
              
            }catch(err){
                    console.log(err);
            }
        }

router.route('/').post(login);

module.exports=router;