-- Add product images to existing products
-- Run this to add image URLs to products that don't have images yet
-- Using Unsplash placeholder images - replace with your own Supabase storage URLs if needed

UPDATE agrilink_products 
SET photo_url = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop'
WHERE id = '10000000-0000-0000-0000-000000000001';
-- Premium Heeng (Asafoetida) - replace with your uploaded image URL

UPDATE agrilink_products 
SET photo_url = 'https://images.unsplash.com/photo-1615485925511-ef4f6c5b8c5e?w=800&h=600&fit=crop'
WHERE id = '10000000-0000-0000-0000-000000000002';
-- Organic Ilaichi (Cardamom)

UPDATE agrilink_products 
SET photo_url = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop'
WHERE id = '10000000-0000-0000-0000-000000000003';
-- Pure Heeng Powder

UPDATE agrilink_products 
SET photo_url = 'https://images.unsplash.com/photo-1615485925511-ef4f6c5b8c5e?w=800&h=600&fit=crop'
WHERE id = '10000000-0000-0000-0000-000000000004';
-- Green Ilaichi (Small)

UPDATE agrilink_products 
SET photo_url = 'https://images.unsplash.com/photo-1606921233158-5c0e7e5e0b5c?w=800&h=600&fit=crop'
WHERE id = '10000000-0000-0000-0000-000000000005';
-- Premium Saunf (Fennel Seeds)

UPDATE agrilink_products 
SET photo_url = 'https://images.unsplash.com/photo-1606921233158-5c0e7e5e0b5c?w=800&h=600&fit=crop'
WHERE id = '10000000-0000-0000-0000-000000000006';
-- Mixed Spice Pack

