import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const EMPTY_FORM = { name: '', price: '', category: 'Electronics', description: '', image: '', stock: '' };
const CATEGORIES = ['Electronics', 'Clothing', 'Accessories', 'Home', 'Beauty'];

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [editId, setEditId]     = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products?limit=100');
      setProducts(res.data.products || res.data);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const flash = (msg, type = 'success') => {
    if (type === 'success') { setSuccess(msg); setTimeout(() => setSuccess(''), 3000); }
    else { setError(msg); setTimeout(() => setError(''), 4000); }
  };

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editId) {
        await axios.put(`/api/products/${editId}`, payload);
        flash('Product updated successfully');
      } else {
        await axios.post('/api/products', payload);
        flash('Product created successfully');
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      flash(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleEdit = product => {
    setForm({ name: product.name, price: product.price, category: product.category, description: product.description, image: product.image || '', stock: product.stock });
    setEditId(product._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      flash('Product deleted');
      setDeleteConfirm(null);
      fetchProducts();
    } catch {
      flash('Delete failed', 'error');
    }
  };

  const cancelForm = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(false); };

  return (
    <div className="admin-page">
      <div className="container">
        <div className="admin-header">
          <div>
            <p className="section-eyebrow">Dashboard</p>
            <h1 className="serif" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 300 }}>Admin Panel</h1>
          </div>
          {!showForm && (
            <button className="btn-primary" onClick={() => setShowForm(true)}>+ Add Product</button>
          )}
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-card-value serif">{products.length}</span>
            <span className="stat-card-label">Total Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-value serif">{products.filter(p => p.stock > 0).length}</span>
            <span className="stat-card-label">In Stock</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-value serif">{products.filter(p => p.stock === 0).length}</span>
            <span className="stat-card-label">Sold Out</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-value serif">${products.reduce((s, p) => s + p.price, 0).toFixed(0)}</span>
            <span className="stat-card-label">Total Value</span>
          </div>
        </div>

        {/* Alerts */}
        {success && <div className="admin-alert success">{success}</div>}
        {error   && <div className="admin-alert error">{error}</div>}

        {/* Form */}
        {showForm && (
          <div className="admin-form-card">
            <h2 className="form-card-title">{editId ? 'Edit Product' : 'New Product'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Silk Blazer" required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (USD) *</label>
                  <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} placeholder="0.00" required />
                </div>
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0" required />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description..." rows={3} required style={{ resize: 'vertical' }} />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editId ? 'Save Changes' : 'Create Product'}</button>
                <button type="button" className="btn-ghost" onClick={cancelForm}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Products table */}
        <div className="admin-table-wrap">
          <h2 className="table-title">Products ({products.length})</h2>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <div className="empty-state"><p>No products yet. Create your first one above.</p></div>
          ) : (
            <div className="admin-table">
              <div className="table-head">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Actions</span>
              </div>
              {products.map(p => (
                <div key={p._id} className="table-row">
                  <div className="table-product">
                    <img src={p.image || `https://picsum.photos/seed/${p._id}/60/60`} alt={p.name} className="table-img" />
                    <div>
                      <div className="table-name">{p.name}</div>
                      <div className="table-id">#{p._id?.slice(-8)}</div>
                    </div>
                  </div>
                  <span className="table-cat">{p.category}</span>
                  <span className="table-price">${p.price.toFixed(2)}</span>
                  <span className={`table-stock ${p.stock === 0 ? 'out' : p.stock <= 5 ? 'low' : 'ok'}`}>
                    {p.stock === 0 ? 'Out' : p.stock}
                  </span>
                  <div className="table-actions">
                    <button className="btn-ghost tbl-btn" onClick={() => handleEdit(p)}>Edit</button>
                    {deleteConfirm === p._id ? (
                      <span className="delete-confirm">
                        Sure?
                        <button className="confirm-yes" onClick={() => handleDelete(p._id)}>Yes</button>
                        <button className="confirm-no" onClick={() => setDeleteConfirm(null)}>No</button>
                      </span>
                    ) : (
                      <button className="btn-ghost tbl-btn delete" onClick={() => setDeleteConfirm(p._id)}>Delete</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
