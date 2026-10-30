import { useMemo, useState } from 'react'
import type { Product } from '../schemas/product'

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(
    () => [...new Set(products.map(p => p.category))],
    [products]
  )

  const filtered = useMemo(
    () =>
      products.filter(
        p =>
          p.title.toLowerCase().includes(search.toLowerCase()) &&
          (category === '' || p.category === category) &&
          (maxPrice === '' || p.price <= Number(maxPrice))
      ),
    [products, search, category, maxPrice]
  )

  const clear = () => {
    setSearch('')
    setCategory('')
    setMaxPrice('')
  }

  return { search, setSearch, category, setCategory, maxPrice, setMaxPrice, categories, filtered, clear }
}