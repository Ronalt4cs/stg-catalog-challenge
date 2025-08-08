"use client"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart, Star } from "lucide-react"
import { useState } from "react"

interface ProductModalProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    setAdding(true)
    for (let i = 0; i < quantity; i++) {
      await addToCart(product)
    }
    setAdding(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto max-sm:min-h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
          <DialogDescription>Veja detalhes do produto e adicione ao carrinho</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-8">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <div className="border-t border-b py-4">
              <p className="text-sm text-gray-500 mt-1 dark:text-slate-50">Frete grátis</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">R$ {product.price.toFixed(2)}</p>
              <p>{product.description}</p>
            </div>

            <div className="space-y-4">
              <Button onClick={handleAddToCart} disabled={adding} className="w-full h-12 text-lg" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                {adding ? "Adicionando..." : `Adicionar ao carrinho - R$ ${(product.price).toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
