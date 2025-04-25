const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const newsSchema=new mongoose.Schema({
  title:String,
  description:String,
  imageUrl:String,
  public_id:String,
  publishedAt:String
});

const aboutSchema=new mongoose.Schema({
  title:String,
  description:String,
  imageUrl:String,
  public_id:String,
})

const galleryImageSchema=new mongoose.Schema({
  Number:Number,
  imageUrl:String,
  public_id:String
})

const userMessageSchema=new mongoose.Schema({
  Name:String,
  Email:String,
  MobileNo:String,
  Message:String
})

const adminCredentials=new mongoose.Schema({
  username:String,
  password:String
})

const homeClassVenue=new mongoose.Schema({
  place:String,
  day:String,
  timing:String,
  description:String,
}) 

const SilambamProducts=new mongoose.Schema({
    public_id:String,
    imageUrl:String,
    name:String,
    price:Number,
    description:String
})

const YoutubeVideoId=new mongoose.Schema({
  title:String,
  id:String
})

const UserReview=new mongoose.Schema({
  name:String,
  text:String,
  reviewerType:String
})

const news=mongoose.model('news',newsSchema);

const HomeSlideImage = mongoose.model('HomeSlideImage', imageSchema);

const About=mongoose.model('About',aboutSchema);

const galleryImage=mongoose.model('galleryImage',galleryImageSchema);

const userMessage=mongoose.model('userMessage',userMessageSchema);

const admin=mongoose.model('admin',adminCredentials);

const ClassVenue=mongoose.model('ClassVenue',homeClassVenue);

const Products=mongoose.model('Products',SilambamProducts);

const YoutubeId=mongoose.model('YoutubeId',YoutubeVideoId);

const Reviews=mongoose.model("Reviews",UserReview);

module.exports ={HomeSlideImage,news,About,galleryImage,userMessage,admin,ClassVenue,Products,YoutubeId,Reviews};


