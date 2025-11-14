import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@components/layout/MainLayout'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'
import { LoadingSpinner } from '@components/common/LoadingSpinner'

// Lazy loading de páginas para mejorar performance
const Home = lazy(() => import('@pages/Home').then((module) => ({ default: module.Home })))
const ComponentsDemo = lazy(() =>
  import('@pages/ComponentsDemo').then((module) => ({ default: module.ComponentsDemo }))
)
const FormExample = lazy(() =>
  import('@pages/FormExample').then((module) => ({ default: module.FormExample }))
)
const Login = lazy(() => import('@pages/Login').then((module) => ({ default: module.Login })))
const Register = lazy(() =>
  import('@pages/Register').then((module) => ({ default: module.Register }))
)
const ForgotPassword = lazy(() =>
  import('@pages/ForgotPassword').then((module) => ({ default: module.ForgotPassword }))
)
const Dashboard = lazy(() =>
  import('@pages/Dashboard').then((module) => ({ default: module.Dashboard }))
)
const NotFound = lazy(() =>
  import('@pages/NotFound').then((module) => ({ default: module.NotFound }))
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
        {/* Rutas de autenticación (sin layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />

        {/* Rutas públicas con layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/componentes" element={<ComponentsDemo />} />

          {/* Formulario - ahora puede ser público o protegido según necesidad */}
          <Route path="/formulario" element={<FormExample />} />

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
