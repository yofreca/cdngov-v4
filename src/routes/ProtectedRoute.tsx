import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

/**
 * Componente para proteger rutas que requieren autenticación
 * Redirige a Home si el usuario no está autenticado
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Redirigir a home con mensaje
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
