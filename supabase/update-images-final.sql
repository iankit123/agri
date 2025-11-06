-- Update products with images from Supabase Storage
-- Run this in Supabase SQL Editor to add your uploaded images

-- Premium Heeng (Asafoetida) - using download.jpeg
UPDATE agrilink_products 
SET photo_url = 'https://jztpxmdiaqsafpzfcpib.supabase.co/storage/v1/object/public/product-photos/download.jpeg'
WHERE id = '10000000-0000-0000-0000-000000000001';

-- Organic Ilaichi (Cardamom) - NOTE: You may need to check the exact filename in Storage
-- The filename appears truncated. Click on the file in Storage to get the full name
UPDATE agrilink_products 
SET photo_url = 'https://jztpxmdiaqsafpzfcpib.supabase.co/storage/v1/object/public/product-photos/Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...'
WHERE id = '10000000-0000-0000-0000-000000000002';

-- Pure Heeng Powder - using hing-powder-500x500.webp
UPDATE agrilink_products 
SET photo_url = 'https://jztpxmdiaqsafpzfcpib.supabase.co/storage/v1/object/public/product-photos/hing-powder-500x500.webp'
WHERE id = '10000000-0000-0000-0000-000000000003';

-- Green Ilaichi (Small) - NOTE: You may need to check the exact filename in Storage
UPDATE agrilink_products 
SET photo_url = 'https://jztpxmdiaqsafpzfcpib.supabase.co/storage/v1/object/public/product-photos/Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...'
WHERE id = '10000000-0000-0000-0000-000000000004';

-- Premium Saunf (Fennel Seeds) - using download.jpeg
UPDATE agrilink_products 
SET photo_url = 'https://jztpxmdiaqsafpzfcpib.supabase.co/storage/v1/object/public/product-photos/download.jpeg'
WHERE id = '10000000-0000-0000-0000-000000000005';

-- Mixed Spice Pack - using download.jpeg
UPDATE agrilink_products 
SET photo_url = 'https://jztpxmdiaqsafpzfcpib.supabase.co/storage/v1/object/public/product-photos/download.jpeg'
WHERE id = '10000000-0000-0000-0000-000000000006';

