const express=require('express');
const router = express.Router();
const validateRoute=require('../validation/validateRoute');
const { Reviews } = require('../models/model');
const sendMail=require('../mail/nodeMailer');

router.post('/', async (req, res) => {
    const { name, text ,reviewerType,} = req.body;
  
    if (!name || !text) {
      return res.status(400).json({ message: 'Name and review text are required.' });
    }
  
    try {
      const newReview = new Reviews({ name, text, reviewerType,});
      await newReview.save();
      const sub="Submitting review in the website";
      const info=`${name} submits a review : ${text}`;
      sendMail(sub,info);
      res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error submitting review', error });
    }
  });

router.delete('/',validateRoute, async (req, res) => {
    const { ids } = req.body; 
  
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'No review IDs provided' });
    }
  
    try {
      const result = await Reviews.deleteMany({ _id: { $in: ids } });
      return res.status(200).json({
        message: 'Reviews deleted successfully',
        deletedCount: result.deletedCount
      });
    } catch (error) {
      console.error('Error deleting reviews:', error);
      return res.status(500).json({ message: 'Failed to delete reviews', error });
    }
  });

router.get('/',async(req,res)=>{
    const data=await Reviews.find();
    return res.status(200).send(data);
})

module.exports = router;