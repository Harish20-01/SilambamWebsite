import React from 'react';
import { useNavigate,NavLink, Route ,Routes,Outlet, useLocation} from 'react-router-dom';
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
    location.pathname === '/productUpdateComponent' || location.pathname === '/productUpdateComponent/productInsert';
  const isDeleteActive = location.pathname === '/productUpdateComponent/productDelete';
  return (
    <div>
        <div onClick={handleBackFuction} className='backward-button'>
          <button>
          < FaArrowLeft style={{verticalAlign:"middle",margin:'2px'}}/>
          </button>  
        </div>
        <div id="About-Update-Container"> 
            <h2 style={{textAlign:"center",color:"red",margin:"2%"}}>Product Update Section</h2>
            <ul style={{display:"flex",alignItems:"center",justifyContent:"space-around",backgroundColor:"aqua",listStyleType:"none",padding:"0.5%"}}> 
              <li>
                <NavLink to="/productUpdateComponent/productInsert"
                  className={ isInsertActive ? 'inside-updateComponent-active-class' : ''}
                >Insert</NavLink>
              </li>
              <li>
                <NavLink to="/productUpdateComponent/productDelete"
                className={isDeleteActive ? 'inside-updateComponent-active-class' : ''}
                >Delete</NavLink>
              </li>
            </ul>
            <Outlet/>
        </div>
    </div>
  )
}

export default AboutUpdateComponent
