import React from 'react'
import HomeSlideImageInsert from '../updateSubComponents/HomeSlideImageInsert'
import {NavLink,Outlet,Route,Routes} from 'react-router-dom';
import HomeSlideImageDelete from '../updateSubComponents/HomeSlideImageDelete';
import { useNavigate ,useLocation} from 'react-router-dom';
import '../Styles/updateSubComponentStyle/homeSlideImageUpdate.css';
import '../Styles/updateSubComponentStyle/subComponentActiveStyle.css';
import { FaArrowLeft } from 'react-icons/fa';
const HomeSlideimageUpdateComponent = () => {
    const navigate=useNavigate();
    function handleBackFuction(){
      navigate('/homeUpdateComponent');
  }
    const location=useLocation();
    const isInsertActive =
    location.pathname === '/homeUpdateComponent/homeSlideComponent' || location.pathname === '/homeUpdateComponent/homeSlideComponent/homeSlideImageInsert';
    const isDeleteActive = location.pathname === '/homeUpdateComponent/homeSlideComponent/homeSlideImageDelete';
  return (
    <>
        <div onClick={handleBackFuction} className='backward-button'>
            <button>
                < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
            </button>
        </div>
        <div className='homeSlideimage-header'>
            <h3>Home Slideshow Image Update Section</h3>
        </div>
    <div id="HomeSlideImage-update"> 
        <ul>
            <li>
                <NavLink to="/homeUpdateComponent/homeSlideComponent/homeSlideImageInsert"
                    className={isInsertActive? 'inside-updateComponent-active-class' : ''}
                >
                Insert</NavLink>
            </li>
            <li><NavLink to="/homeUpdateComponent/homeSlideComponent/homeSlideImageDelete"
                    className={ isDeleteActive ? 'inside-updateComponent-active-class' : ''}
            >Delete</NavLink>
            </li>
        </ul>
        <Outlet/>
    </div>
    </>
  )
}

export default HomeSlideimageUpdateComponent
