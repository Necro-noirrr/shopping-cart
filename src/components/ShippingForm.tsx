import type { Shipping, ShippingErrors } from '../schemas/shipping'

type Props = {
  values: Shipping
  errors: ShippingErrors
  onChange: (name: keyof Shipping, value: string) => void
}

const fields: { name: keyof Shipping; label: string; type?: string }[] = [
  { name: 'fullName', label: 'Full name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  { name: 'address', label: 'Address' },
  { name: 'city', label: 'City' },
  { name: 'postalCode', label: 'Postal code' },
]

export function ShippingForm({ values, errors, onChange }: Props) {
  return (
    <div className="row g-3">
      {fields.map((f) => (
        <div key={f.name} className="col-12 col-md-6">
          <label className="form-label" htmlFor={f.name}>{f.label}</label>
          <input
            id={f.name}
            type={f.type ?? 'text'}
            className={`form-control ${errors[f.name] ? 'is-invalid' : ''}`}
            value={values[f.name]}
            onChange={(e) => onChange(f.name, e.target.value)}
          />
          {errors[f.name] && <div className="invalid-feedback">{errors[f.name]}</div>}
        </div>
      ))}
    </div>
  )
}