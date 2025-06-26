import React, { useState, useEffect } from 'react';
import { useToast } from '../../public/MessageToastContent';
import { FaShoppingCart ,FaCartPlus} from 'react-icons/fa';
const ProductDetail = ({
  product,
  cart,
  increaseQuantity,
  decreaseQuantity,
  backToList,
  goToCart
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = [product.imageUrl, ...(product.additionalImages || [])];
  const {showSuccess}=useToast();

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);
  function handleClick(pro){
    increaseQuantity(pro);
    showSuccess("Added to the cart");
  }

  return (
    <div className="product-detail">
      <button className="back-btn" onClick={backToList}>← Back to Products</button>

      <div className="image-slider">
        {/* {currentImageIndex > 0 && (
          <button className="thumb-nav" onClick={() => setCurrentImageIndex(i => i - 1)}>◀</button>
        )} */}
        <img src={allImages[currentImageIndex]} alt="Main" className="detail-img" />
        {/* {currentImageIndex < allImages.length - 1 && (
          <button className="thumb-nav" onClick={() => setCurrentImageIndex(i => i + 1)}>▶</button>
        )} */}
      </div>

      <div className="thumb-strip">
        {allImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`thumb-img ${i === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(i)}
          />
        ))}
      </div>

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>Price:<span className={product.discount>0? "original-price":"original-price hide-class"}>₹{product.price}</span>
          <span>₹{product.discountPrice}</span>
      </h3>
      <div className="qty-selector">
        <button onClick={() => decreaseQuantity(product)}>-</button>
        <span>{cart[product._id]?.quantity || 0}</span>
        <button onClick={() => increaseQuantity(product)}>+</button>
      </div>

      <button style={{borderRadius:"10px",color:"black",backdropFilter:"blur(10px)",backgroundColor:"white"}}
        className="add-to-cart-btn"
        onClick={() => {handleClick(product)}}
        title={`${cart[product._id]?.quantity > 0 ? "Product already in the cart":"Add to cart "}`}
        disabled={cart[product._id]?.quantity > 0}
      >
        <FaCartPlus size={"20px"} />
      </button>
      {Object.keys(cart).length > 0 && (
            <button className="view-cart-btn" onClick={goToCart}>
              View Cart <span><FaCartPlus/>({Object.values(cart).reduce((a, b) => a + b.quantity, 0)})</span>
            </button>
          )}
    </div>
    
  );
};

export default ProductDetail;
