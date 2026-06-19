import { Hero } from '@/components/hero'
import { ProductsSection } from '@/components/products-section'
import { CartDrawer } from '@/components/cart-drawer'

export default function Home() {
  return (
    <main className="w-full bg-background">
      <section className="w-full">
        <img src="/banner.png" alt="Banner" className="w-full h-auto" />
      </section>
      <Hero />
      <ProductsSection />
      <CartDrawer />
    </main>
  )
}
