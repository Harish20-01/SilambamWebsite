const express=require('express');
const router = express.Router();
const { userMessage } = require('../models/model');
const sendMail=require('../mail/nodeMailer');

router.post('/',async(req,res)=>{
    console.log(req.body);
    const {name,email,mobileNo,message}=req.body;
    const messageInstance=new userMessage({
        name,
        email,
        mobileNo,
        message,
    });
    try{
      await messageInstance.save();
      const sub="Submitting a Comment on a site";
      const info=`Name: ${name} \n Email: ${email} \n MobileNo: ${mobileNo} \n Message: ${message}`;
      sendMail(sub,info);
      res.status(200).send({
        message:"data Saved Successfuly",
        success:true
      })
    }
    catch(err){
      res.status(404).send({
        message:"An error Occured during proceesing",
        success:false
      })
    }
})
module.exports=router;