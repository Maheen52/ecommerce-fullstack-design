import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-card-image">
        <img
          src={product.image || `https://picsum.photos/seed/${product._id}/400/500`}
          alt={product.name}
          loading="lazy"
        />
        {product.stock === 0 && <div className="out-of-stock-badge">Sold Out</div>}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="low-stock-badge">Only {product.stock} left</div>
        )}
        <button className="quick-add" onClick={handleAddToCart} disabled={product.stock === 0}>
          {product.stock === 0 ? 'Sold Out' : '+ Add to Cart'}
        </button>
      </div>

      <div className="product-card-info">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-price">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
