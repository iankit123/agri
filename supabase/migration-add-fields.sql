-- Migration: Add verified seller status and last week sold fields
-- Run this after the initial schema

-- Add is_verified column to users table (for sellers)
ALTER TABLE agrilink_users 
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- Add last_week_sold column to products table
ALTER TABLE agrilink_products 
ADD COLUMN IF NOT EXISTS last_week_sold DECIMAL(10, 2) DEFAULT 0;

-- Update existing sellers to be verified (except one we'll mark as non-verified)
UPDATE agrilink_users 
SET is_verified = true 
WHERE role = 'seller' AND id != '00000000-0000-0000-0000-000000000004';

-- Add sample last_week_sold values to existing products
UPDATE agrilink_products 
SET last_week_sold = 100.00 
WHERE id = '10000000-0000-0000-0000-000000000001';

UPDATE agrilink_products 
SET last_week_sold = 75.50 
WHERE id = '10000000-0000-0000-0000-000000000002';

UPDATE agrilink_products 
SET last_week_sold = 120.00 
WHERE id = '10000000-0000-0000-0000-000000000003';

UPDATE agrilink_products 
SET last_week_sold = 85.25 
WHERE id = '10000000-0000-0000-0000-000000000004';

UPDATE agrilink_products 
SET last_week_sold = 150.75 
WHERE id = '10000000-0000-0000-0000-000000000005';

