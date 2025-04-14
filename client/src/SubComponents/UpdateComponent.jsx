import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../Styles/updateSubComponentStyle/updateComponentStyle.css';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../public/MessageToastContent';
const UpdateComponent = () => {
  const navigate=useNavigate();
  const{showSuccess}=useToast();
  function handleLogOut(){
      sessionStorage.setItem('isLoggedIn',false);
      sessionStorage.setItem('authToken',null);
      navigate('/login');
      showSuccess('Logged Out Successfully');
  }
  return (
    <div>
      <div id="admin-heading">
          <h1>Admin Dashboard</h1>
      </div>
      <div id="Update-Component">
          <div>
           
            {/* Navigation Links */}
                <Link to="/homeUpdateComponent">Home</Link>
                <Link to="/aboutUpdateComponent">About</Link>
                <Link to="/imageUpdateComponent">Gallery</Link>
                <Link to="/passwordUpdateComponent">Change Password</Link>  
          </div>
    
      </div>
      <div id="Logout-Container">
          <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  )
}

export default UpdateComponent
