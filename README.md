# Shopping Cart App

Responsive shopping cart. Browse products, search/filter, manage cart, 3-step checkout.

## Live demo
 https://necro-shopping-cart.netlify.app

## Technologies
React 19, TypeScript, Vite, Bootstrap, pnpm, Zustand, TanStack Query, Zod

## Setup
    pnpm install
    pnpm dev

## Commands
- `pnpm dev` start dev server
- `pnpm build` production build
- `pnpm preview` preview build

## API
https://dummyjson.com/products

## Features
- Product grid: image, title, category, price, rating
- Loading, error, empty states
- TanStack Query fetch + Zod response validation
- Search by title, filter by category and max price, clear filters (custom hook)
- Cart: add, remove, +/- (min 1, max 5), clear
- Zustand store + persist to localStorage
- Totals: 5% tax, 10% discount over $100, $10 minimum checkout
- Checkout: Cart Review → Shipping (Zod validation) → Payment Summary
- Place Order shows success, clears cart
- Responsive layout

## Known limitations
- No payment gateway
- No product details page
- Price filter is max price only
- No automated tests
- Order not saved anywhere

## Improvements with more time
- Unit tests for totals
- Sorting + skeleton loading
- Product details view