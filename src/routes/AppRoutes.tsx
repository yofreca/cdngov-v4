import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@components/layout/MainLayout'
import { Home } from '@pages/Home'
import { ComponentsDemo } from '@pages/ComponentsDemo'
import { FormExample } from '@pages/FormExample'
import { Login } from '@pages/Login'
import { Register } from '@pages/Register'
import { ForgotPassword } from '@pages/ForgotPassword'
import { NotFound } from '@pages/NotFound'
import { ProtectedRoute } from '@components/auth/ProtectedRoute'

/**
 * Configuración de rutas de la aplicación - Actualizado Fase 6
 * Usa React Router 7 con Routes y Route components
 * Incluye rutas de autenticación y protección de rutas privadas
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
              <div className="container-govco py-12">
                <h1
                  className="text-3xl font-bold mb-6"
                  style={{ color: 'var(--color-govco-azul-oscuro)' }}
                >
                  Dashboard
                </h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-700 mb-4">
                    Bienvenido a su dashboard personal. Esta es una ruta
                    protegida que requiere autenticación.
                  </p>
                  <p className="text-sm text-gray-500">
                    Solo los usuarios autenticados pueden ver este contenido.
                  </p>
                </div>
              </div>
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
