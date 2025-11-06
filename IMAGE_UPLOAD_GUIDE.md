# Image Upload Guide

## Option 1: Use Supabase Storage (Recommended)

### Upload Images via Supabase Dashboard:

1. Go to **Storage** → **product-photos** bucket in Supabase
2. Click **Upload file**
3. Upload your images (one for each product)
4. After upload, click on the file to get the **Public URL**
5. Copy the URL and update products using SQL:

```sql
-- Replace YOUR_IMAGE_URL with the actual Supabase storage URL
UPDATE agrilink_products 
SET photo_url = 'YOUR_IMAGE_URL'
WHERE id = '10000000-0000-0000-0000-000000000001';
-- Repeat for each product ID
```

### Upload via Seller Dashboard:

1. Login as a seller
2. Go to **Seller Dashboard** → **Add Product**
3. Fill in product details
4. Upload image using the file input
5. Submit - image will be automatically uploaded to Supabase storage

## Option 2: Use Your Own Image URLs

If you have images hosted elsewhere, update the `photo_url` field directly:

```sql
UPDATE agrilink_products 
SET photo_url = 'https://your-image-host.com/heeng.jpg'
WHERE id = '10000000-0000-0000-0000-000000000001';
```

## Option 3: Quick Fix - Run Image Update Script

Run `supabase/add-product-images.sql` in SQL Editor to add placeholder images from Unsplash (temporary solution).

## Replace Premium Heeng Image

Since you have a specific image for Premium Heeng:

1. Upload it to Supabase Storage → `product-photos` bucket
2. Get the public URL
3. Run:

```sql
UPDATE agrilink_products 
SET photo_url = 'YOUR_SUPABASE_STORAGE_URL_HERE'
WHERE id = '10000000-0000-0000-0000-000000000001';
```

Then refresh your browser to see the updated image!

