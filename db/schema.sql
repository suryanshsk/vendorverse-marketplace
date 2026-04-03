CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'vendor', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (email, role)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  vendor TEXT NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER NOT NULL,
  category TEXT NOT NULL,
  emoji TEXT NOT NULL,
  rating NUMERIC(2,1) NOT NULL,
  reviews INTEGER NOT NULL,
  badge TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  order_code TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  product_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('customer', 'vendor', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO products (name, vendor, price, original_price, category, emoji, rating, reviews, badge)
VALUES
  ('Wireless Earbuds Pro', 'TechZone India', 2499, 3200, 'electronics', '🎧', 4.7, 234, 'BESTSELLER'),
  ('Smart Watch Ultra', 'WearTech', 8999, 12000, 'electronics', '⌚', 4.8, 187, 'NEW'),
  ('Running Shoes X3', 'SportGear Hub', 3499, 5000, 'sports', '👟', 4.6, 312, 'SALE'),
  ('Mechanical Keyboard', 'TechZone India', 4799, 6000, 'electronics', '⌨️', 4.9, 98, NULL),
  ('Linen Kurta Set', 'EthnicHaat', 1299, 1800, 'fashion', '👘', 4.4, 156, 'NEW'),
  ('Yoga Mat Premium', 'SportGear Hub', 899, 1200, 'sports', '🧘', 4.5, 203, NULL),
  ('Minimalist Table Lamp', 'HomeDecorWorld', 1599, 2200, 'home', '💡', 4.6, 89, NULL),
  ('Full Stack Handbook', 'TechBooks India', 599, 899, 'books', '📚', 4.8, 445, 'BESTSELLER')
ON CONFLICT DO NOTHING;

INSERT INTO orders (order_code, customer_name, product_name, amount, status, role)
VALUES
  ('#VV-7821', 'Rahul Sharma', 'Pro Headphones', 3299, 'Delivered', 'vendor'),
  ('#VV-7820', 'Priya Mehta', 'Smart Watch Pro', 7499, 'Processing', 'vendor'),
  ('#VV-7819', 'Arjun Singh', 'Air Max Runners', 2499, 'Pending', 'vendor')
ON CONFLICT DO NOTHING;
