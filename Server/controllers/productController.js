const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Products } = require('../models/model');
const router = express.Router();
const validateRoute = require('../validation/validateRoute');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res) => {
  const data = await Products.find();
  return res.status(200).send(data);
});


router.post('/', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 5 }
]), validateRoute, async (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'Main image is required' });
  }

  try {
    const { price, description, name } = req.body;

    const mainImageResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(req.files.image[0].buffer);
    });

    let additionalImageUrls = [];
    if (req.files.additionalImages) {
      const uploadPromises = req.files.additionalImages.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }).end(file.buffer);
        });
      });
      additionalImageUrls = await Promise.all(uploadPromises);
    }
    const ProductInstance = new Products({
      price,
      description,
      imageUrl: mainImageResult.secure_url,
      public_id: mainImageResult.public_id,
      name,
      additionalImages: additionalImageUrls
    });

    await ProductInstance.save();

    return res.status(200).json({ message: 'Upload successful', data: ProductInstance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing the upload', error });
  }
});

router.delete('/', validateRoute, async (req, res) => {
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

      const image = await Products.findOneAndDelete({ public_id });
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

router.put('/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'additionalImages', maxCount: 5 } 
]), validateRoute, async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { id } = req.params;
    const product = await Products.findById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.files?.image?.[0]) {
      if (product.public_id) {
        await cloudinary.uploader.destroy(product.public_id);
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }).end(req.files.image[0].buffer);
      });

      product.imageUrl = result.secure_url;
      product.public_id = result.public_id;
    }

    // Upload new additional images
    if (req.files?.additionalImages?.length > 0) {
      const uploadPromises = req.files.additionalImages.map(file => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (err, result) => {
            if (err) reject(err);
            else resolve(result.secure_url);
          }).end(file.buffer);
        });
      });

      const additionalImageUrls = await Promise.all(uploadPromises);
      product.additionalImages = additionalImageUrls;
    }

    product.name = name;
    product.price = price;
    product.description = description;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update failed', error });
  }
});



module.exports = router;