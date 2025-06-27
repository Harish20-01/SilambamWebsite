import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '../../public/MessageToastContent';
import Processing from '../../assets/Processing';
import '../Styles/updateSubComponentStyle/aboutDataUpdateStyle.css';

const ProductDataUpdateComponent = () => {
  const [productList, setProductList] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    additionalImages: [],
    file: null,
    additionalFiles: [],
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { showError, showSuccess } = useToast();
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    axios.get(`${url}/silambam-products`)
      .then(res => setProductList(res.data))
      .catch(() => showError('Failed to load product data'));
  }, []);

  useEffect(() => {
    if (selectedId) {
      const selected = productList.find(item => item._id === selectedId);
      setFormData({
        name: selected.name,
        price: selected.price,
        description: selected.description,
        imageUrl: selected.imageUrl,
        file: null,
        additionalImages:selected.additionalImages,
        discount:selected.discount,
      });
    }
  }, [selectedId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    window.scrollTo({
      top:0,
      behavior:"smooth"
    })
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('discount',formData.discount);
    if (formData.file) data.append('image', formData.file);
    formData.additionalFiles?.forEach((file) => {
      data.append('additionalImages', file);
    });
    try {
      const response = await axios.put(
        `${url}/silambam-products/${selectedId}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        }
      );

      if (response.status === 200) {
        showSuccess('Product updated successfully');
        setFormData({ name: '', price: '', description: '', imageUrl: '', file: null });
        setSelectedId('');
        const res = await axios.get(`${url}/silambam-products`);
        setProductList(res.data);
      } else {
        showError('Update failed');
      }
    } catch {
      showError('Error during update');
    } finally {
      setIsProcessing(false);
    }
  };

  

  return isProcessing ? <Processing content='Updating Product Details' /> : (
    <div id="ProductDataUpdate-Container">
      <h2>Update Product</h2>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
        <option value="">Select a product to update</option>
        {productList.map(product => (
          <option key={product._id} value={product._id}>{product.name}</option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleUpdate}>
          <label>Name</label>
          <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />

          <label>Price</label>
          <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />

          <label>Discount</label>
          <input type="number" value={formData.discount} onChange={e => setFormData({ ...formData, discount: e.target.value })} required />

          <label>Description</label>
          <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

          <label>Current Image</label><br />
          <img src={formData.imageUrl} alt="Current product" width={150} /><br />

          <label>Change Image (optional)</label>
          <input type="file" onChange={e => setFormData({ ...formData, file: e.target.files[0] })} />
          <label>Change Additional Images (optional)</label>
          <input type="file" multiple accept="image/*"
            onChange={(e) => setFormData({ ...formData, additionalFiles: [...e.target.files] })} />
          {formData.additionalImages?.length > 0 && (
            <div className="preview-additional-images">
              <label>Existing Additional Images</label>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap',margin:"10px " }}>
                {formData.additionalImages.map((imgUrl, idx) => (
                  <img key={idx} src={imgUrl} alt={`additional-${idx}`} width={100} />
                ))}
              </div>
            </div>
          )}
          <div id="ProductUpdate-Submit-Button">
            <button type="submit">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductDataUpdateComponent;
