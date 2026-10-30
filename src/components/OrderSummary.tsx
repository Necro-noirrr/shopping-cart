import { useCartStore } from '../store/cartStore'
import { calculateTotals, formatPrice } from '../utils/cart'

export function OrderSummary() {
  const items = useCartStore((s) => s.items)
  const { subtotal, tax, discount, total } = calculateTotals(items)

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
          <span>{item.title} × {item.quantity}</span>
          <span>{formatPrice(item.price * item.quantity)}</span>
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
    </div>
  )
}