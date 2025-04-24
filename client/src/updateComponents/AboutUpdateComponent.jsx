import React from 'react';
import { useNavigate,NavLink, Route ,Routes,Outlet, useLocation} from 'react-router-dom';
import AboutInsertComponent from '../updateSubComponents/AboutInsertComponent';
import AboutDeleteComponent from '../updateSubComponents/AboutDeleteComponent';
import '../Styles/updateSubComponentStyle/subComponentActiveStyle.css';
import '../Styles/updateSubComponentStyle/aboutUpdateStyle.css';
import { FaArrowLeft} from 'react-icons/fa';

const AboutUpdateComponent = () => {
  const navigate=useNavigate();
  function handleBackFuction(){
      navigate('/updateComponenet');
  }
  const location=useLocation();
  const isInsertActive =
    location.pathname === '/aboutUpdateComponent' || location.pathname === '/aboutUpdateComponent/insertAboutImage';
  const isDeleteActive = location.pathname === '/aboutUpdateComponent/deleteAboutImage';
  const isUpdateActive=location.pathname==='/aboutUpdateComponent/updateAboutImage';
  return (
    <div>
        <div onClick={handleBackFuction} className='backward-button'>
          <button>
          < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
          </button>  
        </div>
        <div id="About-Update-Container"> 
            <nav>
              <li>
                <NavLink to="/aboutUpdateComponent/insertAboutImage"
                  className={ isInsertActive ? 'inside-updateComponent-active-class' : ''}
                >Insert</NavLink>
              </li>
              <li>
                <NavLink to="/aboutUpdateComponent/updateAboutImage"
                className={isUpdateActive ? 'inside-updateComponent-active-class' : ''}
                >Update</NavLink>
              </li>
              <li>
                <NavLink to="/aboutUpdateComponent/deleteAboutImage"
                className={isDeleteActive ? 'inside-updateComponent-active-class' : ''}
                >Delete</NavLink>
              </li>
            </nav>
            <Outlet/>
        </div>
    </div>
  )
}

export default AboutUpdateComponent
