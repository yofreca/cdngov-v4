import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { AccessibilityBar } from './AccessibilityBar'
import { ScrollToTop } from './ScrollToTop'

/**
 * Layout principal de la aplicación
 * Incluye Header GOV.CO/ARN, Navbar, contenido dinámico (Outlet) y Footer
 * Con barra de accesibilidad y botón scroll to top
 */
export function MainLayout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-govco-gris-muy-claro)' }}
    >
      {/* Header completo con banners GOV.CO y ARN */}
      <Header />

      {/* Navbar de navegación (opcional, puedes comentar si no lo necesitas) */}
      <Navbar />

      {/* Contenido principal */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer completo con información de ARN */}
      <Footer />

      {/* Barra de accesibilidad (lateral derecho) */}
      <AccessibilityBar />

      {/* Botón volver arriba */}
      <ScrollToTop />
    </div>
  )
}
