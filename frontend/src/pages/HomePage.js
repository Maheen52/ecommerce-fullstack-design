import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home', 'Beauty'];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products?limit=8')
      .then(res => setFeatured(res.data.products || res.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-glow" />
        </div>
        <div className="container hero-content">
          <div className="hero-label fade-up">New Collection — 2026</div>
          <h1 className="hero-title serif fade-up">
            Curated for the<br /><em>discerning few</em>
          </h1>
          <p className="hero-desc fade-up">
            Premium products, thoughtfully selected. No noise — just quality.
          </p>
          <div className="hero-cta fade-up">
            <Link to="/products" className="btn-primary">Explore Catalogue</Link>
            <Link to="/products" className="btn-ghost">View All Products</Link>
          </div>

          <div className="hero-stats fade-up">
            <div className="stat">
              <span className="stat-value serif">2.4K+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value serif">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value serif">48H</span>
              <span className="stat-label">Delivery</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Category pills */}
      <section className="categories-strip container">
        <div className="categories-row">
          {CATEGORIES.map(cat => (
            <Link
              key={cat}
              to={cat === 'All' ? '/products' : `/products?category=${cat}`}
              className="category-pill"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured container">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Handpicked for you</p>
            <h2 className="section-title serif">Featured Products</h2>
          </div>
          <Link to="/products" className="btn-ghost">See All →</Link>
        </div>

        {loading ? (
          <div className="loading-state"><div className="spinner" /></div>
        ) : featured.length === 0 ? (
          <div className="empty-state">
            <p>No products yet. Add some from the admin panel.</p>
            <Link to="/admin" className="btn-outline" style={{ marginTop: '16px', display: 'inline-block' }}>Go to Admin</Link>
          </div>
        ) : (
          <div className="grid-4">
            {featured.map((p, i) => (
              <div key={p._id} style={{ animationDelay: `${i * 0.08}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="promo-banner container">
        <div className="promo-inner">
          <div className="promo-text">
            <p className="section-eyebrow">Limited time</p>
            <h2 className="serif">Free shipping on orders over $75</h2>
            <p>Use code <span className="text-accent">LUXE2026</span> at checkout</p>
          </div>
          <Link to="/products" className="btn-primary">Shop Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
