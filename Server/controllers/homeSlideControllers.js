const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { HomeSlideImage } = require('../models/model');
const router = express.Router();
const validateRoute=require('../validation/validateRoute');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image Route
router.post('/upload',validateRoute, upload.single('image'), async (req, res) => {
   
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }

      const image = new HomeSlideImage({
        public_id: result.public_id,
        url: result.secure_url,
      });

      await image.save();
      return res.status(200).json({ message: 'Upload successful', image: { public_id: result.public_id, url: result.secure_url } });
    }).end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the image upload', error });
  }
});

router.delete('/',validateRoute, async (req, res) => {
  const { public_ids } = req.body; 
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
      const image = await HomeSlideImage.findOneAndDelete({ public_id });
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


// Update Image Route
router.put('/update/:public_id', upload.single('image'), async (req, res) => {
  const { public_id } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    cloudinary.uploader.destroy(public_id, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting the old image from Cloudinary', error });
      }

      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (uploadError, uploadResult) => {
        if (uploadError) {
          return res.status(500).json({ message: 'Error uploading new image to Cloudinary', error: uploadError });
        }

        const updatedImage = await HomeSlideImage.findOneAndUpdate(
          { public_id },
          { public_id: uploadResult.public_id, url: uploadResult.secure_url },
          { new: true }
        );

        if (!updatedImage) {
          return res.status(404).json({ message: 'Image not found in database to update' });
        }

        return res.status(200).json({ message: 'Image updated successfully', updatedImage: { public_id: uploadResult.public_id, url: uploadResult.secure_url } });
      }).end(req.file.buffer);
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the update request', error });
  }
});


 router.get("/images",async(req,res)=>{
      const data=await HomeSlideImage.find();
      res.status(200).send(data);
 })

module.exports = router;
