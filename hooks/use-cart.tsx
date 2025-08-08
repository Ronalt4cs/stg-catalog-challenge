"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getCartItems, getSupabaseClient } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import type { CartItem, Product } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface CartContextType {
  cartItems: CartItem[]
  loading: boolean
  addToCart: (product: Product) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  loading: false,
  addToCart: async () => { },
  updateQuantity: async () => { },
  removeFromCart: async () => { },
  clearCart: async () => { },
  refreshCart: async () => { },
})

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const supabase = getSupabaseClient()

  const refreshCart = async () => {
    if (!user) {
      setCartItems([])
      return
    }

    setLoading(true)
    try {
      const cartItems = await getCartItems(user.id)
      setCartItems(cartItems)
    } catch (error) {
      console.error("Error fetching cart:", error)
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product: Product) => {
    if (!user) return

    try {
      const existingItem = cartItems.find((item) => item.product_id === product.id)

      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + 1)
      } else {
        const { error } = await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        })

        if (error) throw error
        await refreshCart()
        toast({
          title: "Adicionado ao carrinho",
          description: `${product.name} Foi adicionado ao carrinho`,
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Item não foi adicionado ao carrinho",
        variant: "destructive",
      })
    }
  }

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId)
      return
    }

    try {
      const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", itemId)

      if (error) throw error
      await refreshCart()
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar quantidade",
        variant: "destructive",
      })
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

      if (error) throw error
      await refreshCart()
      toast({
        title: "Removido do carrinho",
        description: "O item foi removido do carrinho",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao remover item do carrinho",
        variant: "destructive",
      })
    }
  }

  const clearCart = async () => {
    if (!user) return

    try {
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

      if (error) throw error
      setCartItems([])
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao limpar carrinho",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    refreshCart()
  }, [user])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
