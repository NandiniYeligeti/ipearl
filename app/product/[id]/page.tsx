import { products } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductGallery from './product-gallery'
import ProductActions from './product-actions'

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params

  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Gallery */}
          <ProductGallery
            images={product.images || [product.image]}
          />

          {/* Product Details */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              {product.originalPrice && (
                <p className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </p>
              )}

              <p className="text-3xl font-bold text-primary">
                ₹{product.price}
              </p>
            </div>

            {/* Add to Cart + Back Button */}
            <ProductActions
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                color: product.color,
                image: product.image,
              }}
            />

            <div className="mt-8 mb-6">
              <h2 className="text-xl font-semibold mb-3">
                Ingredients
              </h2>

              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1 rounded-full bg-secondary text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">
                Benefits
              </h2>

              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="px-3 py-1 rounded-full bg-primary/10 text-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Scent
              </h2>

              <p className="text-muted-foreground">
                {product.scent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}