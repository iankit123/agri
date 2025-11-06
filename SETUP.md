# Quick Setup Guide

## Database Setup

Since you have credentials configured, follow these steps:

### 1. Create Tables

1. Go to your Supabase Dashboard → **SQL Editor**
2. Open the file `supabase/schema.sql`
3. Copy the entire contents
4. Paste into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

This will create three tables with prefixed names to avoid conflicts:
- `agrilink_users`
- `agrilink_products`
- `agrilink_sample_requests`

**Note**: All CREATE statements use `IF NOT EXISTS`, so it's safe to run multiple times.

### 2. Run Migration (Add New Fields)

1. In SQL Editor, open `supabase/migration-add-fields.sql`
2. Copy the entire contents
3. Paste and run in SQL Editor

This adds:
- `is_verified` field to users table
- `last_week_sold` field to products table
- Updates existing data with sample values

### 3. Add Sample Data (Optional)

1. In SQL Editor, open `supabase/seed.sql`
2. Copy the entire contents
3. Paste and run in SQL Editor

This adds:
- 3 verified seller accounts
- 1 non-verified seller account (to show difference)
- 1 admin account
- 6 sample products with last_week_sold values

### 4. Create Storage Bucket

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Name: `product-photos`
4. Make it **Public** (uncheck "Private bucket")
5. Click **Create bucket**

### 5. Verify Setup

The app should now work! Visit:
- http://localhost:3001 (or your dev server port)
- Try logging in as admin: `admin@agrilink.com` or phone `+91 9999999999`

## Table Names

All tables use the `agrilink_` prefix to avoid conflicts:
- `agrilink_users` (instead of `users`)
- `agrilink_products` (instead of `products`)
- `agrilink_sample_requests` (instead of `sample_requests`)

This ensures your existing project tables remain untouched.

