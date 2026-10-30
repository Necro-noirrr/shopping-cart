import { useProducts } from './hooks/useProducts'
import { ProductList } from './components/ProductList'

export default function App() {
  const { data, isLoading, error } = useProducts()

  return (
    <div className="container py-4">
      <h1 className="h3 mb-3">Shop</h1>
      {isLoading && <div className="spinner-border" role="status" />}
      {error && (
        <div className="alert alert-danger">
          Could not load products: {error.message}
        </div>
      )}
      {data && (data.length === 0 ? <p>No products available.</p> : <ProductList products={data} />)}
    </div>
  )
}