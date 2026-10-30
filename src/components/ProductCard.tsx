import type { Product } from '../schemas/product'
import { useCartStore } from '../store/cartStore'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="card h-100">
      <img src={product.thumbnail} alt={product.title} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <small className="text-muted">{product.category}</small>
        <div className="mt-2">${product.price} · ⭐ {product.rating}</div>
        <button className="btn btn-primary mt-auto" onClick={() => addItem(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}