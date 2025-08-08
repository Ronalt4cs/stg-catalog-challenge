"use client"

import type React from "react"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import { ProductModal } from "./product-modal"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdding(true)
    await addToCart(product)
    setAdding(false)
  }

  return (
    <>
      <Card
        className="h-full flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <CardContent className="p-4 flex-1">
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform"
            />
          </div>
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {product.price.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button onClick={handleAddToCart} disabled={adding} className="w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            {adding ? "Adicionando..." : "Adicionar ao carrinho"}
          </Button>
        </CardFooter>
      </Card>

      <ProductModal product={product} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
