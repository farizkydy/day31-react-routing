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
