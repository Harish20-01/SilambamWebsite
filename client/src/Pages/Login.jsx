import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/SubComponentsStyles/login.css';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import { FaUser, FaLock } from 'react-icons/fa';
import image from '../../public/backgroundImage.jpg';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const{showSuccess,showError}=useToast();
  const[isProcessing,setIsPreocessing]=useState(false);
  const url=import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsPreocessing(true);

    try {
      const response = await axios.post(`${url}/api/login`, {
        username,
        password
      });
      console.log(response);
      if (response.data.success) {
        setIsLoggedIn(true); 
        sessionStorage.setItem('authToken', response.data.token);  
        sessionStorage.setItem('isLoggedIn',true);
        navigate('/update');  
        setIsPreocessing(false);
        showSuccess('Logged in Succesfull');
      }
    } catch (err) {
        setIsPreocessing(false);
        setError('invalid username or password');
        showError('Invalid username or password');
    }
  };

  

  return (
    isProcessing?(<LoadingComponent/> ): (
    <div id="Login-Form-Container" 
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%',
    }}>
      
    <div className="login-form">
      <h2>Admin Login(நிர்வாகி)</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username(பயனர்)<FaUser/></label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password(கடவுச்சொல்)<FaLock/></label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <div>
            {error && <p>{error}</p>}
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>)
    
  );
};

export default Login;
