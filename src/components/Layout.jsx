import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()
  return (
    <>
      <nav>
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/products">Produk</NavLink>
        {user?.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
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
