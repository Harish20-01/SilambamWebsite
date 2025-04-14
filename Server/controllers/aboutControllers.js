const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { About } = require('../models/model');
const router = express.Router();
const jwt = require('jsonwebtoken');
const validateRoute=require('../validation/validateRoute')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload About Info
router.post('/', upload.single('image'),validateRoute, async (req, res) => {
 
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const { description, staff, title } = req.body;
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }

      const aboutInstance = new About({
        title,
        description,
        imageUrl: result.secure_url,
        public_id: result.public_id,
        staff,
      });

      await aboutInstance.save();
      return res.status(200).json({ message: 'Upload successful', image: { public_id: result.public_id, url: result.secure_url } });
    }).end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the upload', error });
  }
});


router.delete('/',validateRoute, async (req, res) => {
  const { public_ids } = req.body.data; 
  console.log(req.body);
  
  if (!Array.isArray(public_ids) || public_ids.length === 0) {
    return res.status(400).json({ message: 'No images selected for deletion' });
  }
  try {
    
    for (const public_id of public_ids) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(public_id, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
      });

      const image = await About.findOneAndDelete({ public_id });
      if (!image) {
        console.log(`Image with public_id ${public_id} not found in the database`);
      }
    }

    return res.status(200).json({ message: 'Images deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error deleting images', error });
  }
});


router.get('/',async(req,res)=>{
  const data=await About.find();
  res.status(200).send(data);
})

module.exports = router;
