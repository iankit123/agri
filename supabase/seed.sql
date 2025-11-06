-- Seed dummy data for Bharat Mandi
-- Run this after creating the schema
-- Uses INSERT ... ON CONFLICT to avoid errors if data already exists

-- Insert 3 verified sellers and 1 non-verified seller
INSERT INTO agrilink_users (id, name, role, email, phone, is_verified) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Rajesh Spice Traders', 'seller', 'rajesh@example.com', '+91 9876543210', true),
  ('00000000-0000-0000-0000-000000000002', 'Jaipur Heeng House', 'seller', 'heeng@example.com', '+91 9876543211', true),
  ('00000000-0000-0000-0000-000000000003', 'Premium Spice Co', 'seller', 'premium@example.com', '+91 9876543212', true),
  ('00000000-0000-0000-0000-000000000004', 'New Spice Traders', 'seller', 'newtrader@example.com', '+91 9876543213', false)
ON CONFLICT (id) DO NOTHING;

-- Insert 1 admin (only if doesn't exist)
INSERT INTO agrilink_users (id, name, role, email, phone) VALUES
  ('00000000-0000-0000-0000-000000000010', 'Admin User', 'admin', 'admin@agrilink.com', '+91 9999999999')
ON CONFLICT (id) DO NOTHING;

-- Insert 6 products with last_week_sold values and image URLs (only if they don't exist)
INSERT INTO agrilink_products (id, seller_id, name, price, quantity, storage_location, photo_url, last_week_sold) VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Premium Heeng (Asafoetida)', 2500.00, 500, 'Jaipur VDN Cold Storage', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop', 100.00),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Organic Ilaichi (Cardamom)', 1800.00, 300, 'Jaipur Warehouse, Sector 5', 'https://images.unsplash.com/photo-1615485925511-ef4f6c5b8c5e?w=800&h=600&fit=crop', 75.50),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'Pure Heeng Powder', 2200.00, 400, 'Jaipur Central Storage', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop', 120.00),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000002', 'Green Ilaichi (Small)', 1600.00, 250, 'Jaipur VDN Cold Storage', 'https://images.unsplash.com/photo-1615485925511-ef4f6c5b8c5e?w=800&h=600&fit=crop', 85.25),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000003', 'Premium Saunf (Fennel Seeds)', 1200.00, 600, 'Jaipur Cold Storage, Block A', 'https://images.unsplash.com/photo-1606921233158-5c0e7e5e0b5c?w=800&h=600&fit=crop', 150.75),
  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000004', 'Mixed Spice Pack', 1400.00, 200, 'Jaipur Warehouse, Sector 8', 'https://images.unsplash.com/photo-1606921233158-5c0e7e5e0b5c?w=800&h=600&fit=crop', 45.00)
ON CONFLICT (id) DO NOTHING;
