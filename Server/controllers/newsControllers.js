const express = require('express');
const { news } = require('../models/model');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const multer=require('multer');
const validateRoute=require('../validation/validateRoute')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Get News
router.get('/', async (req, res) => {
  try {
    const data = await news.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

router.post('/',validateRoute,upload.single('image'),async(req,res)=>{
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const { description, title } = req.body;
    
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }
      const date=new Date();
      const newsInstance = new news({
        title,
        description,
        imageUrl: result.secure_url,
        public_id: result.public_id,
        publishedAt:date
      });
      
      await newsInstance.save();
      return res.status(200).json({ message: 'Upload successful', image: { public_id: result.public_id, url: result.secure_url } });
    }).end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the upload', error });
  }

})

router.delete('/',validateRoute, async (req, res) => {
  const { public_ids } = req.body.dataa; 
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

      // Then, delete from your database
      const image = await news.findOneAndDelete({ public_id });
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


module.exports = router;
