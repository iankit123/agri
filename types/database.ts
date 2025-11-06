export type UserRole = 'buyer' | 'seller' | 'admin'

export interface User {
  id: string
  name: string
  role: UserRole
  email?: string
  phone?: string
  is_verified?: boolean
  created_at: string
}

export interface Product {
  id: string
  seller_id: string
  name: string
  price: number
  photo_url: string | null
  quantity: number
  storage_location: string
  last_week_sold?: number
  created_at: string
  seller?: {
    name: string
    is_verified?: boolean
  }
}

export interface SampleRequest {
  id: string
  buyer_id: string
  product_id: string
  address: string
  status: 'pending' | 'dispatched' | 'delivered'
  created_at: string
  buyer?: {
    name: string
    phone?: string
    email?: string
  }
  product?: Product
}

