import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/**
 * Layout principal de la aplicación
 * Incluye Navbar, contenido dinámico (Outlet) y Footer
 * Usado como wrapper para todas las rutas
 */
export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-govco-gris-muy-claro)' }}>
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer
        links={[
          { label: 'Términos y Condiciones', href: '#' },
          { label: 'Política de Privacidad', href: '#' },
          { label: 'Mapa del Sitio', href: '#' },
          { label: 'Contacto', href: '#' },
        ]}
      />
    </div>
  )
}
