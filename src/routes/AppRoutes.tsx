import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@components/layout/MainLayout'
import { Home } from '@pages/Home'
import { ComponentsDemo } from '@pages/ComponentsDemo'
import { FormExample } from '@pages/FormExample'
import { NotFound } from '@pages/NotFound'
import { ProtectedRoute } from './ProtectedRoute'

/**
 * Configuración de rutas de la aplicación
 * Usa React Router 7 con Routes y Route components
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas con layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/componentes" element={<ComponentsDemo />} />
        <Route path="/formulario" element={<FormExample />} />

        {/* Ruta protegida de ejemplo */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="container-govco py-12">
                <h1>Dashboard (Ruta Protegida)</h1>
                <p>Esta es una ruta protegida que requiere autenticación.</p>
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
