import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/SubComponentsStyles/passwordUpdateStyle.css';
import{useToast} from '../../public/MessageToastContent';
const PasswordUpdate = () => {
  const{showError,showSuccess}=useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const[oldPassword,setOldPassword]=useState('');
  const[username,setUsername]=useState('')
  const [successMessage, setSuccessMessage] = useState('');
  const url=import.meta.env.VITE_SERVER_URL;
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      showError('Passwords do not match!');
      return;
    }

    // Get the token from localStorage
    const token = sessionStorage.getItem('authToken');

    try {
      const response = await axios.post(`${url}/api/change-password`, {
        username,
        oldPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)

      if (response.data.success) {
        showSuccess('Password changed successfully!');
        setNewPassword('');
        setOldPassword('');
        setUsername('');
        setConfirmPassword('');
        setError('');
      }
      else {
        showError('invalid username or password');
      }
    } catch (err) {
      console.log(err)
      showError('Failed to change password. Please try again.');
    }
  };

  return (
    <div id="PasswordUpdate-Container">
      <h2>Admin Update Page</h2>
      <p>This page is only accessible by logged-in admins. Here you can change your password.</p>
      {/* Password Change Form */}
      <div>
        <h3>Change Password</h3>
        <form onSubmit={handlePasswordChange}>
        <div>
            <label>User Name</label>
            <input
              type='text'
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>Old Password</label>
            <input
              type='password'
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
              required
            ></input>
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <button type="submit" id="Password-Update-Submit-Button">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
