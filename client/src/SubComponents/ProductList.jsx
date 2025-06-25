import React from 'react';

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
            <div className="product-info">
              <h2 className="product-price">₹{item.price}</h2>
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
          View Cart ({Object.values(cart).reduce((a, b) => a + b.quantity, 0)})
        </button>
      )}
    </>
  );
};

export default ProductList;
