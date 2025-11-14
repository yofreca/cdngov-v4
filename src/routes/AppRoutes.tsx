import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@components/layout/MainLayout'
import { Home } from '@pages/Home'
import { ComponentsDemo } from '@pages/ComponentsDemo'
import { FormExample } from '@pages/FormExample'
import { Login } from '@pages/Login'
import { Register } from '@pages/Register'
import { ForgotPassword } from '@pages/ForgotPassword'
import { Dashboard } from '@pages/Dashboard'
import { NotFound } from '@pages/NotFound'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'

/**
 * Configuración de rutas de la aplicación - Actualizado Fase 7
 * Usa React Router 7 con Routes y Route components
 * Incluye rutas de autenticación, protección de rutas privadas y Dashboard
 */
export function AppRoutes() {
  return (
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
  )
}
