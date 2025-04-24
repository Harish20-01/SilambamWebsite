import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import '../Styles/SubComponentsStyles/reviewSubmitStyle.css'; // Optional CSS file

const ReviewSubmitComponent = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  /* const [message, setMessage] = useState(''); */
  const {showError,showSuccess}=useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    if (!name.trim() || !text.trim()) {
      showError('Please fill in both fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://silambamwebsite.onrender.com/reviews', {
        name,
        text,
      });

      if (response.status === 201) {
        showSuccess('Thank you for your review!');
        setName('');
        setText('');
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
    <div className="review-submit-container">
      <h2>Submit a Review</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>Your Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Your Review</label>
        <textarea
          placeholder="Write your thoughts here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewSubmitComponent;
