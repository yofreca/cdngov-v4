/**
 * ProtectedRoute - Componente para proteger rutas privadas - Fase 6
 * - Redirige al login si el usuario no está autenticado
 * - Muestra loading mientras se verifica la sesión
 * - Guarda la ruta origen para redirección después del login
 * - Accesible y con manejo de errores
 */

import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

export interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

/**
 * Componente que protege rutas que requieren autenticación
 *
 * Uso:
 * ```tsx
 * <Route
 *   path="/dashboard"
 *   element={
 *     <ProtectedRoute>
 *       <Dashboard />
 *     </ProtectedRoute>
 *   }
 * />
 * ```
 *
 * Con rol requerido:
 * ```tsx
 * <ProtectedRoute requiredRole="admin">
 *   <AdminPanel />
 * </ProtectedRoute>
 * ```
 */
export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center">
          <div
            className="inline-block animate-spin text-6xl mb-4"
            aria-hidden="true"
          >
            ⏳
          </div>
          <p className="text-lg text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    // Guardar la ruta actual para redireccionar después del login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar rol si es requerido
  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        role="alert"
      >
        <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-md">
          <div className="text-6xl mb-4" aria-hidden="true">
            🚫
          </div>
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: 'var(--color-govco-rojo)' }}
          >
            Acceso Denegado
          </h2>
          <p className="text-gray-600 mb-6">
            No tiene permisos para acceder a esta página.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Rol requerido: <strong>{requiredRole}</strong>
            <br />
            Su rol: <strong>{user?.role || 'ninguno'}</strong>
          </p>
          <button
            onClick={() => window.history.back()}
            className="text-sm hover:underline"
            style={{ color: 'var(--color-govco-marino)' }}
          >
            ← Volver atrás
          </button>
        </div>
      </div>
    )
  }

  // Usuario autenticado con rol correcto, mostrar contenido
  return <>{children}</>
}
