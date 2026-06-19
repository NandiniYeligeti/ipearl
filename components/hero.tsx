'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Soap3D } from './soap-3d'
import { colors } from '@/lib/products'

export function Hero() {
  const [currentColor, setCurrentColor] = useState('rose')
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: 'Luxe Soap',
      subtitle: 'Premium Organic Skincare',
      description: 'Handcrafted soaps made with natural ingredients',
    },
    {
      title: 'Pure Ingredients',
      subtitle: 'Nature&apos;s Best',
      description: 'Chemical-free, eco-friendly formulations',
    },
    {
      title: 'Self-Care Ritual',
      subtitle: 'Elevate Your Routine',
      description: 'Transform your daily shower into a luxury experience',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  return (
  <section
    className="w-full overflow-hidden"
    style={{
      background:
        'linear-gradient(135deg, #B7DADB 0%, #AAD0D1 50%, #9FC8CA 100%)',
    }}
  >
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1"
        >
          {/* Hero Text */}
          <div className="min-h-40 md:min-h-48 flex flex-col justify-start gap-4">
            <motion.div
              key={`slide-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/20 backdrop-blur-sm p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-slate-700 font-semibold mt-2">
                {heroSlides[currentSlide].subtitle}
              </p>

              <p className="text-sm md:text-base lg:text-lg text-slate-600 mt-4">
                {heroSlides[currentSlide].description}
              </p>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="flex gap-2">
            {heroSlides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-slate-700 w-8'
                    : 'bg-white/50 w-2'
                }`}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>

          {/* Color Selector */}
          <div className="bg-white/20 backdrop-blur-sm p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl">
            <p className="text-xs md:text-sm font-semibold text-slate-700 uppercase tracking-widest mb-3 md:mb-4">
              Choose Your Color
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              {colors.map((color) => (
                <motion.button
                  key={color.id}
                  onClick={() => setCurrentColor(color.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-2 transition-all ${
                    currentColor === color.id
                      ? 'opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg ring-2 transition-all ${
                      currentColor === color.id
                        ? 'ring-slate-700 ring-offset-2'
                        : 'ring-transparent'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />

                  <span className="text-xs font-medium text-slate-700">
                    {color.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - 3D Soap */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center order-1 lg:order-2"
        >
          <Soap3D
            color={currentColor}
            engravedText={heroSlides[currentSlide].title}
          />
        </motion.div>
      </div>
    </div>
  </section>
)
}