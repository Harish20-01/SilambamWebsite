const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const validateToken=(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log(req.headers);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
      }
      else{
        next()
      }
    })
    
}
module.exports=validateToken;