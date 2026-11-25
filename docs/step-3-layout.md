# Step 3: Nested Route dan Layout

Branch: `step-3-layout` · Sebelumnya: [Step 2](step-2-route-params.md) · Berikutnya: [Step 4](step-4-auth-context.md)

## Tujuan
Navbar ditulis **sekali** di komponen `Layout`, lalu dipakai semua halaman lewat nested route. Menu yang sedang aktif diberi tanda.

## Konsep
| Istilah | Fungsi |
|---|---|
| Nested route | `Route` di dalam `Route`. Route induk merender "bingkai", route anak mengisi bagian tengahnya. |
| `<Outlet />` | Tempat route anak dirender di dalam komponen induk. |
| `NavLink` | Seperti `Link`, tapi otomatis memberi class `active` jika URL cocok. |
| `end` | Membuat `NavLink` hanya aktif jika URL **persis** sama. Tanpa `end`, link `/` aktif di semua halaman. |
| `index` | Route anak untuk path induk itu sendiri (`/`). |

## Langkah

### 1. Buat `src/components/Layout.jsx`
```jsx
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/products">Produk</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
```
Style `nav a.active` sudah ada di `src/index.css`.

### 2. Ubah `src/App.jsx` menjadi nested route
`<nav>` dan `<main>` dihapus dari `App`, karena sudah dipindah ke `Layout`:
```jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```
Path anak ditulis **relatif**: `products`, bukan `/products`.

## Cek Hasil
- [ ] Navbar tampil di semua halaman, termasuk halaman 404.
- [ ] Menu yang sedang dibuka tebal dan bergaris bawah.
- [ ] Di `/products/1`, menu "Produk" tetap aktif, sedangkan "Beranda" tidak.

## Kesalahan Umum
- **Halaman anak tidak muncul, hanya navbar**: lupa menaruh `<Outlet />` di `Layout`.
- **"Beranda" selalu aktif**: lupa atribut `end` pada `NavLink to="/"`.
