// Simulasi API: data dummy + delay supaya efek caching terlihat.
import { products as seed } from './data/products'

let products = [...seed]
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function fetchProducts() {
  console.log('fetchProducts dipanggil')
  await wait(1000)
  return [...products]
}

export async function fetchProductById(id) {
  console.log('fetchProductById dipanggil', id)
  await wait(1000)
  // null (bukan undefined) karena TanStack Query v5 menolak data undefined
  return products.find((p) => p.id === Number(id)) ?? null
}

export async function createProduct(data) {
  await wait(500)
  const p = { id: products.length + 1, ...data }
  products = [...products, p]
  return p
}
