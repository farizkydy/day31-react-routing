# Step 5: ProtectedRoute

Branch: `step-5-protected-route` · Sebelumnya: [Step 4](step-4-auth-context.md) · Berikutnya: [Step 6](step-6-caching.md)

## Tujuan
- Halaman `/admin` hanya bisa dibuka oleh user dengan role `admin`.
- User yang belum login diarahkan ke Login, lalu **dikembalikan ke halaman tujuan awal** setelah login.
- User yang sudah login tapi role-nya salah diarahkan ke Beranda.

## Konsep
| Istilah | Fungsi |
|---|---|
| `<Navigate to="..." />` | Redirect saat render (versi komponen dari `navigate()`). |
| `replace` | Mengganti entri history, jadi tombol Back tidak kembali ke halaman yang ditolak. |
| `state={{ from: location }}` | Membawa info "tadinya mau ke mana" ke halaman Login. |
| `useLocation()` | Membaca URL saat ini dan `state` yang dikirim. |
| Layout route tanpa `path` | `ProtectedRoute` membungkus route anak dan merender `<Outlet />` jika lolos. |

## Langkah

### 1. Buat `src/components/ProtectedRoute.jsx`
```jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Tanpa allowedRole: cukup login. Dengan allowedRole: role harus sama.
export default function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
```

### 2. Buat `src/pages/Admin.jsx`
```jsx
export default function Admin() {
  return <h1>Admin</h1>
}
```

### 3. Bungkus route admin di `src/App.jsx`
```jsx
import ProtectedRoute from './components/ProtectedRoute'
import Admin from './pages/Admin'
// ... di dalam <Route element={<Layout />}>
<Route path="login" element={<Login />} />

<Route element={<ProtectedRoute allowedRole="admin" />}>
  <Route path="admin" element={<Admin />} />
</Route>

<Route path="*" element={<NotFound />} />
```

### 4. Kembali ke halaman tujuan di `src/pages/Login.jsx`
```jsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleLogin = (role) => {
    login(role)
    navigate(from, { replace: true })
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => handleLogin('buyer')}>Masuk sebagai Pembeli</button>
      <button onClick={() => handleLogin('admin')}>Masuk sebagai Admin</button>
    </>
  )
}
```

### 5. Tampilkan menu Admin khusus admin di `src/components/Layout.jsx`
Tambahkan setelah NavLink Produk:
```jsx
{user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
```

## Cek Hasil
- [ ] Logout, lalu buka `/admin` langsung di address bar: diarahkan ke `/login`.
- [ ] Klik "Masuk sebagai Admin": kembali ke `/admin` (bukan Beranda), dan menu Admin muncul.
- [ ] Logout, login sebagai Pembeli, lalu buka `/admin`: diarahkan ke Beranda dan menu Admin tidak tampil.
- [ ] Setelah diarahkan, tombol Back tidak terjebak bolak-balik ke halaman yang ditolak.

## Kesalahan Umum
- **Setelah login selalu ke Beranda**: `state={{ from: location }}` lupa dikirim di `Navigate`, atau Login masih memakai `navigate('/')`.
- **Halaman Admin kosong**: `ProtectedRoute` lupa me-return `<Outlet />`.
- **Menyembunyikan menu ≠ melindungi halaman**: menu Admin disembunyikan tetapi URL `/admin` tetap bisa diketik, makanya perlu `ProtectedRoute`. Di aplikasi nyata, server juga wajib mengecek.
