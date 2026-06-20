
'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

export function CheckoutForm() {
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const [error, setError] = useState('')

  const totalPrice = getTotalPrice()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setError('Please fill in all fields')
      return
    }

    if (items.length === 0) {
      setError('Your cart is empty')
      return
    }

    sendWhatsAppMessage('919323626985', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    })
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-background"
      >
        <div className="text-center space-y-6">
          <div className="text-6xl">🛒</div>

          <h1 className="text-3xl font-bold text-foreground">
            Your cart is empty
          </h1>

          <p className="text-muted-foreground max-w-md mx-auto">
            Add some soaps to your cart to proceed with checkout
          </p>

          <Link href="/">
            <Button>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 md:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
                Checkout
              </h1>

              <form
                onSubmit={handleWhatsAppOrder}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">
                    Delivery Details
                  </h2>

                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border rounded-lg"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="w-full px-4 py-3 border rounded-lg"
                        required
                      />

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 border rounded-lg"
                        required
                      />
                    </div>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      rows={3}
                      className="w-full px-4 py-3 border rounded-lg"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border rounded-lg"
                        required
                      />

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        className="w-full px-4 py-3 border rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-4 border border-red-500 text-red-500 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 md:py-6 text-base md:text-lg"
                >
                  💬 Place Order via WhatsApp
                </Button>

                <Link href="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 sticky top-8">
              <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <div>
                      <p className="font-medium text-sm md:text-base">
                        {item.name}
                      </p>

                      <p className="text-xs md:text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm md:text-base">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
