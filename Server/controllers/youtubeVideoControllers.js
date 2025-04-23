const express=require('express');
const router = express.Router();
const validateRoute=require('../validation/validateRoute');
const { YoutubeId } = require('../models/model');

router.get('/',async(req,res)=>{
    const data=await YoutubeId.find();
    res.status(200).send(data);
})

router.post('/',validateRoute,async(req,res)=>{
    try{
        const {title,id}=req.body;
        const venueInstance=new YoutubeId({
            title,
            id
        }) ;
        await venueInstance.save();
         return res.status(200).json({message:"data uploaded succesfully",success:true});
    }
    catch(err){
       return  res.status(400).json({message: 'Error processing the upload', success:false,err });
    }
})

router.delete('/', validateRoute, async (req, res) => {
    try {
      const { title } = req.body;
  
      if (!Array.isArray(title)) {
        return res.status(400).json({ success: false, message: "Invalid data format. Expected an array of place names." });
      }
  
      await YoutubeId.deleteMany({ place: { $in: title } });
      return res.status(200).json({ message: "Data deleted successfully", success: true });
    } catch (error) {
      return res.status(400).json({ message: 'Error processing the delete', success: false, error });
    }
  });
  
module.exports=router;