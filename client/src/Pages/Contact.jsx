import React, { useState } from 'react';
import '../Styles/contact.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent'; // Make sure you have axios imported

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [message, setMessage] = useState('');
  const{showError,showSuccess}=useToast();

  const handleKeyDown = (e, nextInput, currentInput) => {
   
    if (e.key === 'Enter') {
      e.preventDefault();
      nextInput && nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobileNo || !message) {
      showError('Please fill all fields before submitting.');
      return;
    }

    const data = {
      name:name,
      email:email,
      mobileNo:mobileNo,
      message:message,
    };

    try {
      const response = await axios.post('https://silambamwebsite.onrender.com/submit/message-form', data);
      if (response.status === 200) {
        showSuccess(`Hi ${name}, thank you for your message! :)`);
        setEmail(''); 
        setMessage('');
        setMobileNo('');
        setName('');
      } else {
        showError('Something went wrong in submission. Please try again later.');
      }
    } catch (err) {
      showError('Something went wrong in submission. Please try again later.');
    }
  };

  return (
    <div className='Contact-Container'>
      
      <div id="Message-Container">
        <h2>Let Us Know Your Queries...</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('email'))}
          />
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('mobileNo'))}
          />
          <label>Mobile No:</label>
          <input
            type="text"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            id="mobileNo"
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('message'))}
          />
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            onKeyDown={(e) => handleKeyDown(e, document.getElementById('submitButton'))}
          ></textarea>
          <button id="submitButton" type="submit">Submit</button>
        </form>
      </div>

      <div id="Contact-Location">
        <h2>Visit Us <FaMapMarkerAlt /></h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3908.8138310644113!2d78.6714!3d11.5652!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab750060971593%3A0x9cfafd054f7283ed!2zS2FsYWkgTmlsYW0gLSDgrpXgrrLgr4jgrqjgrr_grrLgrq7gr40!5e0!3m2!1sen!2sin!4v1738131009118!5m2!1sen!2sin"
          title="Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
