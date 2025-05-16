/* import React from 'react'
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

export default UpdateComponent */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../public/MessageToastContent';
import '../Styles/updateSubComponentStyle/updateComponentStyle.css'; // Reuse home styles for visual consistency

const UpdateComponent = () => {
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  function handleLogOut() {
    sessionStorage.setItem('isLoggedIn', false);
    sessionStorage.setItem('authToken', null);
    navigate('/login');
    showSuccess('Logged Out Successfully');
  }

  return (
    <div className="admin-home-container">
      <h1 className="admin-title">Admin Dashboard (முகப்பலகம்)</h1>
      <p className="admin-subtitle">Update various sections of your content here.</p>

      <div className="admin-actions">
        <Link to="/homeUpdateComponent" className="admin-card">
          <h3>Home (முகப்பு)</h3>
          <p>Modify homepage content and banners.</p>
        </Link>

        <Link to="/imageUpdateComponent" className="admin-card">
          <h3>Gallery (படங்கள்)</h3>
          <p>Update or add gallery images.</p>
        </Link>

        <Link to="/aboutUpdateComponent" className="admin-card">
          <h3>Arts (கலைகள்)</h3>
          <p>Edit cultural content and artistic highlights.</p>
        </Link>

        <Link to="/productUpdateComponent" className="admin-card">
          <h3>Products (பொருட்கள்)</h3>
          <p>Manage and update product listings.</p>
        </Link>

        <Link to="/passwordUpdateComponent" className="admin-card">
          <h3>Change Password (கடவுச்சொல் மாற்ற)</h3>
          <p>Update your administrator password.</p>
        </Link>
      </div>

      <div id="Logout-Container">
        <button onClick={handleLogOut} className="logout-button">Log Out (வெளியேறு)</button>
      </div>
    </div>
  );
};

export default UpdateComponent;

