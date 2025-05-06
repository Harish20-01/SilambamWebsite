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
          <h1>Admin Dashboard(முகப்பலகம்)</h1>
      </div>
      <div id="Update-Component">
          <div>
            {/* Navigation Links */}
                <Link to="/homeUpdateComponent">Home(முகப்பு)</Link>
                <Link to="/imageUpdateComponent">Gallery(படங்கள்)</Link>
                <Link to="/aboutUpdateComponent">Arts(கலைகள்)</Link>
                <Link to="/productUpdateComponent">Products(பொருட்கள்)</Link>
                <Link to="/passwordUpdateComponent">Change Password(கடவுச்சொல் மாற்ற)</Link>  
          </div>
      </div>
      <div id="Logout-Container">
          <button onClick={handleLogOut}>Log Out(வெளியேறு)</button>
      </div>
    </div>
  )
}

export default UpdateComponent
