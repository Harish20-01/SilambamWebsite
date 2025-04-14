import React, { useState } from 'react'
import vite from './vite.svg';
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
            <img src={vite}></img>
            <h3>Tamilar Martial Arts Silambam</h3>
        </div>
        <div id="Navbar-items" className={menuOpen?'activate':''}>
            <li><NavLink 
                to="/"
                className={({isActive})=>isActive?'active li':'li'}
                onClick={handleNavClick}
                >Home</NavLink>   
            </li>
            <li><NavLink
                to="/About"
                className={({isActive})=>isActive?'active li':'li'}
                onClick={handleNavClick}
                >About&nbsp;us</NavLink>   
            </li>
            <li><NavLink 
                to="/Silambam"
                className={({isActive})=>isActive?'active li':'li'}
                onClick={handleNavClick}
                >Silambam</NavLink>     
            </li>
            <li id="dropDown" className='dropDown'><NavLink 
                to="/gallery"
                className={({isActive})=>isActive?'active li':' li'}
                >gallery</NavLink>      
                <ul id="dropDown-Content" className='dropDown-Content'>
                    <li><NavLink 
                    to="/gallery/image"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                    >image</NavLink>      
                    </li>
                    <li><NavLink 
                    to="/gallery/video"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                    >video</NavLink>     
                    </li>
                </ul>
            </li>
            <li><NavLink 
                    to="/Contact"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                  >Contact&nbsp;Us</NavLink>      
             </li>
        </div>
        <div id="Login-Container">
              <NavLink 
                    to="/login"
                    className={({isActive})=>isActive?'active li':'li'}
                    onClick={handleNavClick}
                    title='Only For Admin'
                  >Log In</NavLink> 
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
