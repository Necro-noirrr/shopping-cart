import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  address: z.string().trim().min(1, 'Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
})

export type Shipping = z.infer<typeof shippingSchema>
export type ShippingErrors = Partial<Record<keyof Shipping, string>>

export const emptyShipping: Shipping = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export function validateShipping(data: Shipping): ShippingErrors {
  const result = shippingSchema.safeParse(data)
  if (result.success) return {}
  const errors: ShippingErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof Shipping
    if (!errors[key]) errors[key] = issue.message
  }
  return errors
}