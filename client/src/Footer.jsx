import React from 'react';
import {NavLink} from 'react-router-dom';
import {FaAngleDoubleRight, FaMapMarkerAlt,FaEnvelope,FaInstagram,FaMobileAlt} from 'react-icons/fa';
import './Styles/footer.css'
const Footer = () => {
  return (
    <div>
      <div id="Footer-Container">
        <div id="About-Footer">
          <h3>About Us</h3>
          <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum dolorem voluptatem iusto sed quos quasi aspernatur natus quod aliquid nisi eligendi voluptates vero dicta, necessitatibus error iste quaerat non dignissimos!
              </p>
          </div>
        </div>
        <div id="Quick-Links">
          <h3>Quick Links</h3>
        
          <div className='links'>
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                to="/"
                >Home</NavLink>   
            </li>
           <li><FaAngleDoubleRight className='fa'/><NavLink
                to="/About"
                >About us  </NavLink>   
            </li>
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                to="/Silambam"
                >Silambam</NavLink>     
            </li>   
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                    to="/gallery/image"
                    >image</NavLink>      
                  </li>
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                    to="/gallery/video"
                    >video</NavLink>     
                  </li>
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                    to="/Contact"
                  >Contact Us</NavLink>      
             </li>
          </div>
        </div>
        <div id="Contact-details">
            <h3> < FaMapMarkerAlt/>
                 Contact Us
            </h3>
            <div id="Contact">
                  <li><a href="mailto:tamilarmarabukalaiyagam@gamil.com" target="_blank">
                        <FaEnvelope className='fa'/>
                        tamilarmarabukalaiyagam@gamil.com</a>
                  </li>
                  <li><a href="">
                      <FaMobileAlt className='fa'/> 
                        +91 91593 18285</a>
                  </li>
                  <li><a href="https://www.instagram.com/venky_silambam" target="_blank">
                      <FaInstagram className='fa'/>venky_silambam</a>
                  </li>
                  {/* <li>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3908.8138310644113!2d78.6714!3d11.5652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab750060971593%3A0x9cfafd054f7283ed!2zS2FsYWkgTmlsYW0gLSDgrpXgrrLgr4jgrqjgrr_grrLgrq7gr40!5e0!3m2!1sen!2sin!4v1738131009118!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </li> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
