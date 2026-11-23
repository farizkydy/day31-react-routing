import { products } from '../data/products'

export default function Products() {
  return (
    <>
      <h1>Produk</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  )
}
