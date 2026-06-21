'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCartStore, CartItem } from '@/lib/store'

interface ProductActionsProps {
  product: {
    id: string
    name: string
    price: number
    color: string
    image: string
  }
}

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-4 mb-8">
     

      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 border rounded-lg"
        >
          -
        </button>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="w-16 h-10 border rounded-lg text-center"
        />

        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 border rounded-lg"
        >
          +
        </button>
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full"
      >
        {added ? '✓ Added to Cart' : 'Add to Cart'}
      </Button>

       <Button
        variant="outline"
        onClick={() => router.back()}
        className="w-full"
      >
        ← Back
      </Button>
    </div>
  )
}