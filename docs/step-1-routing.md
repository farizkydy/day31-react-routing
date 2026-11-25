# Step 1: Routing Dasar

Branch: `step-1-routing` · Mulai dari: `starter` · Berikutnya: [Step 2](step-2-route-params.md)

## Tujuan
Aplikasi punya beberapa halaman dengan URL berbeda (`/`, `/products`), dan pindah halaman **tanpa reload browser**.

## Konsep
| Istilah | Fungsi |
|---|---|
| `BrowserRouter` | Membuat aplikasi "sadar URL". Dipasang sekali di paling luar. |
| `Routes` | Wadah semua `Route`. Hanya merender satu route yang cocok dengan URL. |
| `Route` | Pasangan `path` (URL) dan `element` (komponen yang ditampilkan). |
| `Link` | Pengganti `<a href>`. Mengubah URL tanpa reload halaman. |
| `path="*"` | Menangkap semua URL yang tidak cocok, dipakai untuk halaman 404. |

## Langkah

### 1. Install React Router
```bash
npm install react-router-dom@6
```
Pastikan `package.json` berisi `"react-router-dom": "^6.x.x"`.

### 2. Pasang `BrowserRouter` di `src/main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

### 3. Buat route di `src/App.jsx`
Ganti isi `App.jsx` yang sebelumnya menampilkan semua halaman sekaligus:
```jsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Beranda</Link>
        <Link to="/products">Produk</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}
```
`src/pages/NotFound.jsx` sudah tersedia dari starter.

## Cek Hasil
```bash
npm run dev
```
- [ ] Klik "Beranda" dan "Produk": isi halaman berganti, URL berubah, browser **tidak** reload (ikon refresh tidak berputar).
- [ ] Buka `http://localhost:5173/asal-asalan` dan muncul "404 - Halaman tidak ditemukan".
- [ ] Tombol Back/Forward browser berfungsi.

## Kesalahan Umum
- **`useRoutes() may be used only in the context of a <Router>`**: `BrowserRouter` belum dipasang di `main.jsx`.
- **Halaman reload saat diklik**: masih memakai `<a href="...">`, ganti dengan `<Link to="...">`.
- **Versi beda**: `npm install react-router-dom` tanpa `@6` akan memasang v7. Materi ini memakai v6.
