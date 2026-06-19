'use client'

import { About } from '@/components/about'
import { CartDrawer } from '@/components/cart-drawer'

export default function AboutPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      {/* Header spacing */}
      <div className="h-20" />
      <About />
      <CartDrawer />
    </main>
  )
}
