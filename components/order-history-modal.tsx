"use client"

import { useAuth } from "@/components/auth-provider"
import { getOrders } from "@/lib/supabase"
import type { Order } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar, Package, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"

interface OrderHistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderHistoryModal({ open, onOpenChange }: OrderHistoryModalProps) {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && user) {
      fetchOrders()
    }
  }, [open, user])

  const fetchOrders = async () => {
    if (!user) return

    setLoading(true)
    try {
      const orders = await getOrders(user.id)
      setOrders(orders)
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar histórico de pedidos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "confirmed":
        return "Confirmado"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregue"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Package className="h-6 w-6 mr-2" />
            Histórico de Pedidos
          </DialogTitle>
          <DialogDescription>Veja todo seu histórico de pedidos com status atualizado</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Nenhum pedido encontrado</p>
              <p className="text-muted-foreground">Seus pedidos aparecerão aqui após a primeira compra.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="w-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Pedido #{order.id.slice(0, 8)}</CardTitle>
                      <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(order.created_at).toLocaleDateString("pt-BR")}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        WhatsApp enviado
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Cliente:</p>
                        <p className="text-muted-foreground">{order.customer_name}</p>
                        {order.customer_email && <p className="text-muted-foreground">{order.customer_email}</p>}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <p className="font-medium mb-2">Itens do Pedido:</p>
                      <div className="space-y-2">
                        {order.order_items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center text-sm bg-muted/50 p-2 rounded"
                          >
                            <div>
                              <span className="font-medium">{item.product_name}</span>
                              <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                            </div>
                            <span className="font-medium">R$ {item.subtotal.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div>
                        <p className="font-medium mb-1">Observações:</p>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">{order.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                        R$ {order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
