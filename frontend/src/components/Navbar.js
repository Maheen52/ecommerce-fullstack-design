import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text serif">LUXE</span>
          <span className="logo-sub">STORE</span>
        </Link>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/"         className={location.pathname === '/'         ? 'active' : ''}>Home</Link>
          <Link to="/products" className={location.pathname === '/products'  ? 'active' : ''}>Catalogue</Link>
          {isAdmin && <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>}
        </nav>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <button className="btn-ghost" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-outline" style={{ padding: '8px 20px', fontSize: '11px' }}>Sign In</Link>
          )}

          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
