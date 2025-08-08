import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Shield, Smartphone } from "lucide-react"

export default async function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Bem vindo ao <span className="text-blue-600 dark:text-blue-400">STG Catalog</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Descubra produtos incríveis e conclua seus pedidos com facilidade pelo WhatsApp. Sua loja completa para eletrônicos, roupas e equipamentos esportivos
        </p>
        <div className="space-x-4">
          <Link href="/register">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Começe já
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Entrar
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
          <ShoppingBag className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Compras Fáceis</h3>
          <p className="text-muted-foreground">
            Navegue pelo nosso extenso catálogo e adicione itens ao seu carrinho com apenas um clique
          </p>
        </div>
        <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
          <Smartphone className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Pedidos Pelo WhatsApp</h3>
          <p className="text-muted-foreground">
            Conclua sua compra pelo WhatsApp com mensagens de pedido pré-formatadas.          </p>
        </div>
        <div className="text-center p-6 bg-card rounded-lg shadow-sm border">
          <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Seguro & Rápido</h3>
          <p className="text-muted-foreground">
            Seus dados são protegidos com segurança de nível empresarial e tempos de carregamento rápidos.          </p>
        </div>
      </div>

      <div className="bg-blue-600 dark:bg-blue-700 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Pronto para começar a comprar?</h2>
        <p className="text-xl mb-6">Junte-se a milhares de clientes satisfeitos e descubra produtos incríveis hoje mesmo..</p>
        <Link href="/register">
          <Button size="lg" variant="secondary">
            Crie Sua Conta
          </Button>
        </Link>
      </div>
    </div>
  )
}
