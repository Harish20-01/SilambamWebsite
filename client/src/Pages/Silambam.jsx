/* import React, { useEffect, useState, useRef } from 'react';
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
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../SubComponents/ProductList';
import ProductDetail from '../SubComponents/ProductDetail';
import Cart from '../SubComponents/Cart';
import Processing from '../../assets/Processing';
import '../Styles/silambamProduct.css';


const Silambam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'cart'

  const url = import.meta.env.VITE_SERVER_URL;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  console.log(whatsappNumber, url)

  // Handle browser back/forward
  useEffect(() => {
    window.history.replaceState({ view: 'list' }, '');

    const onPopState = (event) => {
      const view = event.state?.view || 'list';
      setView(view);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = (newView) => {
    setView(newView);
    window.history.pushState({ view: newView }, '');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/silambam-products`);
        if (response.status === 200) setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const increaseQuantity = (product) => {
    setCart((prev) => {
      const prevQty = prev[product._id]?.quantity || 0;
      return {
        ...prev,
        [product._id]: { product, quantity: prevQty + 1 },
      };
    });
  };

  const decreaseQuantity = (product) => {
    setCart((prev) => {
      const prevQty = prev[product._id]?.quantity || 0;
      if (prevQty <= 1) {
        const updated = { ...prev };
        delete updated[product._id];
        return updated;
      }
      return {
        ...prev,
        [product._id]: { product, quantity: prevQty - 1 },
      };
    });
  };

  const openWhatsAppOrder = () => {
    try {
      if (Object.keys(cart).length === 0) return;

      let message = `Hello, I would like to place an order for the following products:\n\n`;

      Object.values(cart).forEach(({ product, quantity }) => {
        message += `*${product.name}* - ₹${product.price} x ${quantity} = ₹${product.price * quantity}\n`;
      });

      const total = Object.values(cart).reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0
      );

      message += `\n*Total: ₹${total}*\n\nPlease let me know how to proceed.`;

      if (!whatsappNumber || whatsappNumber.trim() === '') {
        alert('WhatsApp number is not configured.');
        return;
      }

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Error opening WhatsApp order:', err);
      alert('Something went wrong while placing the order.');
    }
  };


  const onProductClick = (product) => {
    setSelectedProduct(product);
    navigateTo('detail');
  };

  if (loading) return <Processing content="Fetching Products..." />;

  return (
    <>
      <div id="product-heading">
        <h1>பொருட்கள்</h1>
      </div>

      {view === 'list' && (
        <ProductList
          data={data}
          cart={cart}
          onProductClick={onProductClick}
          increaseQuantity={increaseQuantity}
          goToCart={() => navigateTo('cart')}
        />
      )}

      {view === 'detail' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          openWhatsAppOrder={openWhatsAppOrder}
          backToList={() => navigateTo('list')}
        />
      )}

      {view === 'cart' && (
        <Cart
          cart={cart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          openWhatsAppOrder={openWhatsAppOrder}
          backToList={() => navigateTo('list')}
        />
      )}
    </>
  );
};

export default Silambam;
