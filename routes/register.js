const UserModel = require('../models/User');
const CounterModel = require('../models/Counter');
const express= require('express');
const router = express.Router();

const register = async (req,res)=>{

   await CounterModel.findOneAndUpdate(
        {id:'autoval'},
        {"$inc":{"seq":1}},
        {new:true},
        (err,returnValue)=>{
            let seqNum;
            if(returnValue==null){
                const firstDoc = CounterModel({
                    id:"autoval",
                    seq:1
                });
                firstDoc.save();
                seqNum=1;
            }else{
                seqNum=cd.seq;
            }
    
            const userData= UserSchema({
                id:seqNum,
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                role:'Admin',
                pan:req.body.pan
               
            })
            userData.save();
        }
    )
}

router.route('/').post(register);

module.exports= router;

