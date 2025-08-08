import { createClient } from "@supabase/supabase-js"
import { CartItem, Order, Product } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)


let supabaseClient: ReturnType<typeof createClient> | null = null

export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

export async function getProducts(category?: string, searchTerm?: string) {
  let query = supabase.from("products").select("*").order("created_at", { ascending: false })

  if (category && category !== "all") {
    query = query.eq("category", category)
  }

  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Product[]
}

export async function getCartItems(userId: string) {
  const { data, error } = await supabase.from("cart_items").select(`*,product:products(*)`).eq("user_id", userId)

  if (error) throw error
  return data as CartItem[]
}

export async function getOrders(userId: string) {
  const { data, error } = await supabase.from("orders").select(`*,order_items (*)`).eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Order[]
}
