'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Navbar } from '@/components/navbar'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'buyer' as 'buyer' | 'seller' | 'admin',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock authentication - just create/update user in database
      // In production, you'd use Supabase Auth here
      
      if (isSignUp) {
        const { data, error } = await supabase
          .from('agrilink_users')
          .insert({
            name: formData.name,
            email: formData.email || null,
            phone: formData.phone || null,
            role: formData.role,
          })
          .select()
          .single()

        if (error) throw error

        // Mock: Set a session (in production, use Supabase Auth)
        console.log('User signed up:', data)
        // Store user in localStorage for mock auth
        localStorage.setItem('agrilink_user', JSON.stringify(data))
        alert('Account created! (Mock auth - no OTP sent)')
        
        // Redirect based on role
        if (data.role === 'seller') {
          router.push('/seller/dashboard')
        } else if (data.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
        router.refresh()
      } else {
        // Mock login - find user by email or phone
        const { data, error } = await supabase
          .from('agrilink_users')
          .select('*')
          .or(`email.eq.${formData.email},phone.eq.${formData.phone}`)
          .single()

        if (error || !data) {
          throw new Error('User not found. Please check your email/phone or sign up.')
        }

        console.log('User logged in:', data)
        // Store user in localStorage for mock auth
        localStorage.setItem('agrilink_user', JSON.stringify(data))
        alert('Logged in! (Mock auth)')
        
        // Redirect based on role
        if (data.role === 'seller') {
          router.push('/seller/dashboard')
        } else if (data.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
        router.refresh()
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      alert(error.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Create Account' : 'Login'}</CardTitle>
            <CardDescription>
              {isSignUp
                ? 'Join Bharat Mandi as a buyer or seller'
                : 'Enter your email or phone to continue'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>

              {isSignUp && (
                <div>
                  <Label htmlFor="role">I want to *</Label>
                  <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="buyer">Buy Spices</option>
                    <option value="seller">Sell Spices</option>
                    <option value="admin">Admin Access</option>
                  </select>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className="text-green-600 hover:underline"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-green-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <div className="mt-4 rounded-md bg-yellow-50 p-3 text-xs text-yellow-800">
              <strong>Note:</strong> This is a mock authentication system. No OTP is sent.
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

