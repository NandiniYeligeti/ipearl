import { Hero } from '@/components/hero'
import { ProductsSection } from '@/components/products-section'
import { CartDrawer } from '@/components/cart-drawer'

export default function Home() {
  return (
    <main className="w-full bg-background pt-16">
      <section className="w-full">
        <img src="/banner.png" alt="Banner" className="w-full h-auto max-h-[800px] md:max-h-[900px] lg:max-h-[800px] object-cover" />
      </section>
      <Hero />
      <ProductsSection />
      <CartDrawer />
    </main>
  )
}
