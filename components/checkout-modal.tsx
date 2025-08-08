"use client"

import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/hooks/use-cart"
import { getSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, User } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

interface CheckoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutModal({ open, onOpenChange }: CheckoutModalProps) {
  const { user } = useAuth()
  const { cartItems, clearCart } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
  })
  const supabase = getSupabaseClient()

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const saveOrderToDatabase = async () => {
    if (!user) return null

    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email || null,
          total_amount: total,
          status: "pending",
        })
        .select()
        .single()

      if (orderError) throw orderError

      const orderItems = cartItems.map((item) => ({
        order_id: orderData.id,
        product_id: item.product_id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
        subtotal: item.product.price * item.quantity,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      return orderData.id
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar o pedido. Tente novamente.",
        variant: "destructive",
      })
      return null
    }
  }

  const generateWhatsAppMessage = () => {
    let message = `? NOVO PEDIDO - STG CATALOG\n\n`

    message += `? Cliente: ${customerInfo.name}\n`
    message += `? Email: ${customerInfo.email}\n`
    message += `? PRODUTOS:\n`
    cartItems.forEach((item) => {
      message += `- ${item.product.name} - Qtd: ${item.quantity} - R$ ${item.product.price}\n`
    })
    message += `? TOTAL: R$ ${total.toFixed(2)}\n`
    message += `---\n`
    message += `Pedido realizado via STG Catalog\n`

    return encodeURIComponent(message)
  }

  const handleCompleteOrder = async () => {
    const orderId = await saveOrderToDatabase()
    if (!orderId) return

    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/?text=${message}`

    window.open(whatsappUrl, "_blank")

    await clearCart()
    onOpenChange(false)

    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp e salvo no histórico.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-w-4xl max-h-[90vh] overflow-y-auto max-sm:min-h-screen max-[350px]:items-start">
        <DialogHeader className="max-sm:flex max-sm:items-center">
          <DialogTitle className="text-2xl font-bold flex items-center max-sm:text-xl">
            <MessageCircle className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
            Finalizar Pedido
          </DialogTitle>
          <DialogDescription className="max-sm:text-sm">
            Verifique seu pedido e confirme o envio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-sm:w-full">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="relative h-12 w-12 flex-shrink-0">
                      <Image
                        src={item.product.image_url || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">x{item.quantity}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Frete:</span>
                  <span className="text-blue-600 dark:text-blue-400">Grátis</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span className="text-blue-600 dark:text-blue-400">R$ {total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCompleteOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg text-slate-50 max-sm:text-sm"
                size="lg"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar Pedido via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ao clicar em "Enviar Pedido", você será redirecionado para o WhatsApp com os detalhes do seu pedido.
              </p>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
