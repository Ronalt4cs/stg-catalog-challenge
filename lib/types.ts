export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  product: Product
}

export interface User {
  id: string
  email: string
  user_metadata: {
    full_name?: string
  }
}

export interface Order {
  id: string
  user_id: string
  customer_name: string
  customer_email: string | null
  customer_phone: string
  customer_address: string
  notes: string | null
  total_amount: number
  status: string
  whatsapp_sent_at: string
  created_at: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  subtotal: number
  created_at: string
}
