import { useProducts } from './hooks/useProducts'
import { ProductList } from './components/ProductList'
import { Cart } from './components/Cart'
import { useCartStore } from './store/cartStore'

export default function App() {
  const { data, isLoading, error } = useProducts()
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  )

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Shop</h1>
        <span className="badge text-bg-primary">Cart: {itemCount}</span>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          {isLoading && <div className="spinner-border" role="status" />}
          {error && (
            <div className="alert alert-danger">
              Could not load products: {error.message}
            </div>
          )}
          {data &&
            (data.length === 0 ? (
              <p>No products available.</p>
            ) : (
              <ProductList products={data} />
            ))}
        </div>

        <div className="col-12 col-lg-4">
          <h2 className="h5">Your Cart</h2>
          <Cart />
        </div>
      </div>
    </div>
  )
}