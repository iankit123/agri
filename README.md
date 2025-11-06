# AgriLink Jaipur - B2B Spice Trading Marketplace

A production-ready web application for B2B spice trading, focused on heeng (asafoetida), ilaichi (cardamom), and saunf (fennel seeds). Built with Next.js, TypeScript, TailwindCSS, and Supabase.

## Features

### Seller Side
- **Login/Signup**: Mock authentication (email/phone)
- **Dashboard**: Add products with photos, prices, stock quantities, and storage locations
- **View Listings**: See all your listed products

### Buyer Side
- **Homepage**: Browse all available products from verified sellers
- **Product Cards**: View product photos, prices, stock, and seller information
- **Request Sample**: Submit sample requests with contact details

### Admin Panel
- **Sample Requests Management**: View all sample requests with buyer and seller details
- **Status Updates**: Mark samples as dispatched

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + TailwindCSS
- **Backend**: Supabase (Auth + Database + Storage)
- **UI Components**: Custom shadcn/ui components
- **Deployment**: Vercel-ready

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** in your Supabase dashboard
3. Run the schema SQL file:
   - Copy contents of `supabase/schema.sql`
   - Paste and execute in SQL Editor

4. Create a storage bucket for product photos:
   - Go to **Storage** in Supabase dashboard
   - Click **New bucket**
   - Name it: `product-photos`
   - Make it **Public** (uncheck "Private bucket")
   - Click **Create bucket**
   - (Optional) Configure RLS policies if you want more control

5. Run the seed data (optional, for development):
   - Copy contents of `supabase/seed.sql`
   - Paste and execute in SQL Editor

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials:
   - Get your **Project URL** from Supabase Settings → API
   - Get your **anon/public key** from the same page
   - Add them to `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
     ```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

1. **users**
   - `id` (UUID, Primary Key)
   - `name` (TEXT)
   - `role` (TEXT: 'buyer', 'seller', 'admin')
   - `email` (TEXT, nullable)
   - `phone` (TEXT, nullable)
   - `created_at` (TIMESTAMP)

2. **products**
   - `id` (UUID, Primary Key)
   - `seller_id` (UUID, Foreign Key → users)
   - `name` (TEXT)
   - `price` (DECIMAL)
   - `photo_url` (TEXT, nullable)
   - `quantity` (DECIMAL)
   - `storage_location` (TEXT)
   - `created_at` (TIMESTAMP)

3. **sample_requests**
   - `id` (UUID, Primary Key)
   - `buyer_id` (UUID, Foreign Key → users)
   - `product_id` (UUID, Foreign Key → products)
   - `address` (TEXT)
   - `status` (TEXT: 'pending', 'dispatched', 'delivered')
   - `created_at` (TIMESTAMP)

## Authentication

Currently uses **mock authentication** (no OTP sent). The system:
- Stores user sessions in `localStorage` (browser-based)
- Allows sign up with name, email/phone, and role (buyer/seller/admin)
- Allows login with email or phone (searches database)
- Creates user records directly in the `users` table
- Does NOT use Supabase Auth (bypasses it for MVP simplicity)

**Note**: For production, you should:
1. Integrate Supabase Auth with OTP or email verification
2. Replace localStorage with proper session management
3. Use Supabase Auth's built-in user management

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Environment Variables in Vercel

Go to **Settings → Environment Variables** and add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Project Structure

```
├── app/
│   ├── admin/          # Admin panel
│   ├── login/          # Authentication pages
│   ├── seller/         # Seller dashboard
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage (buyer view)
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── navbar.tsx      # Navigation bar
│   ├── product-card.tsx
│   └── sample-request-modal.tsx
├── lib/
│   ├── supabase/       # Supabase client setup
│   └── utils.ts        # Utility functions
├── supabase/
│   ├── schema.sql      # Database schema
│   └── seed.sql        # Dummy data
└── types/
    └── database.ts     # TypeScript types
```

## Features Not Included (By Design)

- Payment integration (Razorpay placeholder only)
- Chat/messaging system
- Broker logic
- AI features
- Complex dashboards
- Real OTP authentication (mock only)

## Future Enhancements

- Escrow payment system
- Delivery tracking
- Real-time notifications
- Advanced search and filters
- Seller verification badges
- Product reviews and ratings

## License

MIT

## Support

For issues or questions, please open an issue on the repository.
