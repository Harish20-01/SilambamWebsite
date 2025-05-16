import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/aboutDataUpdateStyle.css';

const ClassVenueDataUpdate = () => {
  const [venueList, setVenueList] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const url=import.meta.env.VITE_SERVER_URL;
  const [formData, setFormData] = useState({
    place: '',
    day: '',
    timing: '',
    description: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    axios.get(`${url}/class-venue`)
      .then(res => setVenueList(res.data))
      .catch(() => showError('Failed to load class venue data'));
  }, []);

  useEffect(() => {
    if (selectedId) {
      const selected = venueList.find(item => item._id === selectedId);
      setFormData({
        place: selected.place,
        day: selected.day,
        timing: selected.timing,
        description: selected.description
      });
    }
  }, [selectedId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await axios.put(`${url}/class-venue/${selectedId}`, formData, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`
        }
      });

      if (response.status === 200) {
        showSuccess('Class venue updated successfully');
        setFormData({ place: '', day: '', timing: '', description: '' });
        setSelectedId('');
        const res = await axios.get(`${url}/class-venue`);
        setVenueList(res.data);
      } else {
        showError('Update failed');
      }
    } catch (err){
      console.log("error",err);
      showError('Error during update');
    } finally {
      setIsProcessing(false);
    }
  };

  return isProcessing ? <Processing content='Updating Venues...' /> : (
    <div id="ClassVenueUpdate-Container">
      <h2>Update Class Venue</h2>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
        <option value="">Select a venue to update</option>
        {venueList.map(item => (
          <option key={item._id} value={item._id}>{item.place} - {item.day}</option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleUpdate}>
          <label>Place(இடம்)</label>
          <input type="text" value={formData.place} onChange={e => setFormData({ ...formData, place: e.target.value })} required />

          <label>Date(நாள்)</label>
          <input type="text" value={formData.day} onChange={e => setFormData({ ...formData, day: e.target.value })} required />

          <label>Timing(நேரம் )</label>
          <input type="text" value={formData.timing} onChange={e => setFormData({ ...formData, timing: e.target.value })} required />

          <label>Description(குறிப்பு)</label>
          <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          <div id="ClassVenueUpdate-Submit-Button">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ClassVenueDataUpdate;
