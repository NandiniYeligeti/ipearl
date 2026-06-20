export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  color: string
  colorName: string
  image: string
  ingredients: string[]
  scent: string
  benefits: string[]
}

export const products: Product[] = [
  {
    id: 'soap-charcoal',
    name: 'Charcoal Detox',
    description: 'Deep cleansing charcoal soap for clear skin',
    price: 90,
    originalPrice: 120,
    color: 'charcoal',
    colorName: 'Charcoal',
    image: '/charcoal.jpeg',
    ingredients: ['Activated Charcoal', 'Tea Tree Oil', 'Coconut Oil'],
    scent: 'Fresh & Clean',
    benefits: ['Deep cleansing', 'Detoxifying', 'Acne control'],
  },
  {
    id: 'soap-haldichandan',
    name: 'Haldi Chandan',
    description: 'Traditional turmeric and sandalwood soap for glowing skin',
    price: 90,
    originalPrice: 120,
    color: 'yellow',
    colorName: 'Golden Yellow',
    image: '/haldichandan.jpeg',
    ingredients: ['Turmeric', 'Sandalwood', 'Coconut Oil', 'Glycerin'],
    scent: 'Earthy & Herbal',
    benefits: ['Skin brightening', 'Anti-inflammatory', 'Traditional healing'],
  },
  {
    id: 'soap-ricemulethi',
    name: 'Rice Mulethi',
    description: 'Rice and licorice soap for skin brightening',
    price: 90,
    originalPrice: 120,
    color: 'cream',
    colorName: 'Cream',
    image: '/ricemulethi.jpeg',
    ingredients: ['Rice Powder', 'Licorice Extract', 'Coconut Oil', 'Shea Butter'],
    scent: 'Subtle & Sweet',
    benefits: ['Brightening', 'Exfoliating', 'Skin smoothing'],
  },
  {
    id: 'soap-riceniacinamide',
    name: 'Rice Niacinamide',
    description: 'Rice and niacinamide soap for flawless skin',
    price: 90,
    originalPrice: 120,
    color: 'white',
    colorName: 'Pure White',
    image: '/riceniacinamide.jpeg',
    ingredients: ['Rice Extract', 'Niacinamide', 'Vitamin E', 'Coconut Oil'],
    scent: 'Light & Fresh',
    benefits: ['Pore minimizing', 'Brightening', 'Anti-aging'],
  },
  {
    id: 'soap-oatsalovera',
    name: 'Oats Aloe Vera',
    description: 'Soothing oats and aloe vera soap for sensitive skin',
    price: 90,
    originalPrice: 120,
    color: 'green',
    colorName: 'Soft Green',
    image: '/oatsalovera.jpeg',
    ingredients: ['Oatmeal', 'Aloe Vera', 'Honey', 'Coconut Oil'],
    scent: 'Fresh & Soothing',
    benefits: ['Soothing', 'Moisturizing', 'Gentle exfoliation'],
  },
    {
  id: 'soap-rosehibiscus',
  name: 'Rose Hibiscus',
  description: 'Gentle rose and hibiscus soap for soft, radiant skin',
  price: 90,
  originalPrice: 120,
  color: 'red',
  colorName: 'Rose Pink',
  image: '/rosehibiscus.jpeg',
  ingredients: ['Rose Petals', 'Hibiscus Extract', 'Coconut Oil', 'Shea Butter'],
  scent: 'Floral & Refreshing',
  benefits: ['Hydrating', 'Brightening', 'Softening']
},
{
  id: 'soap-ubtan',
  name: 'Ubtan',
  description: 'Traditional ubtan soap for bright, glowing skin',
  price: 90,
  originalPrice: 120,
  color: 'yellow',
  colorName: 'Golden Yellow',
  image: '/ubtan.jpeg',
  ingredients: ['Turmeric', 'Sandalwood', 'Gram Flour', 'Rose Water'],
  scent: 'Warm & Earthy',
  benefits: ['Brightening', 'Exfoliating', 'Tan Removal']
}
]

export const colors = [
  { id: 'rose', name: 'Rose', hex: '#d4a5a5' },
  { id: 'lavender', name: 'Lavender', hex: '#d1c4e9' },
  { id: 'mint', name: 'Mint', hex: '#c8e6c9' },
  { id: 'peach', name: 'Peach', hex: '#f0c4b8' },
  { id: 'honey', name: 'Honey', hex: '#ffe0b2' },
  { id: 'coral', name: 'Coral', hex: '#ff9999' },
]
