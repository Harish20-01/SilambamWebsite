
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'cart'
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('silambam-cart');
      return storedCart ? JSON.parse(storedCart) : {};
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('silambam-cart', JSON.stringify(cart));
  }, [cart]);

  const url = import.meta.env.VITE_SERVER_URL;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
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
        message += `*${product.name}* - ₹${product.discountPrice} x ${quantity} = ₹${product.discountPrice * quantity}\n`;
      });

      const total = Object.values(cart).reduce(
        (sum, { product, quantity }) => sum + product.discountPrice * quantity,
        0
      );

      message += `\n*Total: ₹${total}*\n\nPlease let me know how to proceed.`;

      if (!whatsappNumber || whatsappNumber.trim() === '') {
        alert('WhatsApp number is not configured.');
        return;
      }

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setCart({});
      localStorage.removeItem('silambam-cart');
    } catch (err) {
      console.error('Error opening WhatsApp order:', err);
      alert('Something went wrong while placing the order.');
    }
  };
  const scrolltoTop=()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth",
    })
  }

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
          goToCart={() => {scrolltoTop(),navigateTo('cart')}}
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
          goToCart={() => {scrolltoTop(),navigateTo('cart')}}
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
