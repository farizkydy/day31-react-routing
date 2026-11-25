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
