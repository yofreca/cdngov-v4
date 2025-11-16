import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { useAuth } from '@context/AuthContext'
import { Button } from '@components/common/Button'

export interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Componente SideMenu - Menú lateral deslizante
 * Siguiendo el diseño del sitio SARA
 * - Se abre desde el botón "☰ Menú" del Header
 * - Overlay oscuro con cierre al hacer clic
 * - Transiciones suaves
 * - Soporte para autenticación
 * - Accesible (WCAG 2.1 AA)
 */
export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuth()

  // Links públicos
  const publicLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/componentes', label: 'Componentes' },
    { path: '/react-19', label: 'React 19' },
    { path: '/formulario', label: 'Formulario' },
  ]

  // Links para usuarios autenticados
  const authenticatedLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/componentes', label: 'Componentes' },
    { path: '/react-19', label: 'React 19' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/formulario', label: 'Formulario' },
  ]

  const links = isAuthenticated ? authenticatedLinks : publicLinks

  const isActive = (path: string) => location.pathname === path

  // Cerrar menú al presionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Cerrar menú al navegar
  const handleLinkClick = () => {
    onClose()
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay/Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto"
        style={{
          animation: isOpen ? 'slideIn 0.3s ease-out' : 'slideOut 0.3s ease-out',
        }}
      >
        {/* Header del menú */}
        <div
          className="sticky top-0 flex items-center justify-between px-6 py-4 border-b"
          style={{
            backgroundColor: 'var(--color-govco-azul-oscuro)',
            borderColor: 'var(--color-govco-gris-claro)',
          }}
        >
          <h2 className="text-lg font-semibold text-white">Menú</h2>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Cerrar menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navegación */}
        <nav className="py-4" aria-label="Menú principal">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={clsx(
                    'block px-6 py-3 text-base font-medium transition-colors',
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                  style={
                    isActive(link.path)
                      ? { backgroundColor: 'var(--color-govco-marino)' }
                      : undefined
                  }
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sección de autenticación */}
        <div
          className="border-t px-6 py-4"
          style={{ borderColor: 'var(--color-govco-gris-claro)' }}
        >
          {isAuthenticated ? (
            <div>
              <div className="mb-4">
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-govco-gris)' }}
                >
                  Hola, {user?.name}
                </p>
                {user?.email && (
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full"
              >
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={handleLinkClick}>
              <Button variant="primary" size="sm" className="w-full">
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Estilos de animación inline (usando CSS existente) */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  )
}
