import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/aboutDeleteStyle.css';


const YoutubeVideoDelete = () => {
  const [title, setTitle] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState([]);
  const [isProcessing, setIsPreocessing] = useState(false);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get("https://silambamwebsite.onrender.com/youtube-video");
        setTitle(response.data); 
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
    fetchVenues();
  }, []);

  const handleCheckboxChange = (place) => {
    setSelectedTitle((prevSelected) => {
      if (prevSelected.includes(place)) {
        return prevSelected.filter((id) => id !== place);
      } else {
        return [...prevSelected, place];
      }
    });
  };

  const handleDelete = async () => {
    if (selectedTitle.length === 0) {
      showError('No venues selected to delete');
      return;
    }
    setIsPreocessing(true);
    try {
      const response = await axios.delete("https://silambamwebsite-1.onrender.com/youtube-video", {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        data: { title: selectedTitle }
      });

      if (response.status === 200) {
        showSuccess('title(s) deleted successfully');
        setTitle((prev) => prev.filter((v) => !selectedTitle.includes(v.place)));
        setSelectedTitle([]);
      } else {
        showError('Failed to delete title(s)');
      }
    } catch (error) {
      console.error('Error deleting venues:', error);
      showError('Error deleting title(s)');
    } finally {
      setIsPreocessing(false);
    }
  };

  return isProcessing ? (
    <LoadingComponent />
  ) : (
    <div id="AboutDelete-Container">
      <h2>Youtube Video Delete Section</h2>
      <h3>Select title(s) to Delete</h3>
      <form>
        {title.map((item) => (
          <div key={item._id} className='AboutDelete-Element' onClick={() => handleCheckboxChange(item.title)}>
            <input
              type="checkbox"
              id={item._id}
              value={item.title}
              onChange={() => handleCheckboxChange(item.title)}
              checked={selectedTitle.includes(item.title)}
            />
            <label htmlFor={item._id}>{item.title || 'Unnamed Place'}</label>
          </div>
        ))}
      </form>
      <button onClick={handleDelete}>Delete Selected</button>
    </div>
  );
};

export default YoutubeVideoDelete;
