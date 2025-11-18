import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@feature/layout'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { LoadingSpinner } from '@shared/components/ui'

// Lazy loading de páginas para mejorar performance
const Home = lazy(() => import('@feature/home/pages/Home').then((module) => ({ default: module.Home })))
const ComponentsDemo = lazy(() =>
  import('@pages/ComponentsDemo').then((module) => ({ default: module.ComponentsDemo }))
)
const FormExample = lazy(() =>
  import('@pages/FormExample').then((module) => ({ default: module.FormExample }))
)
const Login = lazy(() => import('@feature/auth/pages/Login').then((module) => ({ default: module.Login })))
const Register = lazy(() =>
  import('@feature/auth/pages/Register').then((module) => ({ default: module.Register }))
)
const ForgotPassword = lazy(() =>
  import('@feature/auth/pages/ForgotPassword').then((module) => ({ default: module.ForgotPassword }))
)
const Dashboard = lazy(() =>
  import('@pages/Dashboard').then((module) => ({ default: module.Dashboard }))
)
const NotFound = lazy(() =>
  import('@pages/NotFound').then((module) => ({ default: module.NotFound }))
)
const React19Features = lazy(() =>
  import('@components/examples/React19Features').then((module) => ({
    default: module.React19Features,
  }))
)

/**
 * Configuración de rutas de la aplicación - Optimizado con Lazy Loading
 * Usa React Router 7 con Routes y Route components
 * Incluye lazy loading para mejorar performance y reducir bundle inicial
 * React Suspense para manejar estados de carga
 */
export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner fullScreen message="Cargando página..." />}>
      <Routes>
        {/* Todas las rutas con layout (incluye header y footer) */}
        <Route element={<MainLayout />}>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/componentes" element={<ComponentsDemo />} />
          <Route path="/formulario" element={<FormExample />} />
          <Route path="/react-19" element={<React19Features />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar-contrasena" element={<ForgotPassword />} />

          {/* Rutas protegidas - requieren autenticación */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirigir /home a / */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          {/* 404 - Debe ser la última ruta */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
