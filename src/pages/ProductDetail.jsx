import { useParams } from 'react-router-dom'
import { products } from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  if (!product) return <p>Produk tidak ditemukan</p>
  return <h1>{product.name}</h1>
}
