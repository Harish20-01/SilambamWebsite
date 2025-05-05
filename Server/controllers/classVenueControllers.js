const express=require('express');
const router = express.Router();
const validateRoute=require('../validation/validateRoute');
const { ClassVenue } = require('../models/model');

router.get('/',async(req,res)=>{
    const data=await ClassVenue.find();
    res.status(200).send(data);
})

router.post('/',validateRoute,async(req,res)=>{
    try{
        const {day,timing,place,description}=req.body;
        const venueInstance=new ClassVenue({
            day,
            place,
            timing,
            description
        }) ;
        await venueInstance.save();
         return res.status(200).json({message:"data uploaded succesfully",success:true});
    }
    catch(err){
       return  res.status(400).json({message: 'Error processing the upload', success:false,err });
    }
})

router.put('/:id', validateRoute, async (req, res) => {
  try {
    const { id } = req.params;
    const { place, day, timing, description } = req.body;

    const updatedVenue = await ClassVenue.findOneAndUpdate(
      { _id: id },
      { place, day, timing, description },
      { new: true, useFindAndModify: false }  
    );

    if (!updatedVenue) {
      return res.status(404).json({ message: 'Venue not found', success: false });
    }

    return res.status(200).json({ message: 'Venue updated successfully', success: true,});
  } catch (error) {
    return res.status(400).json({ message: 'Error updating venue', success: false, error });
  }
});

router.delete('/', validateRoute, async (req, res) => {
    try {
      const { place } = req.body;
  
      if (!Array.isArray(place)) {
        return res.status(400).json({ success: false, message: "Invalid data format. Expected an array of place names." });
      }
  
      await ClassVenue.deleteMany({ place: { $in: place } });
      return res.status(200).json({ message: "Data deleted successfully", success: true });
    } catch (error) {
      return res.status(400).json({ message: 'Error processing the delete', success: false, error });
    }
  });
  
module.exports=router;