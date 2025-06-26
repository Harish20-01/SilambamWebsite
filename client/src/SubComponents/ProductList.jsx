import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const ProductList = ({ data, cart, onProductClick, increaseQuantity, goToCart }) => {
  return (
    <>
      <div className="product-grid">
        {data.map((item) => (
          <div
            className="product-card"
            key={item._id}
            onClick={() => onProductClick(item)}
          >
            <img src={item.imageUrl} alt="Product" className="product-img" />
            <div className={item.discount>0?"discount-container":"discount-container hide-class"}>
                <h3>-{item.discount}%</h3>
            </div>
            <div className="product-info">
              <h2 className="product-price">
                <span className={item.discount>0? "original-price":"original-price hide-class"}>₹{item.price}</span>
                <span>₹{item.discountPrice}</span>
              </h2>
              <h3>{item.name}</h3>
              <p className="product-desc">{item.description}</p>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseQuantity(item);
                  
                }}
              >
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(cart).length > 0 && (
        <button className="view-cart-btn" onClick={goToCart}>
          View Cart <FaCartPlus/>({Object.values(cart).reduce((a, b) => a + b.quantity, 0)})
        </button>
      )}
    </>
  );
};

export default ProductList;
