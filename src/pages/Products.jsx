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
