import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import { FaRegStar,FaStar } from 'react-icons/fa';
import Lottie from "lottie-react";
import animation from '../../animation/ReviewAnimatoin.json';
import '../Styles/SubComponentsStyles/reviewSubmitStyle.css'; // Optional CSS file

const ReviewSubmitComponent = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [reviewerType, setReviewerType] = useState('');
  /* const [message, setMessage] = useState(''); */
  const {showError,showSuccess}=useToast();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const url=import.meta.env.VITE_SERVER_URL;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name.trim() || !text.trim()||!reviewerType.trim()||rating==0) {
      showError('Please fill in both fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/reviews`, {
        name,
        text,
        reviewerType,
        rating
      });

      if (response.status === 201) {
        showSuccess('தங்களின் கருத்துக்கு நன்றி...');
        setName('');
        setText('');
        setRating(0);
      } else {
        showError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className='review-submit-container-wrapper'>
    <div  className='animation-div'>
        <Lottie animationData={animation} loop={true} />
    </div>
    <div className="review-submit-container">
      <h2>மதிப்பாய்வு சமர்ப்பிக்க <FaRegStar className='faregstar'/></h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>Your Name(பெயர்):</label>
        <input
          type="text"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>You are a(நீங்கள் யார்):</label>
          <select
            value={reviewerType}
            onChange={(e) => setReviewerType(e.target.value)}
          >
            <option value="">-- தேர்வு செய்யவும்--</option>
            <option value="Student">Student(மாணவர்)</option>
            <option value="Parent">Parent(பெற்றோர்)</option>
          </select>
        <label>Your Review(தங்களின் கருத்து):</label>
        <textarea
          placeholder="Write your thoughts here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
         <label>Rate Us (மதிப்பீடு):</label>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <button
                type="button"
                key={index}
                className="star-button"
                style={{background:"white"}}
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)
                }
              >
                {currentRating <= (hover || rating) ? (
                  <FaStar color="#ffc107" />
                ) : (
                  <FaRegStar color="#ccc" />
                )}
              </button>
            );
          })}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review(சமர்ப்பிக்க)'}
        </button>
      </form>
    </div>
  </div>
  );
};

export default ReviewSubmitComponent;
