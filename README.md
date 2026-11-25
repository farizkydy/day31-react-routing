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
Setiap sub materi punya branch sendiri. Branch berurutan: tiap step dibangun di atas step sebelumnya.

| Branch | Isi | Kapan dipakai |
|---|---|---|
| `starter` | Project awal: data produk, `api.js`, halaman Home dan Products. Belum ada router. | Mulai live coding dari sini |
| `step-1-routing` | `BrowserRouter`, `Routes`, `Route`, `Link`, halaman 404. | Tertinggal di Step 1 |
| `step-2-route-params` | Route dinamis `/products/:id` dengan `useParams`. | Tertinggal di Step 2 |
| `step-3-layout` | Nested route, `Layout` dengan `NavLink` dan `Outlet`. | Tertinggal di Step 3 |
| `step-4-auth-context` | `AuthContext` (login/logout simulasi) dan halaman Login. | Tertinggal di Step 4 |
| `step-5-protected-route` | `ProtectedRoute`, halaman Admin, kembali ke halaman tujuan setelah login. | Tertinggal di Step 5 |
| `step-6-caching` | TanStack Query: `useQuery` + `staleTime` di halaman Produk. | Tertinggal di Step 6 |
| `live-coding-selesai` | Hasil akhir live coding (sama dengan `step-6-caching`). | Kalau tertinggal, pindah ke sini sebelum Study Case |
| `solusi` | Kunci jawaban Study Case 1 dan 2. | Dibuka mentor setelah study case selesai |

Pindah branch: `git checkout step-3-layout` (ganti dengan branch yang diinginkan). Simpan atau commit pekerjaanmu dulu supaya tidak hilang:
```bash
git add . && git commit -m "pekerjaanku"   # atau: git stash
git checkout step-3-layout
npm install   # wajib setelah pindah ke step 1 atau step 6 (ada package baru)
```

Lihat perubahan satu step: `git diff step-2-route-params step-3-layout`.

## Langkah Live Coding

### Step 1: Routing dasar (`step-1-routing`)
Tujuan: pindah halaman tanpa reload browser.

1. Install router:
   ```bash
   npm install react-router-dom@6
   ```
2. `src/main.jsx`: bungkus `<App />` dengan `BrowserRouter`.
   ```jsx
   import { BrowserRouter } from 'react-router-dom'
   // ...
   <BrowserRouter>
     <App />
   </BrowserRouter>
   ```
3. `src/App.jsx`: ganti tampilan "semua halaman sekaligus" dengan `Routes`. Pakai `Link` (bukan `<a href>`) supaya tidak reload.
   ```jsx
   <nav>
     <Link to="/">Beranda</Link>
     <Link to="/products">Produk</Link>
   </nav>
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/products" element={<Products />} />
     <Route path="*" element={<NotFound />} />
   </Routes>
   ```

Coba: klik menu (halaman tidak reload), buka `/asal-asalan` untuk melihat 404.

### Step 2: Route dinamis (`step-2-route-params`)
Tujuan: satu route untuk banyak produk, `/products/1`, `/products/2`, dst.

1. Buat `src/pages/ProductDetail.jsx`, ambil `id` dari URL dengan `useParams`:
   ```jsx
   const { id } = useParams()
   const product = products.find((p) => p.id === Number(id))
   if (!product) return <p>Produk tidak ditemukan</p>
   ```
   Ingat: nilai dari URL selalu string, jadi diubah dengan `Number(id)`.
2. `src/App.jsx`: tambah `<Route path="/products/:id" element={<ProductDetail />} />`.
3. `src/pages/Products.jsx`: tiap nama produk jadi `<Link to={`/products/${p.id}`}>`.

Coba: klik produk, lalu buka `/products/999`.

### Step 3: Nested route dan Layout (`step-3-layout`)
Tujuan: navbar ditulis sekali, dipakai semua halaman.

1. Buat `src/components/Layout.jsx` berisi `<nav>` dengan `NavLink` dan `<Outlet />` sebagai tempat halaman anak muncul.
   ```jsx
   <nav>
     <NavLink to="/" end>Beranda</NavLink>
     <NavLink to="/products">Produk</NavLink>
   </nav>
   <main>
     <Outlet />
   </main>
   ```
   `NavLink` otomatis memberi class `active` pada menu yang sedang dibuka. `end` membuat Beranda hanya aktif di `/` persis.
2. `src/App.jsx`: hapus `<nav>`, bungkus semua route dengan `<Route element={<Layout />}>`. Path anak ditulis relatif (`products`, bukan `/products`), dan Home memakai `index`.

Coba: pindah halaman dan lihat menu aktif berubah warna.

### Step 4: AuthContext (`step-4-auth-context`)
Tujuan: status login bisa dibaca dari komponen mana pun tanpa prop drilling.

1. Buat `src/context/AuthContext.jsx`: `AuthProvider` menyimpan `user` di state (awalnya dibaca dari `localStorage`), plus fungsi `login(role)` dan `logout()`. Export hook `useAuth()`.
2. `src/main.jsx`: bungkus `<App />` dengan `<AuthProvider>` (di dalam `BrowserRouter`).
3. Buat `src/pages/Login.jsx` dengan dua tombol "Masuk sebagai Pembeli/Admin". Setelah `login(role)`, pindah ke beranda dengan `navigate('/')` dari `useNavigate`.
4. `src/App.jsx`: tambah route `login`.
5. `src/components/Layout.jsx`: pakai `useAuth()`. Jika sudah login tampilkan "Halo, nama" dan tombol Logout, jika belum tampilkan link Login.

Coba: login, refresh browser (status tetap), lalu logout.

### Step 5: ProtectedRoute (`step-5-protected-route`)
Tujuan: halaman Admin hanya untuk admin. Yang belum login diarahkan ke Login, lalu dikembalikan ke halaman tujuan.

1. Buat `src/components/ProtectedRoute.jsx`:
   ```jsx
   if (!user) return <Navigate to="/login" replace state={{ from: location }} />
   if (allowedRole && user.role !== allowedRole) return <Navigate to="/" replace />
   return <Outlet />
   ```
2. Buat `src/pages/Admin.jsx`.
3. `src/App.jsx`: route admin dibungkus ProtectedRoute.
   ```jsx
   <Route element={<ProtectedRoute allowedRole="admin" />}>
     <Route path="admin" element={<Admin />} />
   </Route>
   ```
4. `src/pages/Login.jsx`: baca halaman asal dari `location.state?.from?.pathname || '/'` dan `navigate(from, { replace: true })`.
5. `src/components/Layout.jsx`: tampilkan link Admin hanya jika `user?.role === 'admin'`.

Coba: logout, buka `/admin` (diarahkan ke Login), masuk sebagai Admin (kembali ke `/admin`). Masuk sebagai Pembeli lalu buka `/admin` (diarahkan ke beranda).

### Step 6: Caching dengan TanStack Query (`step-6-caching`)
Tujuan: data produk tidak diambil ulang setiap kali kembali ke halaman Produk.

1. Install:
   ```bash
   npm install @tanstack/react-query
   ```
2. `src/main.jsx`: buat `const queryClient = new QueryClient()` dan bungkus aplikasi dengan `<QueryClientProvider client={queryClient}>`.
3. `src/pages/Products.jsx`: ambil data dari `fetchProducts` (`src/api.js`) memakai `useQuery`.
   ```jsx
   const { data, isPending } = useQuery({
     queryKey: ['products'],
     queryFn: fetchProducts,
     staleTime: 60 * 1000,
   })
   if (isPending) return <p>Memuat...</p>
   ```

Coba: buka Console, buka Produk (muncul `fetchProducts dipanggil` dan "Memuat..."), pindah ke Beranda lalu kembali ke Produk dalam 60 detik: data langsung tampil tanpa log baru.

Selesai. Hasilnya sama dengan branch `live-coding-selesai`, lanjut ke Study Case.

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
