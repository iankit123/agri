'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { Product } from '@/types/database'

interface SampleRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function SampleRequestModal({ open, onOpenChange, product }: SampleRequestModalProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Get current user from mock auth
      let userId = null
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('agrilink_user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          userId = userData.id
        }
      }
      
      if (!userId) {
        // If no user, create a guest buyer account
        const { data: newUser, error: userError } = await supabase
          .from('agrilink_users')
          .insert({
            name: formData.name,
            phone: formData.phone,
            role: 'buyer',
          })
          .select()
          .single()

        if (userError) throw userError

        userId = newUser.id
        // Store in localStorage for future requests
        if (typeof window !== 'undefined') {
          localStorage.setItem('agrilink_user', JSON.stringify(newUser))
        }
      } else {
        // Update user info if needed
        await supabase
          .from('agrilink_users')
          .update({
            name: formData.name,
            phone: formData.phone,
          })
          .eq('id', userId)
      }

      // Create sample request
      const { error: requestError } = await supabase
        .from('agrilink_sample_requests')
        .insert({
          buyer_id: userId,
          product_id: product.id,
          address: formData.address,
          status: 'pending',
        })

      if (requestError) throw requestError

      // Mock email confirmation
      console.log('Sample request confirmation email would be sent to:', formData.phone)
      console.log('Product:', product.name)
      console.log('Address:', formData.address)

      alert('Sample request submitted successfully! We will contact you soon.')
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error('Error submitting sample request:', error)
      alert('Failed to submit sample request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Request Sample - {product.name}</DialogTitle>
          <DialogDescription>
            Fill in your details to request a sample. We'll contact you shortly.
          </DialogDescription>
          <div className="mt-2 rounded-md bg-blue-50 p-3 text-sm text-blue-800">
            <p className="font-medium">Delivery Charges:</p>
            <p>₹100 + GST across Jaipur</p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <Label htmlFor="address">Delivery Address *</Label>
            <Textarea
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter your complete delivery address"
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

