'use client'

import { useState } from 'react'

export default function ProductGallery({
  images,
}: {
  images: string[]
}) {
  const [current, setCurrent] = useState(0)

  return (
    <div>
      <img
        src={images[current]}
        alt=""
        className="w-full rounded-2xl object-contain bg-white"
      />

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 justify-center">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
            >
              <img
                src={img}
                alt=""
                className={`w-20 h-20 rounded-lg object-cover border-2 ${
                  current === index
                    ? 'border-primary'
                    : 'border-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}