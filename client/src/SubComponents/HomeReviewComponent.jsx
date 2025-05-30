import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import '../Styles/SubComponentsStyles/homeReviewStyle.css';

const HomeReviewComponent = () => {
  
  const [reviews, setReviews] = useState([  {
    "name": "John Doe",
    "text": "This website is amazing!"
  },
  {
    "name": "Jane Smith",
    "text": "Great experience, highly recommended!"
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const url=import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    axios.get(`${url}/reviews`) // Replace with your actual API
      .then(response => {
        setReviews(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (reviews.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }
    }, 3000);

    return () => clearInterval(interval); 
  }, [reviews]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="review-slider-container">
      <h2>பயனர் கருத்து</h2>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <div className="slider">
          <button onClick={handlePrev} className="nav-button">‹</button>
          <div className="review-card">
            <h4>{reviews[currentIndex].name}</h4>
            <h5>{reviews[currentIndex].reviewerType=="Student"?"மாணவர்/Student":"பெற்றோர்/Parent"}</h5>
             <div className="star-display">
                {[...Array(5)].map((_, i) => (
                  i < reviews[currentIndex].rating ? (
                    <FaStar key={i} color="#ffc107" />
                  ) : (
                    <FaRegStar key={i} color="#ccc" />
                  )
                ))}
            </div>
            <p>{reviews[currentIndex].text}</p>
          </div>
          <button onClick={handleNext} className="nav-button">›</button>
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default HomeReviewComponent;
