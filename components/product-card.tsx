'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Product } from '@/lib/products'
import { useCartStore, CartItem } from '@/lib/store'
import { Button } from '@/components/ui/button'
import Image from "next/image";

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      color: product.color,
      image: product.image,
    }
    addItem(cartItem)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full"
    >
      {/* Color Preview */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          backgroundColor: product.color === 'rose' ? '#d4a5a5' :
            product.color === 'lavender' ? '#d1c4e9' :
            product.color === 'mint' ? '#c8e6c9' :
            product.color === 'peach' ? '#f0c4b8' :
            product.color === 'honey' ? '#ffe0b2' : '#ff9999',
        }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-full h-full flex items-center justify-center text-6xl"
        >
          🧼
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

        {/* Scent and Benefits */}
        <div className="mb-4 space-y-2">
          <p className="text-sm">
            <span className="font-semibold text-foreground">Scent: </span>
            <span className="text-muted-foreground">{product.scent}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.benefits.map((benefit) => (
              <span
                key={benefit}
                className="text-xs bg-accent/20 text-accent-foreground px-3 py-1 rounded-full"
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-primary mb-4">
          ₹{product.price}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-primary transition-colors flex items-center justify-center font-semibold"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 h-8 border border-border rounded-lg text-center bg-input text-foreground"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-lg bg-secondary text-foreground hover:bg-primary transition-colors flex items-center justify-center font-semibold"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <motion.div
          animate={isAdded ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={handleAddToCart}
            className={`w-full transition-all ${
              isAdded
                ? 'bg-accent text-accent-foreground hover:bg-accent'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
