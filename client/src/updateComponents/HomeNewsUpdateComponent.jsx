import React from 'react'
import { Route ,Outlet,Routes,NavLink,useLocation} from 'react-router-dom'
import HomeNewsInsert from '../updateSubComponents/HomeNewsInsert'
import HomeNewsDelete from '../updateSubComponents/HomeNewsDelete'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import '../Styles/updateSubComponentStyle/subComponentActiveStyle.css';
import '../Styles/updateSubComponentStyle/homeNewsUpdateStyle.css';
const HomeNewsUpdateComponent = () => {
    const navigate=useNavigate();
    function handleClick(){
        navigate('/homeUpdateComponent')
    }
    const location=useLocation();
    const isInsertActive =
    location.pathname === '/homeUpdateComponent/homeNewsUpdateComponent' || location.pathname === '/homeUpdateComponent/homeNewsUpdateComponent/homeNewsInsert';
  const isDeleteActive = location.pathname === '/homeUpdateComponent/homeNewsUpdateComponent/homeNewsDelete';
  return (
    <div>
        <div onClick={handleClick} className='backward-button'>
            <button>
              < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
            </button>
        </div>
        <h3 className='HomeNewsUpdate-Title'>Home News Update Section</h3>
      <ul id="HomeNewsUpdate-ul">
        <li>
          <NavLink to="/homeUpdateComponent/homeNewsUpdateComponent/homeNewsInsert"
            className={isInsertActive ? 'inside-updateComponent-active-class' : ''}
          >Insert</NavLink>
        </li>
        <li>
          <NavLink to="/homeUpdateComponent/homeNewsUpdateComponent/homeNewsDelete"
          className={isDeleteActive? 'inside-updateComponent-active-class' : ''}
          >Delete</NavLink>
        </li>
      </ul>
        <Outlet/>
    </div>
  )
}

export default HomeNewsUpdateComponent
