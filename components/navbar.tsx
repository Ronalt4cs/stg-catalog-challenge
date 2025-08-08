"use client"

import Link from "next/link"
import { ShoppingCart, User, LogOut, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/hooks/use-cart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { OrderHistoryModal } from "@/components/order-history-modal"

export function Navbar() {
  const { user, signOut } = useAuth()
  const { cartItems } = useCart()
  const [orderHistoryOpen, setOrderHistoryOpen] = useState(false)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 max-sm:h-20">
            {
              user ? (
                <Link href="/catalog" className="text-2xl font-bold text-blue-600 dark:text-blue-400 max-sm:text-sm">
                  STG Catalog
                </Link>
              ) : (
                <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  STG Catalog
                </Link>
              )
            }

            <div className="flex items-center space-x-4 max-sm:space-x-1">
              <ThemeToggle />

              {user ? (
                <>
                  <Link href="/catalog">
                    <Button variant="ghost">Catálogo</Button>
                  </Link>
                  <Link href="/cart" className="relative">
                    <Button variant="ghost" size="icon">
                      <ShoppingCart className="h-5 w-5" />
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{user.user_metadata?.full_name.split(" ")[0] || "User"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setOrderHistoryOpen(true)}>
                        <History className="h-4 w-4 mr-2" />
                        Histórico de pedidos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="space-x-2 max-sm:flex max-sm:space-x-0">
                  <Link href="/login">
                    <Button variant="ghost" className="max-sm:w-22">Entrar</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="max-sm:w-22">Registrar-se</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <OrderHistoryModal open={orderHistoryOpen} onOpenChange={setOrderHistoryOpen} />
    </>
  )
}
