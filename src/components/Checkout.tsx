import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { calculateTotals, MIN_CHECKOUT, formatPrice } from '../utils/cart'
import { emptyShipping, validateShipping } from '../schemas/shipping'
import type { Shipping, ShippingErrors } from '../schemas/shipping'
import { OrderSummary } from './OrderSummary'
import { ShippingForm } from './ShippingForm'

const steps = ['Cart Review', 'Shipping', 'Payment Summary']

export function Checkout({ onExit }: { onExit: () => void }) {
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const { subtotal } = calculateTotals(items)

  const [step, setStep] = useState(0)
  const [shipping, setShipping] = useState<Shipping>(emptyShipping)
  const [errors, setErrors] = useState<ShippingErrors>({})
  const [placed, setPlaced] = useState(false)

  const cartValid = items.length > 0 && subtotal >= MIN_CHECKOUT

  const handleChange = (name: keyof Shipping, value: string) => {
    setShipping((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const next = () => {
    if (step === 0 && cartValid) {
      setStep(1)
    } else if (step === 1) {
      const result = validateShipping(shipping)
      setErrors(result)
      if (Object.keys(result).length === 0) setStep(2)
    }
  }

  const placeOrder = () => {
    clearCart()
    setPlaced(true)
  }

  if (placed) {
    return (
      <div className="alert alert-success">
        <h2 className="h5">Order placed successfully!</h2>
        <p className="mb-3">Thank you, {shipping.fullName}. A confirmation will be sent to {shipping.email}.</p>
        <button className="btn btn-primary" onClick={onExit}>Back to shop</button>
      </div>
    )
  }

  return (
    <div>
      <ol className="d-flex gap-3 list-unstyled mb-4">
        {steps.map((label, i) => (
          <li key={label} className={i === step ? 'fw-bold text-primary' : 'text-muted'}>
            {i + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <>
          <OrderSummary />
          {!cartValid && (
            <div className="alert alert-warning mt-3 py-2 small">
              {items.length === 0
                ? 'Your cart is empty.'
                : `Minimum checkout is ${formatPrice(MIN_CHECKOUT)}.`}
            </div>
          )}
        </>
      )}

      {step === 1 && (
        <ShippingForm values={shipping} errors={errors} onChange={handleChange} />
      )}

      {step === 2 && (
        <div>
          <h2 className="h6">Shipping details</h2>
          <p className="mb-3">
            {shipping.fullName}<br />
            {shipping.email} · {shipping.phone}<br />
            {shipping.address}, {shipping.city} {shipping.postalCode}
          </p>
          <h2 className="h6">Items</h2>
          <OrderSummary />
        </div>
      )}

      <div className="d-flex gap-2 mt-4">
        {step === 0 && (
          <button className="btn btn-outline-secondary" onClick={onExit}>Back to shop</button>
        )}
        {step > 0 && (
          <button className="btn btn-outline-secondary" onClick={() => setStep(step - 1)}>Back</button>
        )}
        {step < 2 && (
          <button className="btn btn-primary" onClick={next} disabled={step === 0 && !cartValid}>
            Next
          </button>
        )}
        {step === 2 && (
          <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
        )}
      </div>
    </div>
  )
}