/* import React from 'react'
import { useNavigate ,Link, Route, Routes, Outlet} from 'react-router-dom';
import HomeSlideimageUpdateComponent from './HomeSlideimageUpdateComponent';
import '../Styles/updateSubComponentStyle/homeUpdateComponent.css';
import { FaArrowLeft } from 'react-icons/fa';
const HomeUpdateComponent = () => {
    const navigate=useNavigate();
    function handleBackFuction(){
        navigate('/updateComponenet');
    }
  return (
    <>
    <div  className='backward-button'>
       <button onClick={handleBackFuction}> 
        < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
       </button>
    </div>
    <div id="HomeUpdateComponent">
        <h3>Home Update Section...</h3>
        <h2> Choose  section to edit </h2>
        <Link to="homeSlideComponent">HomeSlideImage</Link>
        <Link to="homeNewsUpdateComponent">HomeNews</Link>
        <Link to='classVenueUpdateComponent'>ClassVenue</Link>
        <Link to="youtubeUpdateComponent">YoutubeLink</Link>
        <Link to="reviewDeleteComponent">Reviews</Link>
      <Outlet/>
    </div>
    </>
  )
}

export default HomeUpdateComponent
 */

import React from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../Styles/updateSubComponentStyle/homeUpdateComponent.css';

const HomeUpdateComponent = () => {
  const navigate = useNavigate();

  const handleBackFunction = () => {
    navigate('/updateComponenet');
  };

  return (
    <>
       <div onClick={handleBackFunction} className='backward-button'>
          <button>
              < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
           </button>
        </div>

      <div className="home-update-container">
        <h1 className="home-update-title">Home Update Section (முகப்பு மாற்றம்)</h1>
        <p className="home-update-subtitle">Choose a section to edit from below.</p>

        <div className="home-update-actions">
          <Link to="homeSlideComponent" className="home-update-card">
            <h3>Home Slide Images</h3>
            <p>Update carousel images on the homepage.</p>
          </Link>

          <Link to="homeNewsUpdateComponent" className="home-update-card">
            <h3>Home News</h3>
            <p>Edit news/events shown on homepage.</p>
          </Link>

          <Link to="classVenueUpdateComponent" className="home-update-card">
            <h3>Class Venues</h3>
            <p>Update location and venue information.</p>
          </Link>

          <Link to="youtubeUpdateComponent" className="home-update-card">
            <h3>YouTube Links</h3>
            <p>Manage embedded video content.</p>
          </Link>

          <Link to="reviewDeleteComponent" className="home-update-card">
            <h3>Reviews</h3>
            <p>Delete or manage public reviews.</p>
          </Link>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default HomeUpdateComponent;
