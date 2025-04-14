const express = require('express');
const multer = require('multer');
const { admin } = require('../models/model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validateRoute=require('../validation/validateRoute');

router.post('/login', async(req, res) => {
  const { username, password } = req.body;
  const ad=await admin.findOne();
  console.log(ad);
  if (username === ad.username && password === ad.password) {
    const token = jwt.sign({ username: admin.username }, process.env.SECRET_KEY, { expiresIn: '2h' });
    console.log(token);
     res.cookie('authToken', token, {
      httpOnly: true, 
      secure: false, 
      sameSite: 'none', 
      maxAge: 3600000 
    },
      )
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});


 router.post('/change-password',validateRoute, async(req, res) => {

    const { newPassword ,oldPassword,username} = req.body;
    const adminId=await admin.findOne({username});
    console.log(adminId,req.body);
    if(adminId==null)
        return res.json({success:false,message:"admin credentials not matched"})
    else if(adminId.username!=username||adminId.password!=oldPassword)
    {
        
         return res.json({success:false,message:"admin credentials not matched"})
    }
    else{
        await admin.findOneAndReplace({username},{username:username,password:newPassword});
        return res.status(200).json({ success: true, message: 'Password changed successfully!' });
    }
    
});

module.exports=router;