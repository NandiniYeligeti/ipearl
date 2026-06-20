'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #B7DADB 0%, #AAD0D1 50%, #9FC8CA 100%)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <img
          src="/second.png"
          alt="Hero Image"
          className="w-full h-auto block"
        />
      </motion.div>
    </section>
  )
}