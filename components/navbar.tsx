'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      // Check localStorage for mock auth
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('agrilink_user')
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            // Verify user still exists in database
            const { data } = await supabase
              .from('agrilink_users')
              .select('*')
              .eq('id', userData.id)
              .single()
            if (data) {
              setUser(data)
            } else {
              localStorage.removeItem('agrilink_user')
            }
          } catch (e) {
            localStorage.removeItem('agrilink_user')
          }
        }
      }
    }
    getUser()
  }, [])

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('agrilink_user')
      setUser(null) // Clear user state immediately
      // Force a full page reload to ensure clean state
      window.location.href = '/'
    }
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Bharat Mandi Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800">Bharat Mandi</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role === 'seller' && (
                  <Link href="/seller/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <Button variant="ghost">Admin Panel</Button>
                  </Link>
                )}
                <span className="text-sm text-gray-600">{user.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Buyer Login</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline">Seller Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

