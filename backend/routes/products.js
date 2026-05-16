const express = require('express');
const { body, validationResult } = require('express-validator');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// ── GET /api/products ─────────────────────────────────────────────────────────
// Query params: search, category, sort, page, limit
router.get('/', async (req, res) => {
  try {
    const { search, category, sort = 'newest', page = 1, limit = 12 } = req.query;

    // Build filter
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (search) {
      filter.$or = [
        { name:        { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category:    { $regex: search, $options: 'i' } },
      ];
    }

    // Sort
    const sortMap = {
      newest:     { createdAt: -1 },
      price_asc:  { price: 1 },
      price_desc: { price: -1 },
      name_asc:   { name: 1 },
    };
    const sortQuery = sortMap[sort] || { createdAt: -1 };

    const total    = await Product.countDocuments(filter);
    const products = await Product
      .find(filter)
      .sort(sortQuery)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/products/:id ─────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/products ────────────────────────────────────────────────────────
// Admin only
const productValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').isIn(['Electronics', 'Clothing', 'Accessories', 'Home', 'Beauty']).withMessage('Invalid category'),
  body('stock').isInt({ min: 0 }).withMessage('Valid stock count required'),
];

router.post('/', protect, adminOnly, productValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PUT /api/products/:id ─────────────────────────────────────────────────────
// Admin only
router.put('/:id', protect, adminOnly, productValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/products/:id ──────────────────────────────────────────────────
// Admin only
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
