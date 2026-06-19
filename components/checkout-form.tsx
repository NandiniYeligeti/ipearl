'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { sendWhatsAppMessage } from '@/lib/whatsapp'

declare global {
  interface Window {
    Razorpay: any
  }
}

export function CheckoutForm() {
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const clearCart = useCartStore((state) => state.clearCart)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const totalPrice = getTotalPrice()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate form
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

    // Send WhatsApp message
    sendWhatsAppMessage('8928197398', {
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setError('Please fill all fields')
      return
    }

    if (items.length === 0) {
      setError('Your cart is empty')
      return
    }

    setIsLoading(true)

    try {
      // Create order from backend
      const orderResponse = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          description: `Order for ${items.map((i) => i.name).join(', ')}`,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const order = await orderResponse.json()

      // Load Razorpay script
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Luxe Soap',
          description: 'Premium Organic Soaps',
          order_id: order.id,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#d4a5a5',
          },
          handler: async (response: any) => {
            try {
              // Payment successful
              console.log('Payment successful:', response)
              alert(
                `Payment successful! Payment ID: ${response.razorpay_payment_id}`
              )
              clearCart()
              // Redirect to success page or home
              window.location.href = '/'
            } catch (err) {
              console.error('Error processing payment:', err)
              setError('Payment processing failed')
            }
          },
          modal: {
            ondismiss: () => {
              setIsLoading(false)
              setError('Payment cancelled')
            },
          },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      }

      document.body.appendChild(script)
    } catch (err) {
      console.error('Payment error:', err)
      setError(
        err instanceof Error ? err.message : 'Payment failed. Please try again.'
      )
      setIsLoading(false)
    }
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
          <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Add some soaps to your cart to proceed with checkout
          </p>
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Delivery Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        placeholder="Street address"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          PIN Code
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="000000"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Payment Buttons */}
                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : `Pay ₹${totalPrice}`}
                  </Button>

                  <Button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white hover:bg-green-600 py-6 text-lg font-semibold transition-colors"
                  >
                    💬 Order via WhatsApp
                  </Button>
                </div>

                <Link href="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-secondary"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-foreground">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-foreground text-sm">
                  <span>Shipping:</span>
                  <span className="text-accent font-semibold">Free</span>
                </div>
              </div>

              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-foreground">Total:</span>
                  <span className="text-primary">₹{totalPrice}</span>
                </div>
              </div>

              {/* Payment Methods Info */}
              <div className="mt-6 p-4 bg-secondary/30 rounded-lg space-y-2">
                <p className="text-sm font-semibold text-foreground">Accepted Payment Methods:</p>
                <div className="flex gap-2 text-2xl">
                  <span>💳</span>
                  <span>📱</span>
                  <span>🏦</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Credit/Debit Card, UPI, Google Pay, Apple Pay, and more
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
