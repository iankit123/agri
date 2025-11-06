-- Update products with images from your Supabase Storage
-- Replace YOUR_SUPABASE_PROJECT_URL below with your actual Supabase project URL
-- Find it in: Supabase Dashboard → Settings → API → Project URL
-- Example: https://abcdefghijklmnop.supabase.co

-- Based on your uploaded files in product-photos bucket:
-- 1. download.jpeg (11.62 KB)
-- 2. Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes... (17.15 KB, webp)
-- 3. hing-powder-500x500.webp (40 KB)
-- 4. Pushkar India... (737.35 KB, html - skip this one)

-- Premium Heeng (Asafoetida) - using download.jpeg
UPDATE agrilink_products 
SET photo_url = CONCAT('YOUR_SUPABASE_PROJECT_URL', '/storage/v1/object/public/product-photos/download.jpeg')
WHERE id = '10000000-0000-0000-0000-000000000001';

-- Organic Ilaichi (Cardamom) - using Hing image (you may want to upload a cardamom image later)
UPDATE agrilink_products 
SET photo_url = CONCAT('YOUR_SUPABASE_PROJECT_URL', '/storage/v1/object/public/product-photos/Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...')
WHERE id = '10000000-0000-0000-0000-000000000002';

-- Pure Heeng Powder - using hing-powder-500x500.webp
UPDATE agrilink_products 
SET photo_url = CONCAT('YOUR_SUPABASE_PROJECT_URL', '/storage/v1/object/public/product-photos/hing-powder-500x500.webp')
WHERE id = '10000000-0000-0000-0000-000000000003';

-- Green Ilaichi (Small) - using Hing image (you may want to upload a cardamom image later)
UPDATE agrilink_products 
SET photo_url = CONCAT('YOUR_SUPABASE_PROJECT_URL', '/storage/v1/object/public/product-photos/Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...')
WHERE id = '10000000-0000-0000-0000-000000000004';

-- Premium Saunf (Fennel Seeds) - using download.jpeg (you may want to upload a fennel image later)
UPDATE agrilink_products 
SET photo_url = CONCAT('YOUR_SUPABASE_PROJECT_URL', '/storage/v1/object/public/product-photos/download.jpeg')
WHERE id = '10000000-0000-0000-0000-000000000005';

-- Mixed Spice Pack - using download.jpeg
UPDATE agrilink_products 
SET photo_url = CONCAT('YOUR_SUPABASE_PROJECT_URL', '/storage/v1/object/public/product-photos/download.jpeg')
WHERE id = '10000000-0000-0000-0000-000000000006';
