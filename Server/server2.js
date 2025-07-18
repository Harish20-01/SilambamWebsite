const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const corsOptions = {
  origin:['https://silambamwebsite-1.onrender.com','http://localhost:5173'],  
  credentials: true,  
  methods: ['GET', 'POST','DELETE','PUT'],  
  allowedHeaders: ['Authorization', 'Content-Type'],          
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


const homeSlideRoutes = require('./controllers/homeSlideControllers');
const newsRoutes = require('./controllers/newsControllers');
const aboutRoutes = require('./controllers/aboutControllers');
const galleryRoutes = require('./controllers/galleryControllers');
const adminControlRoutes=require('./controllers/adminControllers');
const homeClassVenue=require('./controllers/classVenueControllers');
const SilambamProducts=require('./controllers/productController');
const YoutubeId=require('./controllers/youtubeVideoControllers');
const Review=require('./controllers/reviewControllers');
const userCommnet=require('./controllers/userMessageController');
const visitCount=require('./controllers/visitControllers');

app.use('/homeSlide', homeSlideRoutes);
app.use('/news', newsRoutes);
app.use('/about', aboutRoutes);
app.use('/gallery', galleryRoutes);
app.use('/api',adminControlRoutes);
app.use('/class-venue',homeClassVenue);
app.use('/silambam-products',SilambamProducts);
app.use('/youtube-video',YoutubeId);
app.use('/reviews',Review);
app.use('/message-form',userCommnet);
app.use('/visitCount',visitCount);


const admin = { username: 'admin', password: 'admin123' };

/* app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ username: admin.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
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
}); */


/* app.post('/api/change-password', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }
  
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    const { newPassword } = req.body;
    admin.password = newPassword;
    return res.json({ success: true, message: 'Password changed successfully!' });
  });
});
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
