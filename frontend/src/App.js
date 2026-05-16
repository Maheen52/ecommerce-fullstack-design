import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPanel from './pages/AdminPanel';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><div className="spinner" /></div>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/products"      element={<ProductListingPage />} />
        <Route path="/products/:id"  element={<ProductDetailsPage />} />
        <Route path="/cart"          element={<CartPage />} />
        <Route path="/login"         element={<LoginPage />} />
        <Route path="/register"      element={<RegisterPage />} />
        <Route path="/admin"         element={<ProtectedAdminRoute><AdminPanel /></ProtectedAdminRoute>} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
