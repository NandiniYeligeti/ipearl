'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function About() {
  const values = [
    {
      id: 1,
      title: 'Natural Ingredients',
      description:
        'We source only the finest organic ingredients from sustainable farms. Every bar is crafted with botanicals, essential oils, and natural butters that nourish your skin.',
      icon: '🌿',
    },
    {
      id: 2,
      title: 'Handcrafted Care',
      description:
        'Each soap is carefully handmade in small batches. We blend traditional soap-making techniques with modern luxury to create bars that are gentle yet effective.',
      icon: '✨',
    },
    {
      id: 3,
      title: 'Sustainable Luxury',
      description:
        'We are committed to eco-friendly practices. Our packaging is 100% recyclable, and we give back to environmental causes with every purchase you make.',
      icon: '🌍',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #B7DADB 0%, #AAD0D1 50%, #9FC8CA 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Our Story
          </h2>

          <p className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed px-2">
            ipearls Soap was born from a passion for combining nature&apos;s purity
            with luxurious self-care. We believe that skincare should be both
            effective and indulgent, without compromising on sustainability.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {values.map((value) => (
            <motion.div
              key={value.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-white/30"
            >
              <div className="text-4xl md:text-5xl mb-4">
                {value.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                {value.title}
              </h3>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
        >
          {/* Stats */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-white/30">
            <div className="space-y-6 md:space-y-8">
              <div className="border-l-4 border-slate-700 pl-4 md:pl-6">
                <div className="text-3xl md:text-4xl font-bold text-slate-800">
                  100%
                </div>
                <p className="text-slate-700 text-base md:text-lg mt-2">
                  Natural & Organic 
                </p>
              </div>

              <div className="border-l-4 border-slate-700 pl-4 md:pl-6">
                <div className="text-3xl md:text-4xl font-bold text-slate-800">
                  Handmade
                </div>
                <p className="text-slate-700 text-base md:text-lg mt-2">
                  Crafted in Small Batches with Love
                </p>
              </div>

              <div className="border-l-4 border-slate-700 pl-4 md:pl-6">
                <div className="text-3xl md:text-4xl font-bold text-slate-800">
                  Eco-Friendly
                </div>
                <p className="text-slate-700 text-base md:text-lg mt-2">
                  Sustainable Practices & Packaging
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-white/30">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-6">
              Why Choose ipearls Soap?
            </h3>

            <div className="space-y-4 md:space-y-5">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-3 h-3 rounded-full bg-slate-700 mt-2 flex-shrink-0" />
                <p className="text-sm md:text-base text-slate-700">
                  Premium quality soaps that transform your daily routine into
                  a luxurious ritual.
                </p>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-3 h-3 rounded-full bg-slate-700 mt-2 flex-shrink-0" />
                <p className="text-sm md:text-base text-slate-700">
                  Carefully selected botanicals and essential oils for maximum
                  skincare benefits.
                </p>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-3 h-3 rounded-full bg-slate-700 mt-2 flex-shrink-0" />
                <p className="text-sm md:text-base text-slate-700">
                  Gentle on sensitive skin, made without harsh chemicals or
                  artificial fragrances.
                </p>
              </div>

              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-3 h-3 rounded-full bg-slate-700 mt-2 flex-shrink-0" />
                <p className="text-sm md:text-base text-slate-700">
                  Supporting sustainable practices and environmental
                  conservation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}