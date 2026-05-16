import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './ProductListingPage.css';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Accessories', 'Home', 'Beauty'];
const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest' },
  { value: 'price_asc',  label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'name_asc',   label: 'Name: A → Z' },
];

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [total, setTotal]       = useState(0);
  const [page, setPage]         = useState(1);

  const search   = searchParams.get('search')   || '';
  const category = searchParams.get('category') || 'All';
  const sort     = searchParams.get('sort')     || 'newest';

  const [searchInput, setSearchInput] = useState(search);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search)            params.set('search',   search);
      if (category !== 'All') params.set('category', category);
      params.set('sort', sort);
      params.set('page', page);
      params.set('limit', 12);

      const res = await axios.get(`/api/products?${params}`);
      setProducts(res.data.products || res.data);
      setTotal(res.data.total || (res.data.products || res.data).length);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [search, category, sort]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== 'All') next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateParam('search', searchInput.trim());
  };

  return (
    <div className="listing-page">
      <div className="listing-header container">
        <div>
          <p className="section-eyebrow">Our Collection</p>
          <h1 className="serif listing-title">All Products</h1>
          {total > 0 && <p className="listing-count">{total} items found</p>}
        </div>

        {/* Search */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>
      </div>

      <div className="listing-body container">
        {/* Filters sidebar */}
        <aside className="filters">
          <h3 className="filter-title">Categories</h3>
          <div className="filter-list">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-item ${category === cat ? 'active' : ''}`}
                onClick={() => updateParam('category', cat)}
              >
                {cat}
                {category === cat && <span className="filter-check">✓</span>}
              </button>
            ))}
          </div>

          <h3 className="filter-title" style={{ marginTop: '32px' }}>Sort By</h3>
          <div className="filter-list">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`filter-item ${sort === opt.value ? 'active' : ''}`}
                onClick={() => updateParam('sort', opt.value)}
              >
                {opt.label}
                {sort === opt.value && <span className="filter-check">✓</span>}
              </button>
            ))}
          </div>
        </aside>

        {/* Products grid */}
        <div className="products-area">
          {loading ? (
            <div className="loading-state"><div className="spinner" /></div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <p>No products found.</p>
              <button className="btn-ghost" style={{ marginTop: '16px' }} onClick={() => setSearchParams({})}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid-4">
                {products.map((p, i) => (
                  <div key={p._id} style={{ animationDelay: `${i * 0.05}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {total > 12 && (
                <div className="pagination">
                  <button
                    className="btn-ghost"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    ← Prev
                  </button>
                  <span className="page-info">Page {page} of {Math.ceil(total / 12)}</span>
                  <button
                    className="btn-ghost"
                    disabled={page >= Math.ceil(total / 12)}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
