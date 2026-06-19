export interface Product {
  id: string
  name: string
  description: string
  price: number
  color: string
  colorName: string
  image: string
  ingredients: string[]
  scent: string
  benefits: string[]
}

export const products: Product[] = [
  {
    id: 'soap-rose',
    name: 'Rose Petal Luxury',
    description: 'Gentle rose-infused soap with shea butter and glycerin',
    price: 599,
    color: 'rose',
    colorName: 'Soft Rose',
    image: '/soaps/rose.jpg',
    ingredients: ['Rose Oil', 'Shea Butter', 'Glycerin', 'Coconut Oil'],
    scent: 'Fresh Rose',
    benefits: ['Anti-aging', 'Moisturizing', 'Skin softening'],
  },
  {
    id: 'soap-lavender',
    name: 'Lavender Dreams',
    description: 'Calming lavender soap perfect for relaxation',
    price: 649,
    color: 'lavender',
    colorName: 'Soothing Lavender',
    image: '/soaps/lavender.jpg',
    ingredients: ['Lavender Essential Oil', 'Aloe Vera', 'Olive Oil', 'Beeswax'],
    scent: 'Calming Lavender',
    benefits: ['Stress relief', 'Skin soothing', 'Anti-inflammatory'],
  },
  {
    id: 'soap-mint',
    name: 'Fresh Mint Refresh',
    description: 'Invigorating mint soap with eucalyptus oil',
    price: 549,
    color: 'mint',
    colorName: 'Fresh Mint',
    image: '/soaps/mint.jpg',
    ingredients: ['Peppermint Oil', 'Eucalyptus Oil', 'Tea Tree Oil', 'Coconut Oil'],
    scent: 'Fresh Mint',
    benefits: ['Energizing', 'Cleansing', 'Cooling sensation'],
  },
  {
    id: 'soap-peach',
    name: 'Peachy Glow',
    description: 'Silky peach soap enriched with vitamin E',
    price: 579,
    color: 'peach',
    colorName: 'Warm Peach',
    image: '/soaps/peach.jpg',
    ingredients: ['Peach Extract', 'Vitamin E', 'Shea Butter', 'Almond Oil'],
    scent: 'Sweet Peach',
    benefits: ['Brightening', 'Nourishing', 'Gentle exfoliation'],
  },
  {
    id: 'soap-honey',
    name: 'Golden Honey',
    description: 'Nourishing honey soap with oatmeal for gentle exfoliation',
    price: 599,
    color: 'honey',
    colorName: 'Golden Honey',
    image: '/soaps/honey.jpg',
    ingredients: ['Raw Honey', 'Oatmeal', 'Argan Oil', 'Jojoba Oil'],
    scent: 'Warm Honey',
    benefits: ['Deep moisturizing', 'Gentle exfoliating', 'Skin healing'],
  },
  {
    id: 'soap-coral',
    name: 'Coral Sunset',
    description: 'Tropical blend with papaya and turmeric',
    price: 629,
    color: 'coral',
    colorName: 'Vibrant Coral',
    image: '/soaps/coral.jpg',
    ingredients: ['Papaya Extract', 'Turmeric', 'Coconut Oil', 'Sweet Orange Oil'],
    scent: 'Tropical Fruit',
    benefits: ['Brightening', 'Antioxidant', 'Natural glow'],
  },
]

export const colors = [
  { id: 'rose', name: 'Rose', hex: '#d4a5a5' },
  { id: 'lavender', name: 'Lavender', hex: '#d1c4e9' },
  { id: 'mint', name: 'Mint', hex: '#c8e6c9' },
  { id: 'peach', name: 'Peach', hex: '#f0c4b8' },
  { id: 'honey', name: 'Honey', hex: '#ffe0b2' },
  { id: 'coral', name: 'Coral', hex: '#ff9999' },
]
