import { useState } from 'react'
import headerGovcoImg from '@assets/images/header_govco.png'
import logoArnImg from '@assets/images/logo-arn.png'
import { SideMenu } from './SideMenu'

export interface HeaderProps {
  title?: string
  entityName?: string
  showMenu?: boolean
}

/**
 * Componente Header siguiendo el diseño Gov.co/ARN
 * - Banner GOV.CO superior
 * - Logo y título de la entidad
 * - Menú hamburguesa responsive
 * - Dropdowns de usuario e idioma
 */
export function Header({
  title = 'Sistema de Apoyo para la Reincorporación (SARA)',
  entityName = 'Agencia para la Reincorporación y la Normalización - ARN',
  showMenu = true,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showSideMenu, setShowSideMenu] = useState(false)

  return (
    <header>
      {/* Banner GOV.CO Superior */}
      <div
        role="banner"
        style={{ backgroundColor: 'var(--color-govco-azul-oscuro)' }}
        className="py-2"
      >
        <div className="container-govco">
          <div className="flex items-center justify-between">
            <a
              href="https://www.gov.co/"
              target="_blank"
              rel="noopener noreferrer"
              title="GOV.CO"
              className="flex items-center"
            >
              <img
                src={headerGovcoImg}
                alt="GOV.CO"
                className="h-6 md:h-8"
              />
            </a>
            {showMenu && (
              <button
                onClick={() => setShowSideMenu(true)}
                className="md:hidden inline-flex items-center px-3 py-1 text-white text-sm border border-white/30 rounded hover:bg-white/10 transition-colors"
                title="Menú"
                aria-label="Abrir menú principal"
              >
                <span className="mr-2">☰</span>
                Menú
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banner Principal con Logo y Título */}
      <div
        role="banner"
        className="bg-white py-4 hidden md:block"
        style={{ borderBottom: '1px solid var(--color-govco-gris-claro)' }}
      >
        <div className="container-govco">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 w-32 md:w-48">
              <a href="/" className="block">
                <img
                  src={logoArnImg}
                  alt="Agencia para la Reincorporación y la Normalización - ARN"
                  className="w-full h-auto"
                />
              </a>
            </div>
            <div className="flex-grow">
              <h1
                className="text-xl md:text-2xl lg:text-3xl font-semibold m-0"
                style={{ color: 'var(--color-govco-azul-oscuro)' }}
                title={title}
              >
                {title}
              </h1>
              {entityName && (
                <p className="text-sm text-gray-600 mt-1">{entityName}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegación con Usuario e Idioma */}
      <div
        role="navigation"
        style={{ backgroundColor: 'var(--color-govco-gris-muy-claro)' }}
        className="py-2 border-b"
      >
        <div className="container-govco">
          <div className="flex items-center justify-between">
            {showMenu && (
              <button
                onClick={() => setShowSideMenu(true)}
                className="hidden md:inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-white/50 rounded transition-colors"
                aria-label="Mostrar menú"
              >
                <span className="mr-2">☰</span>
                Menú
              </button>
            )}

            <div className="flex items-center gap-4 ml-auto">
              {/* Dropdown Usuario */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/50 rounded transition-colors"
                  aria-expanded={showUserMenu}
                  title="Bienvenido"
                >
                  <span className="mr-2">👤</span>
                  Bienvenido
                  <span className="ml-2">▼</span>
                </button>
                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    role="menu"
                  >
                    <a
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <span className="mr-2">🔑</span>
                      Iniciar sesión
                    </a>
                    <a
                      href="/recuperar-password"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <span className="mr-2">🔐</span>
                      ¿Ha perdido su contraseña?
                    </a>
                  </div>
                )}
              </div>

              {/* Dropdown Idioma */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="inline-flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/50 rounded transition-colors"
                  aria-expanded={showLangMenu}
                  title="Idioma"
                >
                  <span className="mr-2">🌐</span>
                  <span className="hidden md:inline">Idioma</span>
                  <span className="ml-2">▼</span>
                </button>
                {showLangMenu && (
                  <div
                    className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                    role="menu"
                  >
                    <a
                      href="/es"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Español
                    </a>
                    <a
                      href="/en"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      English
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú lateral */}
      <SideMenu isOpen={showSideMenu} onClose={() => setShowSideMenu(false)} />
    </header>
  )
}
