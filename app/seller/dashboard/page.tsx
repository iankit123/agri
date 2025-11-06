'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { createClient } from '@/lib/supabase/client'

export default function SellerDashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<'add' | 'listings'>('add')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    storage_location: '',
    photo: null as File | null,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    // Check mock auth
    let userId = null
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('agrilink_user')
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          userId = userData.id
          if (userData.role !== 'seller') {
            router.push('/login')
            return
          }
        } catch (e) {
          router.push('/login')
          return
        }
      } else {
        router.push('/login')
        return
      }
    }

    if (!userId) return

    const { data } = await supabase
      .from('agrilink_products')
      .select('*')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false })

    if (data) setProducts(data)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get user from mock auth
      let userId = null
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('agrilink_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          userId = userData.id
        }
      }
      if (!userId) throw new Error('Not authenticated')

      let photoUrl = null

      // Upload photo if provided
      if (formData.photo) {
        const fileExt = formData.photo.name.split('.').pop()
        const fileName = `${userId}/${Date.now()}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('product-photos')
          .upload(fileName, formData.photo)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('product-photos')
          .getPublicUrl(fileName)
        
        photoUrl = publicUrl
      }

      // Create product
      const { error } = await supabase
        .from('agrilink_products')
        .insert({
          seller_id: userId,
          name: formData.name,
          price: parseFloat(formData.price),
          quantity: parseFloat(formData.quantity),
          storage_location: formData.storage_location,
          photo_url: photoUrl,
        })

      if (error) throw error

      alert('Product added successfully!')
      setFormData({
        name: '',
        price: '',
        quantity: '',
        storage_location: '',
        photo: null,
      })
      setActiveTab('listings')
      loadProducts()
    } catch (error: any) {
      console.error('Error adding product:', error)
      alert(error.message || 'Failed to add product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your spice listings</p>
        </div>

        <div className="mb-6 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'add'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'listings'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Listings ({products.length})
          </button>
        </div>

        {activeTab === 'add' ? (
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Premium Heeng"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price per kg (₹) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="1500.00"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity (kg) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="100"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Storage Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.storage_location}
                    onChange={(e) => setFormData({ ...formData, storage_location: e.target.value })}
                    placeholder="e.g., Jaipur Warehouse, Sector 5"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Adding...' : 'Add Product'}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id}>
                  <div className="relative h-48 w-full bg-gray-100">
                    {product.photo_url ? (
                      <img
                        src={product.photo_url}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-green-600">
                        ₹{Number(product.price).toLocaleString('en-IN')}/kg
                      </p>
                      <p className="text-sm text-gray-600">
                        Stock: {Number(product.quantity).toLocaleString('en-IN')} kg
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {product.storage_location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">No products listed yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

