'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import { ProductCard } from './product-card'

export function ProductsSection() {
return (
<section
className="w-full py-20 overflow-hidden"
style={{
background:
'linear-gradient(135deg, #B7DADB 0%, #AAD0D1 50%, #9FC8CA 100%)',
}}
> <div className="max-w-7xl mx-auto px-4">
{/* Section Header */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="text-center mb-16"
> <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
Our Soap Collection </h2>

```
      <p className="text-xl text-slate-700 max-w-2xl mx-auto">
        Discover our handcrafted selection of luxurious soaps, each one
        carefully formulated with natural ingredients for your skin&apos;s
        well-being.
      </p>
    </motion.div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

    {/* Features Section */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {[
        {
          icon: '🌿',
          title: '100% Natural',
          description:
            'Made with pure, ingredients from nature',
        },
        {
          icon: '♻️',
          title: 'Eco-Friendly',
          description:
            'Sustainable packaging and ethical sourcing',
        },
        {
          icon: '✨',
          title: 'Skin-Loving',
          description:
            'Formulated to nourish and protect your skin',
        },
      ].map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{
            y: -5,
          }}
          className="bg-white/20 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl border border-white/30"
        >
          <div className="text-5xl mb-4">
            {feature.icon}
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-3">
            {feature.title}
          </h3>

          <p className="text-slate-700">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


)
}
