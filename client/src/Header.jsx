
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
  const url = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const handleChange = () => {
    if (!menuOpen) {
      window.history.pushState({ menuOpen: true }, '');
    }
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
        const res = await axios.get(`${url}/about`);
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setMenuOpen(false);
      setShowCourses(false);
    };

    if (menuOpen) {

      window.history.pushState({ menuOpen: true }, '');
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShowCourses(false);
        if (window.history.state?.menuOpen) {
          window.history.back();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

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



          <li className="dropDown">
            <div className="li mobile-kalaigal-container">
              <NavLink
                to="/About"
                className={({ isActive }) => (isActive ? 'active li' : 'li')}
                onClick={handleNavClick}
              >
                கலைகள்
              </NavLink>

              {/* Mobile dropdown toggle */}
              <span
                className={`dropdown-toggle ${showCourses ? 'rotate' : ''}`}
                onClick={() => setShowCourses(!showCourses)}
              >
                ▼
              </span>
            </div>

            {/* Mobile dropdown list */}
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
