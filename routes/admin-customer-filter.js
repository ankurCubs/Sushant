const express = require('express');
const router = express.Router();
function couponGenerator(){
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let couponcode="";
    for(let i=1;i<=10;i++){
        const rondomIndex=Math.floor(Math.random()*charset.length);
        couponcode+=charset[rondomIndex];
    }
    return couponcode;
}

const AdminCustomerFilter = async (req,res)=>{

    try{
       const creditScore = Math.floor(Math.random()*(300)+600);
    //    const creditScore = 710;
    //    console.log(creditScore);
       let {regStart, regEnd, minOrder, panCard} =req.query;
        minOrder=parseInt(minOrder);



    //    let cpnDis=0;
    //    if((minOrder>=1000 && minOrder<50000) && (creditScore>=700 && creditScore<750)){
    //     cpnDis=0.15*minOrder;
    //    }
    //    if((minOrder>=50000 && minOrder<100000) && (creditScore>=750 && creditScore<850)){
    //     cpnDis=0.25*minOrder;
    //    }
    //    if((minOrder>=100000) && (creditScore>=800 )){
    //     cpnDis=0.30*minOrder;
    //    }

        //   console.log(cpnDis);
        const couponCode= couponGenerator();
        // console.log("coupon= "+couponCode);  // okay

        res.status(200).json({"message":"successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({"message":"internal server error"});

    }   
  
}


router.route('/').get(AdminCustomerFilter);

module.exports=router;