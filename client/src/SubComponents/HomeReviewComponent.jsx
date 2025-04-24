import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    axios.get('https://silambamwebsite.onrender.com/reviews') // Replace with your actual API
      .then(response => {
        setReviews(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setIsLoading(false);
      });
  }, []);

  // Optional: Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (reviews.length > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }
    }, 3000);

    return () => clearInterval(interval); // Clear on unmount
  }, [reviews]);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="review-slider-container">
      <h2>User Reviews</h2>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : reviews.length > 0 ? (
        <div className="slider">
          <button onClick={handlePrev} className="nav-button">‹</button>
          <div className="review-card">
            <h4>{reviews[currentIndex].name}</h4>
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
