import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { AccessibilityBar } from './AccessibilityBar'
import { ScrollToTop } from './ScrollToTop'
import { SkipLinks } from './SkipLinks'

/**
 * Layout principal de la aplicacion
 * Incluye Header GOV.CO/ARN, contenido dinamico (Outlet) y Footer
 * Con barra de accesibilidad, skip links y boton scroll to top
 */
export function MainLayout() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Skip Links para navegacion por teclado (WCAG 2.1 AA) */}
      <SkipLinks />

      {/* Header completo con banners GOV.CO y ARN */}
      <Header />

      {/* Contenido principal */}
      <main id="main-content" className="flex-grow-1 pb-5" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer completo con informacion de ARN */}
      <Footer />

      {/* Barra de accesibilidad (lateral derecho) */}
      <AccessibilityBar />

      {/* Boton volver arriba */}
      <ScrollToTop />
    </div>
  )
}
