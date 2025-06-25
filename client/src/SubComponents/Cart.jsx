import React from 'react';
import Lottie from "lottie-react";
import cartAnimation from "../../animation/CartAnimation.json";
const Cart = ({ cart, increaseQuantity, decreaseQuantity, openWhatsAppOrder, backToList }) => {
  const items = Object.values(cart);
  const isEmpty = items.length === 0;

  const total = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );

  return (
    <div className="cart-page">
      <button className="back-btn" onClick={backToList}>← Back to Products</button>
      <div className='animation-div'>
        <Lottie animationData={cartAnimation} loop={true} />
      </div>
      <h2>🛒 Your Cart</h2>

      {isEmpty ? (
        <p className="empty-cart-msg">Your cart is empty.</p>
      ) : (
        items.map(({ product, quantity }) => (
          <div className="cart-item" key={product._id}>
            <img src={product.imageUrl} alt={product.name} className="cart-img" />
            <div>
              <h4>{product.name}</h4>
              <p>₹{product.price} x {quantity}</p>
              <div className="qty-selector">
                <button onClick={() => decreaseQuantity(product)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => increaseQuantity(product)}>+</button>
              </div>
            </div>
          </div>
        ))
      )}

      {!isEmpty && <h3>Total: ₹{total}</h3>}

      <button
        className="order-btn"
        onClick={openWhatsAppOrder}
        disabled={isEmpty}
        style={{
          background: isEmpty ? '#ccc' : '#25d366',
          cursor: isEmpty ? 'not-allowed' : 'pointer',
        }}
      >
        Order via WhatsApp
      </button>
    </div>
  );
};

export default Cart;
