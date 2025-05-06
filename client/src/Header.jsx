/* import React, { useState } from 'react';
import logo from '../Logo/logo.png';
import './Styles/header.css';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleChange() {
    setMenuOpen(!menuOpen);
  }

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className={menuOpen?'border-radius':''}>
        <div id="Logo">
          <img src={logo} alt="logo" />
          <h3>தமிழர்&nbsp;மரபுக்&nbsp;கலையகம்</h3>
          
          <div className="quote">
            "Land of Traditional Arts"
          </div>
        </div>

        <div id="Navbar-items" className={menuOpen ? 'activate' : ''}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active li' : 'li')}
              onClick={handleNavClick}
            >
              முகப்பு
            </NavLink>
          </li>

          <li id="dropDown" className="dropDown">
            <NavLink
              to="/gallery"
              className={({ isActive }) => (isActive ? 'active li' : ' li')}
              onClick={handleNavClick}
            >
              படங்கள்
            </NavLink>
            <ul id="dropDown-Content" className="dropDown-Content">
              <li>
                <NavLink
                  to="/gallery/image"
                  className={({ isActive }) => (isActive ? 'active li' : 'li')}
                  onClick={handleNavClick}
                >
                  படம்
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/gallery/video"
                  className={({ isActive }) => (isActive ? 'active li' : 'li')}
                  onClick={handleNavClick}
                >
                  வீடியோ
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/About"
              className={({ isActive }) => (isActive ? 'active li' : 'li')}
              onClick={handleNavClick}
            >
              கலைகள்
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Silambam"
              className={({ isActive }) => (isActive ? 'active li' : 'li')}
              onClick={handleNavClick}
            >
              பொருட்கள்
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Contact"
              className={({ isActive }) => (isActive ? 'active li' : 'li')}
              onClick={handleNavClick}
            >
             தொடர்புக்கு
            </NavLink>
          </li>
        </div>

        <div id="Login-Container">
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? 'active li' : 'li')}
            onClick={handleNavClick}
            title="Only For Admin"
          >
             உள்நுழைய
          </NavLink>
        </div>

        <div id="ToggleMenu" onClick={handleChange}>
          <FaBars id="bar" />
        </div>
      </nav>
    </>
  );
};

export default Header;
 */

import React, { useState, useEffect } from 'react';
import logo from '../Logo/logo.png';
import './Styles/header.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setMenuOpen(!menuOpen);
    setShowCourses(false);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
    setShowCourses(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('https://silambamwebsite.onrender.com/about');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/About?course=${courseId}`);
    setMenuOpen(false);
    setShowCourses(false);
  };

  return (
    <>
      <nav className={menuOpen ? 'border-radius' : ''}>
        <div id="Logo">
          <img src={logo} alt="logo" />
          <h3>தமிழர்&nbsp;மரபுக்&nbsp;கலையகம்</h3>
          <div className="quote">"Land of Traditional Arts"</div>
        </div>

        <div id="Navbar-items" className={menuOpen ? 'activate' : ''}>
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
              முகப்பு
            </NavLink>
          </li>

          <li id="dropDown" className="dropDown">
            <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
              படங்கள்
            </NavLink>
            <ul id="dropDown-Content" className="dropDown-Content">
              <li>
                <NavLink to="/gallery/image" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
                  படம்
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery/video" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
                  வீடியோ
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="mobile-only" style={{fontWeight:"bold"}}>
            <div className="li" onClick={() => setShowCourses(!showCourses)}>
              கலைகள் ▼
            </div>
            {showCourses && (
              <ul className="mobile-course-dropdown">
                {courses.map((course) => (
                  <li key={course._id}>
                    <div className="li" onClick={() => handleCourseClick(course._id)}>
                      {course.title}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <NavLink to="/About" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
              கலைகள் தொகுப்பு
            </NavLink>
          </li>
          <li>
            <NavLink to="/Silambam" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
              பொருட்கள்
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contact" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick}>
              தொடர்புக்கு
            </NavLink>
          </li>
        </div>

        <div id="Login-Container">
          <NavLink to="/login" className={({ isActive }) => (isActive ? 'active li' : 'li')} onClick={handleNavClick} title="Only For Admin">
            உள்நுழைய
          </NavLink>
        </div>

        <div id="ToggleMenu" onClick={handleChange}>
          <FaBars id="bar" />
        </div>
      </nav>
    </>
  );
};

export default Header;
