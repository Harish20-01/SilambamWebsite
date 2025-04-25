import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import { FaRegStar } from 'react-icons/fa';
import '../Styles/SubComponentsStyles/reviewSubmitStyle.css'; // Optional CSS file

const ReviewSubmitComponent = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [reviewerType, setReviewerType] = useState('');
  /* const [message, setMessage] = useState(''); */
  const {showError,showSuccess}=useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    

    if (!name.trim() || !text.trim()||!reviewerType.trim()) {
      showError('Please fill in both fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('https://silambamwebsite.onrender.com/reviews', {
        name,
        text,
        reviewerType,
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
      <h2>மதிப்பாய்வு சமர்ப்பிக்க <FaRegStar/></h2>
      <form onSubmit={handleSubmit} className="review-form">
        <label>Your Name(பெயர்):</label>
        <input
          type="text"
          placeholder="John Doe"
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

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Review(சமர்ப்பிக்க)'}
        </button>
      </form>
    </div>
  );
};

export default ReviewSubmitComponent;
