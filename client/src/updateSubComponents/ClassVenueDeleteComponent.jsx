import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/aboutDeleteStyle.css';


const ClassVenueDelete = () => {
  const [venue, setVenue] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [isProcessing, setIsPreocessing] = useState(false);
  const url=import.meta.env.VITE_SERVER_URL;
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`${url}/class-venue`);
        setVenue(response.data); 
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
    fetchVenues();
  }, []);

  const handleCheckboxChange = (place) => {
    setSelectedVenue((prevSelected) => {
      if (prevSelected.includes(place)) {
        return prevSelected.filter((id) => id !== place);
      } else {
        return [...prevSelected, place];
      }
    });
  };

  const handleDelete = async () => {
    if (selectedVenue.length === 0) {
      showError('No venues selected to delete');
      return;
    }
    setIsPreocessing(true);
    try {
      const response = await axios.delete(`${url}/class-venue`, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        data: { place: selectedVenue }
      });

      if (response.status === 200) {
        showSuccess('Venue(s) deleted successfully');
        setVenue((prev) => prev.filter((v) => !selectedVenue.includes(v.place)));
        setSelectedVenue([]);
      } else {
        showError('Failed to delete venue(s)');
      }
    } catch (error) {
      console.error('Error deleting venues:', error);
      showError('Error deleting venue(s)');
    } finally {
      setIsPreocessing(false);
    }
  };

  return isProcessing ? (
    <Processing content='Deleting Venues...' />
  ) : (
    <div id="AboutDelete-Container">
      <h2>Class Venue Section</h2>
      <h3>Select Venue(s) to Delete</h3>
      <form>
        {venue.map((item) => (
          <div key={item._id} className='AboutDelete-Element' onClick={() => handleCheckboxChange(item.place)}>
            <input
              type="checkbox"
              id={item._id}
              value={item.place}
              onChange={() => handleCheckboxChange(item.place)}
              checked={selectedVenue.includes(item.place)}
            />
            <label htmlFor={item._id}>{item.place || 'Unnamed Place'}</label>
          </div>
        ))}
      </form>
      <button onClick={handleDelete}>Delete Selected</button>
    </div>
  );
};

export default ClassVenueDelete;
