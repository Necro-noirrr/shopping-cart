import { useCartStore, MIN_QTY, MAX_QTY } from '../store/cartStore'
import { calculateTotals, formatPrice, MIN_CHECKOUT } from '../utils/cart'

export function Cart({ onCheckout }: { onCheckout: () => void }) { // CHANGED: prop added
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const increase = useCartStore((s) => s.increase)
  const decrease = useCartStore((s) => s.decrease)
  const clearCart = useCartStore((s) => s.clearCart)

  const { subtotal, tax, discount, total } = calculateTotals(items)
  const belowMin = subtotal < MIN_CHECKOUT

  if (items.length === 0) {
    return <p className="text-muted">Your cart is empty.</p>
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="d-flex align-items-center gap-2 border-bottom py-2">
          <img src={item.thumbnail} alt={item.title} width={48} height={48} />
          <div className="flex-grow-1">
            <div className="small fw-semibold">{item.title}</div>
            <div className="small text-muted">{formatPrice(item.price)} each</div>
            <div className="d-flex align-items-center gap-2 mt-1">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => decrease(item.id)}
                disabled={item.quantity <= MIN_QTY}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => increase(item.id)}
                disabled={item.quantity >= MAX_QTY}
              >
                +
              </button>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="fw-semibold">{formatPrice(item.price * item.quantity)}</div>
        </div>
      ))}

      <div className="mt-3">
        <div className="d-flex justify-content-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="d-flex justify-content-between"><span>Tax (5%)</span><span>{formatPrice(tax)}</span></div>
        <div className="d-flex justify-content-between"><span>Discount</span><span>-{formatPrice(discount)}</span></div>
        <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
          <span>Total</span><span>{formatPrice(total)}</span>
        </div>
      </div>

      {belowMin && (
        <div className="alert alert-warning mt-3 py-2 small">
          Minimum checkout is {formatPrice(MIN_CHECKOUT)}. Add more items to continue.
        </div>
      )}

      {/* CHANGED: onClick={onCheckout} added */}
      <button className="btn btn-success w-100 mt-2" disabled={belowMin} onClick={onCheckout}>
        Checkout
      </button>
      <button className="btn btn-outline-danger w-100 mt-2" onClick={clearCart}>
        Clear cart
      </button>
    </div>
  )
}