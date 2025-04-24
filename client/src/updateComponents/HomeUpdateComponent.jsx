import React from 'react'
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
