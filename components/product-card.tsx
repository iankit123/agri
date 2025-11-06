'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SampleRequestModal } from './sample-request-modal'
import { Product } from '@/types/database'
import { CheckCircle2 } from 'lucide-react'

interface ProductCardProps {
  product: Product & { seller?: { name: string; is_verified?: boolean } }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check if seller is verified
  const isVerified = product.seller?.is_verified ?? false
  
  // Mask seller name
  const sellerDisplayName = product.seller
    ? `${isVerified ? 'Verified' : 'Seller'} #${product.seller_id.slice(0, 8)}`
    : 'Seller'

  return (
    <>
      <Card className="overflow-hidden">
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
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Stored at -</span> {product.storage_location}
            </p>
            {product.last_week_sold !== undefined && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Last week sold -</span> {Number(product.last_week_sold).toLocaleString('en-IN')} kg
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-green-600">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-gray-500">per kg</span>
            </div>
            <p className="text-sm text-gray-600">
              Stock: {Number(product.quantity).toLocaleString('en-IN')} kg
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-600">Seller: {sellerDisplayName}</p>
              {isVerified && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Request Sample
          </Button>
        </CardFooter>
      </Card>

      <SampleRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={product}
      />
    </>
  )
}

