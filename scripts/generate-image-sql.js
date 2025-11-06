#!/usr/bin/env node
// Generate SQL to update products with Supabase storage image URLs
// Usage: node scripts/generate-image-sql.js

const fs = require('fs');
const path = require('path');

// Try to read Supabase URL from .env.local
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  try {
    const envFile = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envFile, 'utf8');
    const match = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
    if (match) {
      supabaseUrl = match[1].trim();
    }
  } catch (e) {
    // File doesn't exist or can't read
  }
}

if (!supabaseUrl || supabaseUrl.includes('your_supabase')) {
  console.log('⚠️  Could not find Supabase URL in environment variables.');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL or update the script.\n');
  supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
}

// Image mappings based on uploaded files
const imageMappings = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    product: 'Premium Heeng (Asafoetida)',
    filename: 'download.jpeg'
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    product: 'Organic Ilaichi (Cardamom)',
    filename: 'Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...' // Note: You may need the full filename
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    product: 'Pure Heeng Powder',
    filename: 'hing-powder-500x500.webp'
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    product: 'Green Ilaichi (Small)',
    filename: 'Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...'
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    product: 'Premium Saunf (Fennel Seeds)',
    filename: 'download.jpeg'
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    product: 'Mixed Spice Pack',
    filename: 'download.jpeg'
  }
];

console.log('-- Update products with images from Supabase Storage\n');
console.log(`-- Supabase URL: ${supabaseUrl}\n`);

imageMappings.forEach((mapping) => {
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/product-photos/${mapping.filename}`;
  console.log(`-- ${mapping.product}`);
  console.log(`UPDATE agrilink_products`);
  console.log(`SET photo_url = '${imageUrl}'`);
  console.log(`WHERE id = '${mapping.id}';\n`);
});

console.log('\n-- Copy the SQL above and run it in Supabase SQL Editor');

