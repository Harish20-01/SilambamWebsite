import React from 'react';
import { NavLink, Route,Routes, useNavigate ,useLocation,Outlet} from 'react-router-dom';
import ImageDeleteComponent from '../updateSubComponents/ImageDeleteComponent';
import '../Styles/updateSubComponentStyle/imageUpdateStyle.css';
import '../Styles/updateSubComponentStyle/subComponentActiveStyle.css';
import ImageInsertComponent from '../updateSubComponents/ImageInsertComponent';
import { FaArrowLeft } from 'react-icons/fa';

const imageUpdateComponent = () => {
    const navigate=useNavigate();
    function handleBackFuction(){
    navigate('/updateComponenet');
  }
    const location=useLocation();
    const isInsertActive =
    location.pathname === '/imageUpdateComponent' || location.pathname === '/imageUpdateComponent/imageInsertComponent';
    const isDeleteActive = location.pathname === '/imageUpdateComponent/imageDeleteComponent';
  return (
    <div>
      <div onClick={handleBackFuction} className='backward-button'>
          <button>
            < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
          </button>
      </div>
      <div id="ImageUpdate-Container">
          <NavLink to="/imageUpdateComponent/imageInsertComponent"
            className={isInsertActive? 'inside-updateComponent-active-class' : ''}
          >Insert</NavLink>
          <NavLink to="/imageUpdateComponent/imageDeleteComponent"
            className={isDeleteActive? 'inside-updateComponent-active-class' : ''}
          >Delete</NavLink>
      </div>
      <Outlet/>
    </div>
    
  )
}

export default imageUpdateComponent
