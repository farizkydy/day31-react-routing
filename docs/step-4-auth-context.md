# Step 4: AuthContext (Login Simulasi)

Branch: `step-4-auth-context` · Sebelumnya: [Step 3](step-3-layout.md) · Berikutnya: [Step 5](step-5-protected-route.md)

## Tujuan
Status login (`user`) bisa dibaca dan diubah dari komponen mana pun (Layout, Login, dan nanti ProtectedRoute) **tanpa prop drilling**.

## Konsep
| Istilah | Fungsi |
|---|---|
| `createContext` | Membuat "saluran" data global. |
| `AuthProvider` | Komponen yang menyimpan state `user` dan membagikannya lewat `Context.Provider`. |
| `useAuth()` | Custom hook singkatan dari `useContext(AuthContext)`. |
| `localStorage` | Menyimpan user supaya tetap login setelah browser di-refresh. |
| `useNavigate()` | Pindah halaman lewat kode, contohnya setelah tombol login diklik. |

Login di sini **simulasi**: tidak ada password dan pengecekan keamanan dilakukan di server. Autentikasi sungguhan dibahas di Day 33.

## Langkah

### 1. Buat `src/context/AuthContext.jsx`
```jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  const login = (role) => {
    const u = { name: role === 'admin' ? 'Admin Toko' : 'Pembeli', role }
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
```

### 2. Pasang `AuthProvider` di `src/main.jsx`
Taruh di **dalam** `BrowserRouter`:
```jsx
import { AuthProvider } from './context/AuthContext'
// ...
<BrowserRouter>
  <AuthProvider>
    <App />
  </AuthProvider>
</BrowserRouter>
```

### 3. Buat `src/pages/Login.jsx`
```jsx
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (role) => {
    login(role)
    navigate('/')
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

### 4. Daftarkan route di `src/App.jsx`
```jsx
import Login from './pages/Login'
// ... di dalam <Route element={<Layout />}>
<Route path="login" element={<Login />} />
```

### 5. Tampilkan status login di `src/components/Layout.jsx`
```jsx
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()
  return (
    <>
      <nav>
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/products">Produk</NavLink>
        {user ? (
          <>
            <span>Halo, {user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}
```

## Cek Hasil
- [ ] Klik Login, lalu "Masuk sebagai Pembeli": diarahkan ke Beranda dan navbar menampilkan "Halo, Pembeli" + tombol Logout.
- [ ] Refresh browser: masih login. Cek DevTools > Application > Local Storage, ada key `user`.
- [ ] Klik Logout: link Login muncul lagi dan key `user` hilang.

## Kesalahan Umum
- **`Cannot destructure property 'user' of useAuth(...) as it is null`**: `AuthProvider` belum dipasang di `main.jsx`.
- **Logout sendiri setelah refresh**: `useState` tidak membaca `localStorage`, atau `login` lupa memanggil `localStorage.setItem`.
- **Salah tulis key**: `localStorage.getItem('user')` dan `setItem('user', ...)` harus memakai key yang sama.
