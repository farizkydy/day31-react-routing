# Step 2: Route Dinamis (URL Params)

Branch: `step-2-route-params` · Sebelumnya: [Step 1](step-1-routing.md) · Berikutnya: [Step 3](step-3-layout.md)

## Tujuan
Satu route untuk banyak produk: `/products/1`, `/products/2`, `/products/3`, tanpa membuat route satu per satu.

## Konsep
| Istilah | Fungsi |
|---|---|
| `:id` di `path` | Bagian URL yang nilainya bisa berubah (parameter). |
| `useParams()` | Hook untuk membaca parameter dari URL, contoh `{ id: '2' }`. |

Nilai dari `useParams` **selalu string**. Karena `id` di data produk berupa number, ubah dulu dengan `Number(id)` sebelum dibandingkan.

## Langkah

### 1. Buat `src/pages/ProductDetail.jsx`
```jsx
import { useParams } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  if (!product) return <p>Produk tidak ditemukan</p>
  return <h1>{product.name}</h1>
}
```

### 2. Daftarkan route di `src/App.jsx`
Tambahkan import dan satu `Route`:
```jsx
import ProductDetail from './pages/ProductDetail'
// ...
<Route path="/products" element={<Products />} />
<Route path="/products/:id" element={<ProductDetail />} />
```

### 3. Jadikan nama produk sebagai link di `src/pages/Products.jsx`
```jsx
import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Products() {
  return (
    <>
      <h1>Produk</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
```
Perhatikan tanda backtick (`` ` ``) untuk template string.

## Cek Hasil
- [ ] Di halaman Produk, klik "Sepatu Lari" dan URL menjadi `/products/1` dengan judul "Sepatu Lari".
- [ ] Buka `/products/999` dan muncul "Produk tidak ditemukan".
- [ ] Buka `/products/abc` dan muncul "Produk tidak ditemukan" (bukan error).

## Kesalahan Umum
- **Selalu "Produk tidak ditemukan"**: lupa `Number(id)`, jadi `1 === '1'` bernilai `false`.
- **Nama param beda**: `path="/products/:productId"` harus dibaca dengan `const { productId } = useParams()`.
