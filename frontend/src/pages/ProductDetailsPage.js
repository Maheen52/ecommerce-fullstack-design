import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div className="spinner" />
    </div>
  );

  if (!product) return null;

  return (
    <div className="details-page">
      <div className="container details-container">
        <button className="back-btn" onClick={() => navigate('/products')}>
          ← Back to Catalogue
        </button>

        <div className="details-grid">
          <div className="details-image-wrap">
            <img src={product.image} alt={product.name} className="details-image" />
          </div>

          <div className="details-info">
            <span className="details-category">{product.category}</span>
            <h1 className="details-title serif">{product.name}</h1>
            <p className="details-price">${product.price.toFixed(2)}</p>
            <p className="details-desc">{product.description}</p>

            <div className="details-stock">
              {product.stock > 0
                ? <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                : <span className="out-stock">✗ Out of Stock</span>
              }
            </div>

            <button
              className="btn-primary details-cart-btn"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;