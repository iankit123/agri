import { createClient } from '@/lib/supabase/server'
import { ProductCard } from '@/components/product-card'
import { Navbar } from '@/components/navbar'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let products = null
  
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('agrilink_products')
      .select(`
        *,
        seller:agrilink_users!agrilink_products_seller_id_fkey(name, is_verified)
      `)
      .order('created_at', { ascending: false })
    products = data
  } catch (error) {
    console.error('Error loading products:', error)
    // Products will remain null, will show empty state
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Available Spices</h1>
          <p className="mt-2 text-gray-600">
            Browse verified sellers offering heeng, ilaichi, and saunf
          </p>
        </div>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
            <p className="text-gray-500">No products available yet. Check back soon!</p>
          </div>
        )}
      </main>
    </div>
  )
}
