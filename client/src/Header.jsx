import React, { useState } from 'react'
import logo from '../Logo/logo.png';
import './Styles/header.css';
import {NavLink} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
const Header = () => {
  const[menuOpen,setMenuOpen]=useState(false);
  function handleChange(){
    setMenuOpen(!menuOpen);
  }
  function handleNavClick(){
    setMenuOpen(false);
  }
  return (
    <>
      <nav >
        <div id="Logo">
            <img src={logo}></img>
            <h3>தமிழர் மரபுக் கலையகம்</h3>
        </div>
        <div id="Navbar-items" className={menuOpen?'activate':''}>
            <li><NavLink 
                to="/"
                className={({isActive})=>isActive?'active li':'li'}
                onClick={handleNavClick}
                >முகப்பு</NavLink>   
            </li>
           
            <li id="dropDown" className='dropDown'><NavLink 
                to="/gallery"
                className={({isActive})=>isActive?'active li':' li'}
                >கலைவெளி </NavLink>      
                <ul id="dropDown-Content" className='dropDown-Content'>
                    <li><NavLink 
                    to="/gallery/image"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                    > படம்</NavLink>      
                    </li>
                    <li><NavLink 
                    to="/gallery/video"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                    >வீடியோ</NavLink>     
                    </li>
                </ul>
            </li>
            <li><NavLink
                to="/About"
                className={({isActive})=>isActive?'active li':'li'}
                onClick={handleNavClick}
                >பாடங்கள்</NavLink>   
            </li>
            <li><NavLink 
                to="/Silambam"
                className={({isActive})=>isActive?'active li':'li'}
                onClick={handleNavClick}
                >பொருட்கள்</NavLink>     
            </li>
            <li><NavLink 
                    to="/Contact"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                  >தொடர்பு</NavLink>      
             </li>
        </div>
        <div id="Login-Container">
              <NavLink 
                    to="/login"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                    title='Only For Admin'
                  >LogIn</NavLink> 
        </div>
        <div id="ToggleMenu" 
            onClick={handleChange}
            >
            <FaBars id="bar"/>
        </div>
      </nav>
    </>
  )
}

export default Header;
