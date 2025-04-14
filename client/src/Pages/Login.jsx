import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/SubComponentsStyles/login.css';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const{showSuccess,showError}=useToast();
  const[isProcessing,setIsPreocessing]=useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsPreocessing(true);

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
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
    <div id="Login-Form-Container">
    <div className="login-form">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Password</label>
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
