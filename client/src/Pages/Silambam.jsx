import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../Styles/silambamProduct.css';
import { motion, useInView } from 'framer-motion';
import Processing from '../../assets/Processing';

const Silambam = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const ref = useRef(null);
  const url=import.meta.env.VITE_SERVER_URL;
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const toggleDescription = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/silambam-products`);
        if (response.status === 200) {
          setData(response.data);
          console.log(response.data)
        } else {
          console.log(response);
        }
      } catch (err) {
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if(loading)
      return <Processing content='Fetching Products...'/>
  return (
    <>
      <div id="product-heading">
        <h1>பொருட்கள்</h1>
      </div>
      <div className="product-grid">
        {data.map(item => (
          <div 
            className="product-card" 
            key={item._id}
          >
            <img 
              src={item.imageUrl} 
              alt="Product" 
              onLoad={(e) => e.target.classList.add('loaded')}
              className={`product-img ${expandedCards[item.id] ? 'imageExtension' : ''}`} 
            />
            <div className="product-info">
              <h2 className="product-price">₹{item.price}</h2>
              <h3>{item.name}</h3>
              <p className={`product-desc ${expandedCards[item._id] ? 'expanded' : ''}`}>
                {item.description}
              </p>
              <button 
                className="toggle-btn" 
                onClick={() => toggleDescription(item._id)}
              >
                {expandedCards[item._id] ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Silambam;
