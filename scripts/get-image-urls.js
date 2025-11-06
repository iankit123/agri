// Helper script to get Supabase storage URLs
// Run: node scripts/get-image-urls.js

// Replace with your Supabase project URL (from Settings → API → Project URL)
const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL';

const images = [
  { filename: 'download.jpeg', product: 'Premium Heeng (Asafoetida)', id: '10000000-0000-0000-0000-000000000001' },
  { filename: 'Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...', product: 'Organic Ilaichi (Cardamom)', id: '10000000-0000-0000-0000-000000000002' },
  { filename: 'hing-powder-500x500.webp', product: 'Pure Heeng Powder', id: '10000000-0000-0000-0000-000000000003' },
  { filename: 'Hing-Heeng-Asafoetida-Ferula-foetida-TheWholes...', product: 'Green Ilaichi (Small)', id: '10000000-0000-0000-0000-000000000004' },
  { filename: 'download.jpeg', product: 'Premium Saunf (Fennel Seeds)', id: '10000000-0000-0000-0000-000000000005' },
  { filename: 'download.jpeg', product: 'Mixed Spice Pack', id: '10000000-0000-0000-0000-000000000006' },
];

console.log('\n=== Supabase Storage Image URLs ===\n');
console.log('Copy these UPDATE statements:\n');

images.forEach((img, index) => {
  const url = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/product-photos/${img.filename}`;
  console.log(`-- ${img.product}`);
  console.log(`UPDATE agrilink_products`);
  console.log(`SET photo_url = '${url}'`);
  console.log(`WHERE id = '${img.id}';\n`);
});

console.log('\n=== Or get URLs directly ===\n');
images.forEach((img) => {
  const url = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/product-photos/${img.filename}`;
  console.log(`${img.product}: ${url}`);
});

