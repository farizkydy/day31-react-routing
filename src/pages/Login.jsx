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
