const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5500'],// Adjust this URL for your frontend
  credentials: true,               // Allow cookies
}));
app.use(cookieParser());
app.use(express.json());

// Simple login route to set a cookie
app.post('/login', (req, res) => {
  const { username } = req.body;
  console.log(username,req.url);
  // In a real scenario, you would validate the user
  if (username === 'user') {
    
    // Set the cookie on the response
    res.cookie('authToken', 'q22222222', {
      httpOnly: true,   // Cannot be accessed by JS
      secure: false,    // Set to true in production with HTTPS
      sameSite: 'None', // Required for cross-origin cookies
    });
    

    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid username' });
});

// Protected route that requires the cookie
app.get('/protected', (req, res) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // In a real scenario, you would verify the JWT token here

  return res.status(200).json({ message: 'Protected content', token });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
