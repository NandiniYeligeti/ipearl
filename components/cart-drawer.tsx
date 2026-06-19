'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const getTotalItems = useCartStore((state) => state.getTotalItems)

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  return (
    <>
      {/* Cart Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-primary/90 transition-colors z-40"
      >
        🛒
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-destructive text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
          >
            {totalItems}
          </motion.div>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/30 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="border-b border-border p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-foreground hover:text-muted-foreground transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <div className="text-6xl">🛍️</div>
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground">Add some soaps to get started!</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-background rounded-lg p-4 border border-border"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:bg-destructive/10 rounded-lg p-2 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="w-7 h-7 rounded bg-secondary text-foreground hover:bg-primary transition-colors flex items-center justify-center text-sm"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded bg-secondary text-foreground hover:bg-primary transition-colors flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="font-bold text-primary text-2xl">₹{totalPrice}</span>
                  </div>
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      sendWhatsAppMessage('8928197398', {
                        name: 'Customer',
                        email: 'customer@example.com',
                        phone: '',
                        address: 'Not provided yet',
                        city: 'Not provided yet',
                        pincode: 'Not provided yet',
                        items: items.map((item) => ({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          quantity: item.quantity,
                        })),
                        total: totalPrice,
                      })
                      setIsOpen(false)
                    }}
                    className="w-full bg-green-500 text-white hover:bg-green-600 py-6 text-lg font-semibold transition-colors"
                  >
                    💬 Order via WhatsApp
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
