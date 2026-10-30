import type { Product } from '../schemas/product'
import { useProductFilters } from '../hooks/useProductFilters'
import { ProductCard } from './ProductCard'

export function ProductList({ products }: { products: Product[] }) {
  const f = useProductFilters(products)

  return (
    <>
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            placeholder="Search title"
            value={f.search}
            onChange={e => f.setSearch(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={f.category}
            onChange={e => f.setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {f.categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Max price"
            value={f.maxPrice}
            onChange={e => f.setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-2">
          <button className="btn btn-outline-secondary w-100" onClick={f.clear}>
            Clear
          </button>
        </div>
      </div>

      {f.filtered.length === 0 ? (
        <p>No products match your search.</p>
      ) : (
        <div className="row g-3">
          {f.filtered.map(p => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}