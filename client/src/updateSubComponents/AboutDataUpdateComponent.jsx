import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import LoadingComponent from '../../public/LoadingComponent';
import '../Styles/updateSubComponentStyle/aboutDataUpdateStyle.css';

const AboutDataUpdateComponent = () => {
  const [aboutList, setAboutList] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const url=import.meta.env.VITE_SERVER_URL;
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', file: null });
  const [isProcessing, setIsProcessing] = useState(false);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    axios.get(`${url}/about`)
      .then(res => setAboutList(res.data))
      .catch(() => showError('Failed to load about data'));
  }, []);

  useEffect(() => {
    if (selectedId) {
      const selected = aboutList.find(item => item._id === selectedId);
      setFormData({
        title: selected.title,
        description: selected.description,
        imageUrl: selected.imageUrl,
        file: null,
      });
    }
  }, [selectedId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.file) data.append('image', formData.file);

    try {
      const response = await axios.put(`${url}/about/${selectedId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      if (response.status === 200) {
        showSuccess('Updated Successfully');
        setFormData({ title: '', description: '', imageUrl: '', file: null });
        setSelectedId('');
        const res = await axios.get('${url}/about');/* ${url} */
        setAboutList(res.data);
      } else {
        showError('Update failed');
      }
    } catch {
      showError('Error during update');
    } finally {
      setIsProcessing(false);
    }
  };

  return isProcessing ? <LoadingComponent /> : (
    <div id="AboutDataInsert-Container">
      <h2>Update About Section</h2>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
        <option value="">Select an item to update</option>
        {aboutList.map(item => (
          <option key={item._id} value={item._id}>{item.title}</option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleUpdate}>
          <label>Title</label>
          <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />

          <label>Description</label>
          <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

          <label>Current Image</label><br />
          <img src={formData.imageUrl} alt="Current" width={150} /><br />

          <label>Change Image (optional)</label>
          <input type="file" onChange={e => setFormData({ ...formData, file: e.target.files[0] })} />

          <div id="Aboutinsert-Submit-Button">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AboutDataUpdateComponent;
