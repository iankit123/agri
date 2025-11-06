-- AgriLink Jaipur Schema
-- Safe schema creation - only creates tables if they don't exist
-- Uses prefixed table names to avoid conflicts with other projects

-- Enable UUID extension (safe - won't error if already exists)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (only create if doesn't exist)
CREATE TABLE IF NOT EXISTS agrilink_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'admin')),
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table (only create if doesn't exist)
CREATE TABLE IF NOT EXISTS agrilink_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES agrilink_users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  photo_url TEXT,
  quantity DECIMAL(10, 2) NOT NULL,
  storage_location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample requests table (only create if doesn't exist)
CREATE TABLE IF NOT EXISTS agrilink_sample_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES agrilink_users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES agrilink_products(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'dispatched', 'delivered')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_agrilink_products_seller_id ON agrilink_products(seller_id);
CREATE INDEX IF NOT EXISTS idx_agrilink_sample_requests_buyer_id ON agrilink_sample_requests(buyer_id);
CREATE INDEX IF NOT EXISTS idx_agrilink_sample_requests_product_id ON agrilink_sample_requests(product_id);
CREATE INDEX IF NOT EXISTS idx_agrilink_sample_requests_status ON agrilink_sample_requests(status);

-- Enable Row Level Security (RLS) - safe, won't affect existing policies
ALTER TABLE agrilink_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE agrilink_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE agrilink_sample_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for our tables only), then create new ones
DROP POLICY IF EXISTS "agrilink_users_read_own" ON agrilink_users;
DROP POLICY IF EXISTS "agrilink_users_update_own" ON agrilink_users;
DROP POLICY IF EXISTS "agrilink_users_insert" ON agrilink_users;
DROP POLICY IF EXISTS "agrilink_products_read_all" ON agrilink_products;
DROP POLICY IF EXISTS "agrilink_products_insert_own" ON agrilink_products;
DROP POLICY IF EXISTS "agrilink_products_update_own" ON agrilink_products;
DROP POLICY IF EXISTS "agrilink_products_delete_own" ON agrilink_products;
DROP POLICY IF EXISTS "agrilink_sample_requests_read_own" ON agrilink_sample_requests;
DROP POLICY IF EXISTS "agrilink_sample_requests_read_admin" ON agrilink_sample_requests;
DROP POLICY IF EXISTS "agrilink_sample_requests_insert_own" ON agrilink_sample_requests;
DROP POLICY IF EXISTS "agrilink_sample_requests_update_admin" ON agrilink_sample_requests;

-- RLS Policies for agrilink_users (simplified for MVP - allows all operations)
CREATE POLICY "agrilink_users_read_own" ON agrilink_users
  FOR SELECT USING (true);

CREATE POLICY "agrilink_users_update_own" ON agrilink_users
  FOR UPDATE USING (true);

CREATE POLICY "agrilink_users_insert" ON agrilink_users
  FOR INSERT WITH CHECK (true);

-- RLS Policies for agrilink_products (everyone can read, simplified insert/update for MVP)
CREATE POLICY "agrilink_products_read_all" ON agrilink_products
  FOR SELECT USING (true);

CREATE POLICY "agrilink_products_insert_own" ON agrilink_products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "agrilink_products_update_own" ON agrilink_products
  FOR UPDATE USING (true);

CREATE POLICY "agrilink_products_delete_own" ON agrilink_products
  FOR DELETE USING (true);

-- RLS Policies for agrilink_sample_requests
CREATE POLICY "agrilink_sample_requests_read_own" ON agrilink_sample_requests
  FOR SELECT USING (true);

CREATE POLICY "agrilink_sample_requests_read_admin" ON agrilink_sample_requests
  FOR SELECT USING (true);

CREATE POLICY "agrilink_sample_requests_insert_own" ON agrilink_sample_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "agrilink_sample_requests_update_admin" ON agrilink_sample_requests
  FOR UPDATE USING (true);
