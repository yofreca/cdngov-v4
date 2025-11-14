import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { clsx } from 'clsx'
import { useAuth } from '@context/AuthContext'
import { Button } from '@components/common/Button'

/**
 * Componente Navbar con navegación responsive
 * - Mobile menu hamburguesa
 * - Links activos destacados
 * - Botón de logout para usuarios autenticados
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuth()

  // Links públicos
  const publicLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/componentes', label: 'Componentes' },
    { path: '/formulario', label: 'Formulario' },
  ]

  // Links para usuarios autenticados
  const authenticatedLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/componentes', label: 'Componentes' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/formulario', label: 'Formulario' },
  ]

  const links = isAuthenticated ? authenticatedLinks : publicLinks

  const isActive = (path: string) => location.pathname === path

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav
      id="main-navigation"
      style={{ backgroundColor: 'var(--color-govco-marino)' }}
      className="relative"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="container-govco">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-white font-semibold text-xl hover:opacity-90 transition-opacity"
            aria-label="Ir a inicio"
          >
            Gov.co
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'text-white px-3 py-2 rounded-md text-sm font-medium transition-all',
                  isActive(link.path)
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                )}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth Actions */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                <span className="text-white text-sm">
                  Hola, {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="!border-white !text-white hover:!bg-white hover:!text-govco-marino"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4 !border-white !text-white hover:!bg-white"
                  style={{ color: 'white' }}
                >
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            aria-expanded={isMenuOpen}
            aria-label="Abrir menú de navegación"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium text-white transition-all',
                  isActive(link.path)
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                )}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Actions */}
            {isAuthenticated ? (
              <div className="pt-4 pb-3 border-t border-white/20">
                <div className="px-3 mb-3">
                  <p className="text-sm font-medium text-white">
                    Hola, {user?.name}
                  </p>
                  <p className="text-xs text-white/70">{user?.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="mx-3 !border-white !text-white hover:!bg-white hover:!text-govco-marino"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-3 !border-white !text-white hover:!bg-white"
                  style={{ color: 'white' }}
                >
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
