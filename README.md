# Day 31 - React Routing (Hands-on)

Fullstack / Frontend Web Developer Batch 13 · dibimbing.id · Mentor: Fariz

Project toko online "Langkah Baru" untuk belajar React Router dan caching (TanStack Query).

## Prasyarat
- Node.js 20 atau lebih baru
- VS Code

## Menjalankan
```bash
npm install
npm run dev
```
Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

## Versi yang dipakai
`react-router-dom` v6 (`BrowserRouter`, `Routes`, `Route`) dan `@tanstack/react-query` v5. Install versi yang sama dengan mentor:
```bash
npm install react-router-dom@6
npm install @tanstack/react-query
```

## Branch
| Branch | Isi | Kapan dipakai |
|---|---|---|
| `starter` | Project awal: data produk, `api.js`, halaman Home dan Products. Belum ada router. | Mulai live coding dari sini |
| `live-coding-selesai` | Hasil live coding: routing, nested layout, ProtectedRoute, AuthContext, dan caching di halaman Produk. | Kalau tertinggal, pindah ke sini sebelum Study Case |
| `solusi` | Kunci jawaban Study Case 1 dan 2. | Dibuka mentor setelah study case selesai |

Pindah branch: `git checkout live-coding-selesai`. Simpan atau commit pekerjaanmu dulu supaya tidak hilang.

## Study Case
**Study Case 1: Fitur Akun Pelanggan**
1. `/category/:slug` menampilkan produk per kategori. Slug tidak dikenal menampilkan "Kategori tidak ditemukan".
2. `/account` dengan sub-menu Profil (index) dan Pesanan (`/account/orders`), memakai nested route dan `Outlet`.
3. `/account` hanya untuk yang sudah login (role apa saja). Setelah login, kembali ke halaman tujuan awal.

Stretch: `/account/orders/:orderId` untuk detail pesanan.

**Study Case 2: Halaman Produk yang Lambat**
1. Halaman Produk memakai `useQuery` (`staleTime` 60 detik): pindah halaman lalu kembali tidak loading lagi.
2. `ProductDetail` memakai `useQuery` dengan `queryKey: ['product', id]`.
3. Tombol "Tambah Produk" di halaman Admin memakai `useMutation` dan `invalidateQueries`.

Stretch: ubah `staleTime` jadi 5 detik dan amati kapan data diambil ulang.

Tips: buka Console. `api.js` mencetak `fetchProducts dipanggil` setiap data benar-benar diminta ke "server".

## Login simulasi
Login hanya dua tombol ("Masuk sebagai Pembeli / Admin"). Form dan autentikasi sungguhan dibahas di Day 33. Status login disimpan di `localStorage` (key `user`) dan hanya untuk simulasi. Pengecekan keamanan sebenarnya harus dilakukan di server.

## Assignment
Latihan mandiri "Portal Nilai Siswa" (opsional): lihat Assignment Guidance dari mentor.
