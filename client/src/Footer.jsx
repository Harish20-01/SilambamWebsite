import React from 'react';
import {NavLink} from 'react-router-dom';
import {FaAngleDoubleRight, FaMapMarkerAlt,FaEnvelope,FaInstagram,FaMobileAlt,FaYoutube, FaFacebook} from 'react-icons/fa';
import './Styles/footer.css'
const Footer = () => {
  return (
    <div>
      <div id="Footer-Container">
        <div id="About-Footer">
          <h3>எங்களின் நோக்கம்</h3>
          <div>
              <p>
              &nbsp;கலைகளே ஒரு மனிதனை மனிதனாக்குகிறது. அவ்வகையில் தமிழரின் மரபுக் கலைகள் மிகவும் சிறப்புமிக்கவை. அத்தகைய கலைகளை நோக்கிய எங்களின் பயணத்தின் விளைவாக ஜூலை-1-2020 அன்று துவங்கப்பட்டதே தமிழர் மரபுக் கலையகம். தமிழரின் மரபுக் கலைகளை அனைத்துத் தரப்பு மக்களிடமும் எளிய முறையில் கொண்டு சேர்ப்பதே எங்களின் நோக்கமாகும்.
              </p>
          </div>
        </div>
        <div id="Quick-Links">
          <h3>மேலும் அறிய</h3>
        
          <div className='links'>
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                to="/"
                >முகப்பு</NavLink>   
            </li>
           <li><FaAngleDoubleRight className='fa'/><NavLink
                to="/About"
                > கலைகள்</NavLink>   
            </li>
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                to="/Silambam"
                >பொருட்கள்</NavLink>     
            </li>   
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                    to="/gallery/image"
                    >படங்கள்</NavLink>      
                  </li>
            {/* <li><FaAngleDoubleRight className='fa'/><NavLink 
                    to="/gallery/video"
                    >video</NavLink>     
                  </li> */}
            <li><FaAngleDoubleRight className='fa'/><NavLink 
                    to="/Contact"
                  >தொடர்புக்கு</NavLink>      
             </li>
          </div>
        </div>
        <div id="Contact-details">
            <h3> < FaMapMarkerAlt/>
              மேலும் தகவலுக்கு
            </h3>
            <div id="Contact">
                  <li><a href="mailto:tamilarmarabukalaiyagam@gamil.com" target="_blank">
                        <FaEnvelope className='fa'/>
                        tamilarmarabukalaiyagam@gmail.com</a>
                  </li>
                  <li><a href="tel:+919159318285">
                      <FaMobileAlt className='fa'/> 
                        +91 91593 18285</a>
                  </li>
                  <li><a href="https://www.instagram.com/tamilar_marabu_kalaiyagam" target="_blank">
                      <FaInstagram className='fa'/>tamilar_marabu_kalaiyagam</a>
                  </li>
                  <li><a href="https://www.instagram.com/venky_silambam" target="_blank">
                      <FaInstagram className='fa'/>venky_silambam</a>
                  </li>
                  <li><a href="https://www.youtube.com/@TamilarMarabuKalaiyagam" target="_blank">
                      <FaYoutube className='fa'/>Tamilar Marabu Kalaiyagam</a>
                  </li>
                  <li><a href="https://www.youtube.com/@Venky_Silambam" target="_blank">
                      <FaYoutube className='fa'/>Venky Silambam</a>
                  </li>
                  <li><a href="https://www.facebook.com/profile.php?id=61571714846047&mibextid=ZbWKwL" target="_blank">
                      <FaFacebook className='fa'/>Tamilar Marabu Kalaiyagam</a>
                  </li>
                  <li><a href="https://www.facebook.com/share/183M4wz7eH" target="_blank">
                      <FaFacebook className='fa'/>Venky Silambam</a>
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
