const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors=require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const {HomeSlideImage,news,About,galleryImage,userMessage} = require('./DbConnection'); // Import Image model
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json())

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Image Route
app.post('/upload', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.body);
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    // Upload image to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }

      // Save the URL and public ID in MongoDB
      const image = new HomeSlideImage({
        public_id: result.public_id,
        url: result.secure_url,
      });

      await image.save();

      return res.status(200).json({
        message: 'Upload successful',
        data: result,
        image: { public_id: result.public_id, url: result.secure_url },
      });
    }).end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the image upload', error });
  }
});

// Delete Image Route
app.delete('/delete/:public_id', async (req, res) => {
  const { public_id } = req.params;

  try {
    cloudinary.uploader.destroy(public_id, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting from Cloudinary', error });
      }

      const image = await HomeSlideImage.findOneAndDelete({ public_id });

      if (!image) {
        return res.status(404).json({ message: 'Image not found in database' });
      }

      return res.status(200).json({ message: 'Image deleted successfully', data: result });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing delete request', error });
  }
});

// Update Image Route
app.put('/update/:public_id', upload.single('image'), async (req, res) => {
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

        return res.status(200).json({
          message: 'Image updated successfully',
          updatedImage: {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
          },
        });
      }).end(req.file.buffer);
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the update request', error });
  }
});

app.post('/upload/About',upload.single('image'), async (req, res) =>{
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const{description,staff,title}=req.body;
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }
      const aboutInstance = new About({
          title:title,
          description:description,
          imageUrl:result.secure_url,
          public_id:result.public_id,
          staff:staff
      });

      await aboutInstance.save();

      return res.status(200).json({
        message: 'Upload successful',
        data: result,
        image: { public_id: result.public_id, url: result.secure_url },
      });
    }).end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the image upload', error });
  }

})


app.post('/upload/GalleryImage',upload.single('image'), async (req, res) =>{
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  try {
    const{Number}=req.body;
    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error uploading to Cloudinary', error });
      }
      const galleryImg=new galleryImage({
        Number:Number,
        imageUrl:result.secure_url,
        public_id:result.public_id,
      })
      await galleryImg.save();
      return res.status(200).json({
        message: 'Upload successful',
        data: result,
        image: { public_id: result.public_id, url: result.secure_url },
      });
    }).end(req.file.buffer);
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the image upload', error });
  }

})

app.post('/submit/message-form',async(req,res)=>{
      console.log(req.body);
      const messageInstance=new userMessage({
        Name:name,
        Email:email,
        MobileNo:mobileNo,
        Message:message
      });
      try{
        await messageInstance.save();
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

app.get('/fetch',async(req,res)=>{
        const image=await HomeSlideImage.find({},'url');
        res.send(image);
});

app.get('/news',async(req,res)=>{
    const data=await news.find();
    res.send(data);
})


app.get('/About',async(req,res)=>{
    const data=await About.find();
    res.send(data);
})

app.get('/imageGallery',async(req,res)=>{
  const data=await galleryImage.find();
  console.log(data);
  res.send(data);
})


let admin = {
  username: 'admin',
  password: 'admin123', 
};

app.use(bodyParser.json());  


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
 
  if (username === admin.username && password === admin.password) {
   
    const token = jwt.sign({ username: admin.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }

  
  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});


app.post('/api/change-password', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }
  jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    const { newPassword } = req.body;
    admin.password = newPassword;

    return res.json({ success: true, message: 'Password changed successfully!' });
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
