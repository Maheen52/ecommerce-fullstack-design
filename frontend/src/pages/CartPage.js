import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container" style={{ textAlign: 'center', paddingTop: '160px' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--text-muted)', margin: '0 auto 24px' }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <h2 className="serif" style={{ fontSize: '32px', fontWeight: 300, marginBottom: '12px' }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Discover something you love.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice >= 75 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <div>
            <p className="section-eyebrow">Your Selection</p>
            <h1 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300 }}>
              Shopping Cart
            </h1>
          </div>
          <button className="btn-ghost" onClick={clearCart}>Clear All</button>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-img">
                  <img
                    src={item.image || `https://picsum.photos/seed/${item._id}/120/150`}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-info">
                  <div className="cart-item-cat">{item.category}</div>
                  <h3 className="cart-item-name serif">{item.name}</h3>
                  <div className="cart-item-price">${item.price.toFixed(2)}</div>
                </div>

                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
                  <button className="remove-btn" onClick={() => removeItem(item._id)} title="Remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2 className="serif summary-title">Order Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span style={{ color: '#5fbd74' }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="free-shipping-hint">
                Add ${(75 - totalPrice).toFixed(2)} more for free shipping
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">${grandTotal.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', padding: '16px', marginTop: '16px' }}>
              Proceed to Checkout
            </button>

            <Link to="/products" className="btn-ghost" style={{ justifyContent: 'center', marginTop: '12px' }}>
              ← Continue Shopping
            </Link>

            <div className="trust-badges">
              <span>🔒 Secure checkout</span>
              <span>↩ Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
