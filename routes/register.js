const user = require('../models/User');
const CounterModel = require('../models/Counter');
const express= require('express');
const router = express.Router();
const  bcrypt = require('bcryptjs');

const register = async (req,res)=>{

    const {username,email,password,role}=req.body;

    try{
        const userData=await user.find({'$or':[{username:username},{email:email}]});
        // console.log(userData.length);
        if(userData.length!==0){
            res.status(400).json({"message":"Username or Password already exist"});
        }else{
            const encPassword= await bcrypt.hash(password,10);
            const data = user.create({
                username:req.body.username,
                email:req.body.email,
                password:encPassword,
                role:req.body.role,
                pan:req.body.pan
            })
            res.status(400).json({"message":"User registered successfully"});
        }   
    }catch(err){
        res.status(500).json({ message: 'Internal server error' });
    } 
}
router.route('/').post(register);
module.exports= router;
















/*

 // let seqNum=1;
        //    await CounterModel.findOneAndUpdate(
//         {id:'autoval'},
//         {"$inc":{"seq":1}},
//         {new:true},
//         (err,returnValue)=>{
            
//             if(returnValue==null){ // mean no 0 registered user
//                 const firstDoc = CounterModel({
//                     id:"autoval",
//                     seq:1
//                 });
//                 firstDoc.save();
//                 seqNum=1;
//             }else{
//                 seqNum=cd.seq;
//             }
//         }
//     )

*/ 