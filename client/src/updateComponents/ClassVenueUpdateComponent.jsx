import React from 'react'
import { Route ,Outlet,Routes,NavLink,useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import '../Styles/updateSubComponentStyle/subComponentActiveStyle.css';
import '../Styles/updateSubComponentStyle/homeNewsUpdateStyle.css';
const ClassVenueUpdateComponent = () => {
    const navigate=useNavigate();
    function handleClick(){
        navigate('/homeUpdateComponent')
    }
    const location=useLocation();
    const isInsertActive =
    location.pathname === '/homeUpdateComponent/classVenueUpdateComponent' || location.pathname === '/homeUpdateComponent/classVenueUpdateComponent/classVenueInsert';
  const isDeleteActive = location.pathname === '/homeUpdateComponent/classVenueUpdateComponent/classVenueDelete';
  return (
    <div>
        <div onClick={handleClick} className='backward-button'>
            <button>
              < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
            </button>
        </div>
        <h3 className='HomeNewsUpdate-Title'>Class Venue Update Section</h3>
      <ul id="HomeNewsUpdate-ul">
        <li>
          <NavLink to="/homeUpdateComponent/classVenueUpdateComponent/classVenueInsert"
            className={isInsertActive ? 'inside-updateComponent-active-class' : ''}
          >insert</NavLink>
        </li>
        <li>
          <NavLink to="/homeUpdateComponent/classVenueUpdateComponent/classVenueDelete"
          className={isDeleteActive? 'inside-updateComponent-active-class' : ''}
          >delete</NavLink>
        </li>
      </ul>
        <Outlet/>
    </div>
  )
}

export default ClassVenueUpdateComponent;
