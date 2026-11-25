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
