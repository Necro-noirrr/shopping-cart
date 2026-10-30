import { useQuery } from '@tanstack/react-query'
import { productsResponseSchema } from '../schemas/product'

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=30')
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  return productsResponseSchema.parse(data).products
}

export function useProducts() {
  return useQuery({ queryKey: ['products'], queryFn: fetchProducts })
}