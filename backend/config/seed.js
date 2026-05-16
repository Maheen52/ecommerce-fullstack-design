const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config({ path: require('path').join(__dirname, '../.env') });

const User    = require('../models/User');
const Product = require('../models/Product');

const PRODUCTS = [
  // Electronics
  { name: 'Sony WH-1000XM5 Headphones', price: 349.99, category: 'Electronics', stock: 25, description: 'Industry-leading noise cancellation with 30-hour battery life. Lightweight design with ultra-soft ear cushions and crystal-clear hands-free calling.', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&fit=crop&auto=format' },
  { name: 'Apple AirPods Pro', price: 249.00, category: 'Electronics', stock: 40, description: 'Active noise cancellation, adaptive transparency, and personalized spatial audio. Up to 6 hours of listening time with ANC enabled.', image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?w=600&h=600&fit=crop' },
  { name: 'Mechanical Gaming Keyboard', price: 159.99, category: 'Electronics', stock: 18, description: 'Tactile mechanical switches with per-key RGB backlighting. Compact TKL layout with aircraft-grade aluminium frame and detachable USB-C cable.', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600&fit=crop&auto=format' },
  { name: 'Dell 27" 4K Monitor', price: 529.99, category: 'Electronics', stock: 12, description: '4K UHD IPS panel with 99% sRGB colour accuracy. USB-C, HDMI and DisplayPort inputs. Perfect for creative professionals and remote workers.', image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?w=600&h=600&fit=crop' },
  { name: 'Logitech MX Master 3 Mouse', price: 99.99, category: 'Electronics', stock: 35, description: 'Advanced wireless mouse with MagSpeed electromagnetic scrolling. Works on any surface including glass. 70-day battery life.', image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&fit=crop&auto=format' },
  { name: 'Bamboo Laptop Stand', price: 49.99, category: 'Electronics', stock: 50, description: 'Sustainably sourced bamboo stand with adjustable height angles. Fits all laptops 11–17 inches. Includes cable management slot.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&fit=crop&auto=format' },

  // Clothing
  { name: 'Classic White Oxford Shirt', price: 89.00, category: 'Clothing', stock: 30, description: '100% premium Egyptian cotton Oxford shirt with mother-of-pearl buttons. Slim fit with a semi-spread collar. Machine washable.', image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&fit=crop' },
  { name: 'Merino Wool Crewneck Sweater', price: 145.00, category: 'Clothing', stock: 22, description: 'Extra-fine 18.5 micron merino wool from New Zealand. Naturally temperature-regulating, odour-resistant and incredibly soft against skin.', image: 'https://images.pexels.com/photos/45982/pexels-photo-45982.jpeg?w=600&h=600&fit=crop' },
  { name: 'Slim Fit Chino Trousers', price: 79.00, category: 'Clothing', stock: 28, description: 'Stretch cotton chinos with a tailored slim fit. Garment-washed for a lived-in feel. Available in multiple colours. Machine washable.', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&fit=crop&auto=format' },
  { name: 'Premium Denim Jacket', price: 129.00, category: 'Clothing', stock: 15, description: 'Raw selvedge denim jacket with a classic trucker silhouette. Sanforized fabric with brass hardware. Gets better with every wash.', image: 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&fit=crop' },

  // Accessories
  { name: 'Minimalist Leather Watch', price: 289.00, category: 'Accessories', stock: 10, description: 'Swiss quartz movement with sapphire crystal glass and a 40mm brushed stainless steel case. Italian leather strap. Water resistant to 50m.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&fit=crop&auto=format' },
  { name: 'Full-Grain Leather Wallet', price: 95.00, category: 'Accessories', stock: 45, description: 'Bifold wallet crafted from vegetable-tanned full-grain leather. 8 card slots, 2 bill compartments. Develops a beautiful patina over time.', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&fit=crop' },
  { name: 'Leather Journal — A5', price: 65.00, category: 'Accessories', stock: 28, description: 'Hand-stitched full-grain leather cover with 200 pages of 100gsm acid-free ivory paper. Lay-flat binding. Fully refillable.', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&fit=crop&auto=format' },
  { name: 'Canvas Weekender Bag', price: 175.00, category: 'Accessories', stock: 20, description: 'Waxed canvas weekender with full-grain leather handles and base. Fits 2–3 days of clothing. Interior zip pocket and shoe compartment.', image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&fit=crop&auto=format' },
  { name: 'Polarized Aviator Sunglasses', price: 149.00, category: 'Accessories', stock: 35, description: 'Polarized UV400 lenses in a classic aviator frame. Lightweight titanium construction. Includes premium hard case and microfibre cloth.', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&fit=crop&auto=format' },

  // Home
  { name: 'Handmade Ceramic Mug Set', price: 94.00, category: 'Home', stock: 20, description: 'Set of 4 wheel-thrown stoneware mugs fired at 1280°C. Each piece is unique with subtle glaze variations. Microwave and dishwasher safe.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&fit=crop&auto=format' },
  { name: 'Scented Soy Candle — Cedarwood', price: 42.00, category: 'Home', stock: 60, description: 'Hand-poured 100% soy wax candle with cedarwood and sandalwood fragrance. Cotton wick, 50-hour burn time. Comes in a reusable glass jar.', image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?w=600&h=600&fit=crop' },
  { name: 'Linen Throw Blanket', price: 110.00, category: 'Home', stock: 25, description: 'Stonewashed French linen throw in a generous 130×180cm size. Gets softer with every wash. Perfect for the sofa or bedroom.', image: 'https://images.unsplash.com/photo-1543248939-ff40856f65d4?w=600&fit=crop&auto=format' },
  { name: 'Wooden Serving Board', price: 68.00, category: 'Home', stock: 30, description: 'End-grain acacia wood serving board with juice groove and built-in handles. Naturally antibacterial. Hand wash recommended.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&fit=crop&auto=format' },
  { name: 'Wabi-Sabi Ceramic Vase', price: 55.00, category: 'Home', stock: 18, description: 'Hand-formed stoneware vase with an organic wabi-sabi shape. Matte reactive glaze in warm earth tones. Each piece is one of a kind.', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&fit=crop&auto=format' },

  // Beauty
  { name: 'Rosehip Facial Oil', price: 112.00, category: 'Beauty', stock: 18, description: 'Cold-pressed rosehip and sea buckthorn oil blend. Rich in vitamin C and omega fatty acids. Regenerates skin texture overnight. 30ml amber glass bottle.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&fit=crop&auto=format' },
  { name: 'Vitamin C Brightening Serum', price: 78.00, category: 'Beauty', stock: 30, description: '15% L-ascorbic acid with hyaluronic acid and vitamin E. Fades dark spots, boosts collagen and adds a lit-from-within glow. 30ml.', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&fit=crop&auto=format' },
  { name: 'Natural Lip Balm Set', price: 28.00, category: 'Beauty', stock: 55, description: 'Set of 4 lip balms made with beeswax, shea butter and coconut oil. Flavours: vanilla, mint, rose and unflavoured. Zero plastic packaging.', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&fit=crop&auto=format' },
  { name: 'Amber Oud Eau de Parfum', price: 185.00, category: 'Beauty', stock: 12, description: 'A rich oriental fragrance built around aged oud, warm amber and creamy sandalwood. Lasts 10–12 hours on skin. 50ml bottle.', image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&fit=crop' },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/luxe_ecommerce');
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    await User.deleteMany({ email: 'admin@luxe.com' });
    console.log('Cleared existing seed data');

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@luxe.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log(`✓ Admin created: ${admin.email}`);

    const products = await Product.insertMany(PRODUCTS);
    console.log(`✓ Inserted ${products.length} products`);

    console.log('\n── Seed complete ──────────────────────────');
    console.log('Admin login:  admin@luxe.com / admin123');
    console.log('────────────────────────────────────────────\n');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await mongoose.disconnect();
  }
};

seed();