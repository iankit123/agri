'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/navbar'
import { createClient } from '@/lib/supabase/client'
import { SampleRequest } from '@/types/database'

export default function AdminPanel() {
  const router = useRouter()
  const supabase = createClient()
  const [requests, setRequests] = useState<(SampleRequest & { buyer?: any; product?: any })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
    loadRequests()
  }, [])

  const checkAuth = async () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('agrilink_user')
      if (!storedUser) {
        router.push('/login')
        return
      }
      try {
        const userData = JSON.parse(storedUser)
        if (userData.role !== 'admin') {
          router.push('/')
          return
        }
      } catch (e) {
        router.push('/login')
        return
      }
    }
  }

  const loadRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('agrilink_sample_requests')
        .select(`
          *,
          buyer:agrilink_users!agrilink_sample_requests_buyer_id_fkey(name, phone, email),
          product:agrilink_products!agrilink_sample_requests_product_id_fkey(name, price, seller:agrilink_users!agrilink_products_seller_id_fkey(name))
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setRequests(data)
    } catch (error) {
      console.error('Error loading requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkDispatched = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('agrilink_sample_requests')
        .update({ status: 'dispatched' })
        .eq('id', requestId)

      if (error) throw error

      alert('Sample marked as dispatched!')
      loadRequests()
    } catch (error) {
      console.error('Error updating request:', error)
      alert('Failed to update request. Please try again.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'dispatched':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">Loading...</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-600">Manage sample requests</p>
        </div>

        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {request.product?.name || 'Unknown Product'}
                      </CardTitle>
                      <p className="mt-1 text-sm text-gray-500">
                        Requested on {new Date(request.created_at).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">Buyer Details</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Name:</strong> {request.buyer?.name || 'N/A'}
                        </p>
                        <p>
                          <strong>Phone:</strong> {request.buyer?.phone || 'N/A'}
                        </p>
                        <p>
                          <strong>Email:</strong> {request.buyer?.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">Product & Seller</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Product:</strong> {request.product?.name || 'N/A'}
                        </p>
                        <p>
                          <strong>Price:</strong> ₹
                          {Number(request.product?.price || 0).toLocaleString('en-IN')}/kg
                        </p>
                        <p>
                          <strong>Seller:</strong>{' '}
                          {request.product?.seller?.name
                            ? `Verified Seller #${request.product.seller_id?.slice(0, 8)}`
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-700">Delivery Address</h3>
                    <p className="mt-1 text-sm text-gray-600">{request.address}</p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="mt-4">
                      <Button
                        onClick={() => handleMarkDispatched(request.id)}
                        className="w-full sm:w-auto"
                      >
                        Mark Sample Dispatched
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No sample requests yet.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

