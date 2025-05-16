import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import Processing from '../../assets/Processing'
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../public/MessageToastContent';
import '../Styles/updateSubComponentStyle/aboutDeleteStyle.css';

const ReviewDeleteComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSuccess, showError } = useToast();
  const url=import.meta.env.VITE_SERVER_URL;
  const navigate=useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("${url}/reviews");
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        showError('Failed to load reviews');
      }
    };

    fetchReviews();
  }, []);

  const handleCheckboxChange = (_id) => {
    setSelectedReviews((prevSelected) =>
      prevSelected.includes(_id)
        ? prevSelected.filter((id) => id !== _id)
        : [...prevSelected, _id]
    );
  };

  const handleDelete = async () => {
    if (selectedReviews.length === 0) {
      showError('No review selected to delete');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.delete(`${url}/reviews`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`
        },
        data: { ids: selectedReviews }
      });

      if (response.status === 200) {
        showSuccess('Reviews deleted successfully');
        setReviews((prevReviews) =>
          prevReviews.filter((review) => !selectedReviews.includes(review._id))
        );
        setSelectedReviews([]);
      } else {
        showError('Failed to delete reviews');
      }
    } catch (error) {
      showError('Error deleting reviews');
    } finally {
      setIsProcessing(false);
    }
  };
  const onBack=()=>{
    navigate('/homeUpdateComponent');
  }

  return isProcessing ? (
    <Processing content='Deleting Reviews...' />
  ) : (
    <div id="AboutDelete-Container">
      <div onClick={onBack} className="backward-button" style={{margin:"20px"}}>
        <button>
          <FaArrowLeft style={{ verticalAlign: "middle", margin: '2px' }} />
        </button>
      </div>
      <h2>Delete Reviews</h2>
      <h3>Select reviews to delete</h3>
      <form>
        {reviews.map((review) => (
          <div key={review._id} className="AboutDelete-Element" onClick={() => handleCheckboxChange(review._id)}>
            <input
              type="checkbox"
              id={review._id}
              value={review._id}
              checked={selectedReviews.includes(review._id)}
              onChange={() => handleCheckboxChange(review._id)}
            />
            <label htmlFor={review._id}>
              {review.name} 
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleDelete}>Delete Selected</button>
    </div>
  );
};

export default ReviewDeleteComponent;
