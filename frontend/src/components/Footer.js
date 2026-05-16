import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <span className="serif" style={{ fontSize: '24px', letterSpacing: '0.1em' }}>LUXE</span>
        <p className="footer-tagline">Curated excellence, delivered.</p>
      </div>

      <div className="footer-links">
        <div className="footer-col">
          <h4>Navigate</h4>
          <Link to="/">Home</Link>
          <Link to="/products">Catalogue</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>

    <div className="footer-bottom container">
      <span>© {new Date().getFullYear()} LUXE Store. All rights reserved.</span>
      <span>Built with React · Node.js · MongoDB</span>
    </div>
  </footer>
);

export default Footer;
