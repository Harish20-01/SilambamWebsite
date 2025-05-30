const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { galleryImage} = require('../models/model');
const router = express.Router();
const validateRoute=require('../validation/validateRoute')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle multiple image uploads
router.post('/upload',validateRoute, upload.array('images', 10), async (req, res) => {

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    
    const uploadedImages = [];
    
    for (let file of req.files) {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
        }

        const aboutInstance = new galleryImage({
          
          imageUrl: result.secure_url,
          public_id: result.public_id,
          
        });

        await aboutInstance.save();

        
        uploadedImages.push({
          public_id: result.public_id,
          url: result.secure_url,
        });

        if (uploadedImages.length === req.files.length) {
          return res.status(200).json({ message: 'Upload successful', images: uploadedImages });
        }
      }).end(file.buffer);
    }
  } catch (error) {
    console.error('Error processing the upload:', error);
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
      const image = await galleryImage.findOneAndDelete({ public_id });
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

router.get("/",async(req,res)=>{
  const data=await galleryImage.find();
  res.status(200).send(data);
});



module.exports = router;
