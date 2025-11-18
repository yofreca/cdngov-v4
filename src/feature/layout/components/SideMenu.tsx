import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { useAuth } from '@context/AuthContext'
import { Button } from '@shared/components/ui'

export interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Componente SideMenu - Menu lateral deslizante
 */
export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuth()

  const publicLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/componentes', label: 'Componentes' },
    { path: '/react-19', label: 'React 19' },
    { path: '/formulario', label: 'Formulario' },
  ]

  const authenticatedLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/componentes', label: 'Componentes' },
    { path: '/react-19', label: 'React 19' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/formulario', label: 'Formulario' },
  ]

  const links = isAuthenticated ? authenticatedLinks : publicLinks
  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

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
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 1040 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Menu Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegacion"
        className="position-fixed top-0 start-0 h-100 bg-white shadow-lg overflow-auto"
        style={{
          width: '20rem',
          maxWidth: '85vw',
          zIndex: 1050,
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        {/* Header del menu */}
        <div className="sticky-top d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-govco-azul-oscuro">
          <h2 className="h5 mb-0 text-white">Menu</h2>
          <button
            onClick={onClose}
            className="btn btn-link text-white p-2"
            aria-label="Cerrar menu"
          >
            <svg
              width="24"
              height="24"
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

        {/* Navegacion */}
        <nav className="py-3" aria-label="Menu principal">
          <ul className="list-unstyled mb-0">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={handleLinkClick}
                  className={clsx(
                    'd-block px-4 py-3 text-decoration-none fw-medium',
                    isActive(link.path)
                      ? 'text-white bg-primary'
                      : 'text-dark'
                  )}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Seccion de autenticacion */}
        <div className="border-top px-4 py-3">
          {isAuthenticated ? (
            <div>
              <div className="mb-3">
                <p className="small fw-medium text-muted mb-1">
                  Hola, {user?.name}
                </p>
                {user?.email && (
                  <p className="small text-muted mb-0">{user.email}</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                fullWidth
              >
                Cerrar Sesion
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={handleLinkClick}>
              <Button variant="primary" size="sm" fullWidth>
                Iniciar Sesion
              </Button>
            </Link>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  )
}
