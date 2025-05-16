import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/aboutDeleteStyle.css';

const YoutubeVideoDelete = () => {
  const [videos, setVideos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL;
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${url}/youtube-video`);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        showError('Failed to load videos');
      }
    };
    fetchVideos();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((vidId) => vidId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      showError('No videos selected to delete');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.delete(`${url}/youtube-video`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        data: { ids: selectedIds }, // Send array of IDs
      });

      if (response.status === 200) {
        showSuccess('Video(s) deleted successfully');
        setVideos((prev) => prev.filter((video) => !selectedIds.includes(video._id)));
        setSelectedIds([]);
      } else {
        showError('Failed to delete video(s)');
      }
    } catch (error) {
      console.error('Error deleting videos:', error);
      showError('Error deleting video(s)');
    } finally {
      setIsProcessing(false);
    }
  };

  return isProcessing ? (
    <Processing content='Deleting YouTube Id...' />
  ) : (
    <div id="AboutDelete-Container">
      <h2>Youtube Video Delete Section</h2>
      <h3>Select video(s) to Delete</h3>
      <form>
        {videos.map((item) => (
          <div key={item._id} className="AboutDelete-Element">
            <input
              type="checkbox"
              id={item._id}
              value={item._id}
              onChange={() => handleCheckboxChange(item._id)}
              checked={selectedIds.includes(item._id)}
            />
            <label htmlFor={item._id}>{item.title || 'Untitled Video'}</label>
          </div>
        ))}
      </form>
      <button onClick={handleDelete}>Delete Selected</button>
    </div>
  );
};

export default YoutubeVideoDelete;
