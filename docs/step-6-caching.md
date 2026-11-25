# Step 6: Caching dengan TanStack Query

Branch: `step-6-caching` · Sebelumnya: [Step 5](step-5-protected-route.md) · Selanjutnya: Study Case (lihat `README.md`)

## Tujuan
Data produk diambil dari "server" (`src/api.js`, delay 1 detik). Saat pindah halaman lalu kembali ke Produk, data **langsung tampil dari cache** tanpa loading dan tanpa request ulang.

## Konsep
| Istilah | Fungsi |
|---|---|
| `QueryClient` | Tempat penyimpanan cache semua query. |
| `QueryClientProvider` | Membagikan `QueryClient` ke seluruh aplikasi (mirip Context Provider). |
| `useQuery` | Mengambil data dan menyimpan hasilnya di cache. |
| `queryKey` | "Nama" cache, contohnya `['products']`. Key sama = cache sama. |
| `queryFn` | Fungsi async yang benar-benar mengambil data. |
| `staleTime` | Berapa lama data dianggap masih segar. Selama segar, tidak ada request ulang. |
| `isPending` | `true` saat belum ada data sama sekali (pertama kali). |

## Langkah

### 1. Install TanStack Query
```bash
npm install @tanstack/react-query
```

### 2. Pasang `QueryClientProvider` di `src/main.jsx`
```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
```
`queryClient` dibuat **di luar** komponen supaya tidak dibuat ulang setiap render.

### 3. Pakai `useQuery` di `src/pages/Products.jsx`
Data sekarang diambil dari `fetchProducts` di `src/api.js`, bukan lagi import langsung dari `data/products`:
```jsx
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api'

export default function Products() {
  const { data, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 60 * 1000,
  })
  if (isPending) return <p>Memuat...</p>
  return (
    <>
      <h1>Produk</h1>
      <ul>
        {data.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
```

## Cek Hasil
Buka DevTools > Console.
- [ ] Buka Produk: tampil "Memuat..." sekitar 1 detik dan Console mencetak `fetchProducts dipanggil`.
- [ ] Pindah ke Beranda, lalu kembali ke Produk (dalam 60 detik): daftar langsung tampil, **tidak ada** log baru.
- [ ] Tunggu lebih dari 60 detik lalu kembali ke Produk: data langsung tampil dari cache, lalu diambil ulang di belakang layar (muncul log baru tanpa "Memuat...").

## Kesalahan Umum
- **`No QueryClient set, use QueryClientProvider to set one`**: `QueryClientProvider` belum dipasang.
- **`Cannot read properties of undefined (reading 'map')`**: lupa cek `isPending` sebelum memakai `data`.
- **Tetap loading tiap kembali ke halaman**: `staleTime` tidak diisi (default 0), atau `queryClient` dibuat di dalam komponen.

## Selesai
Hasil step ini sama dengan branch `live-coding-selesai`. Lanjut ke Study Case di `README.md`.
