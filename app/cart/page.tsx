"use client"

import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/hooks/use-cart"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { CheckoutModal } from "@/components/checkout-modal"

export default function CartPage() {
  const { user, loading: authLoading } = useAuth()
  const { cartItems, loading, updateQuantity, removeFromCart } = useCart()
  const router = useRouter()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione alguns itens ao seu carrinho antes de finalizar o pedido",
        variant: "destructive",
      })
      return
    }
    setCheckoutOpen(true)
  }

  if (authLoading || !user) {
    return <div>Loading...</div>
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">Seu Carrinho Está Vazio</h1>
          <p className="text-gray-600 mb-8">Adicione alguns produtos ao seu carrinho para começar.</p>
          <Button onClick={() => router.push("/catalog")}>Continuar comprando</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8">Carrinho de compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 max-sm:flex-col">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={item.product.image_url || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">{item.product.category}</p>
                    <p className="text-blue-600 dark:text-blue-400 font-bold">R$ {item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-16 text-center"
                      min="1"
                    />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1 lg:w-80">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Resumo do pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600 dark:text-blue-400">R$ {total.toFixed(2)}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full dark:text-slate-50 bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                Finalizar Pedido
              </Button>
              <Button variant="outline" onClick={() => router.push("/catalog")} className="w-full">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  )
}
