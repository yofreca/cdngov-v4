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
 * Componente Header siguiendo el diseno Gov.co/ARN
 */
export function Header({
  title = 'Sistema de Apoyo para la Reincorporacion (SARA)',
  entityName = 'Agencia para la Reincorporacion y la Normalizacion - ARN',
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
        className="py-2 bg-govco-azul-oscuro"
      >
        <div className="container-govco">
          <div className="d-flex align-items-center justify-content-between">
            <a
              href="https://www.gov.co/"
              target="_blank"
              rel="noopener noreferrer"
              title="GOV.CO"
              className="d-flex align-items-center"
            >
              <img
                src={headerGovcoImg}
                alt="GOV.CO"
                className="img-fluid"
                style={{ height: '2rem' }}
              />
            </a>
            {showMenu && (
              <button
                onClick={() => setShowSideMenu(true)}
                className="d-md-none btn btn-outline-light btn-sm"
                title="Menu"
                aria-label="Abrir menu principal"
              >
                <span className="me-2">&#9776;</span>
                Menu
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banner Principal con Logo y Titulo */}
      <div
        role="banner"
        className="bg-white py-4 d-none d-md-block border-bottom"
      >
        <div className="container-govco">
          <div className="d-flex align-items-center gap-4">
            <div className="flex-shrink-0" style={{ width: '12rem' }}>
              <a href="/" className="d-block">
                <img
                  src={logoArnImg}
                  alt="Agencia para la Reincorporacion y la Normalizacion - ARN"
                  className="img-fluid"
                />
              </a>
            </div>
            <div className="flex-grow-1">
              <h1
                className="h3 fw-semibold mb-0 text-govco-azul-oscuro"
                title={title}
              >
                {title}
              </h1>
              {entityName && (
                <p className="small text-muted mt-1 mb-0">{entityName}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegacion con Usuario e Idioma */}
      <div
        role="navigation"
        className="py-2 border-bottom bg-light"
      >
        <div className="container-govco">
          <div className="d-flex align-items-center justify-content-between">
            {showMenu && (
              <button
                onClick={() => setShowSideMenu(true)}
                className="d-none d-md-inline-flex btn btn-link text-secondary text-decoration-none"
                aria-label="Mostrar menu"
              >
                <span className="me-2">&#9776;</span>
                Menu
              </button>
            )}

            <div className="d-flex align-items-center gap-3 ms-auto">
              {/* Dropdown Usuario */}
              <div className="dropdown">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="btn btn-link text-secondary text-decoration-none dropdown-toggle"
                  aria-expanded={showUserMenu}
                  title="Bienvenido"
                >
                  <span className="me-2">&#128100;</span>
                  Bienvenido
                </button>
                {showUserMenu && (
                  <div className="dropdown-menu show position-absolute end-0" role="menu">
                    <a href="/login" className="dropdown-item" role="menuitem">
                      <span className="me-2">&#128273;</span>
                      Iniciar sesion
                    </a>
                    <a href="/recuperar-password" className="dropdown-item" role="menuitem">
                      <span className="me-2">&#128274;</span>
                      Ha perdido su contrasena?
                    </a>
                  </div>
                )}
              </div>

              {/* Dropdown Idioma */}
              <div className="dropdown">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="btn btn-link text-secondary text-decoration-none dropdown-toggle"
                  aria-expanded={showLangMenu}
                  title="Idioma"
                >
                  <span className="me-2">&#127760;</span>
                  <span className="d-none d-md-inline">Idioma</span>
                </button>
                {showLangMenu && (
                  <div className="dropdown-menu show position-absolute end-0" role="menu">
                    <a href="/es" className="dropdown-item" role="menuitem">
                      Espanol
                    </a>
                    <a href="/en" className="dropdown-item" role="menuitem">
                      English
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu lateral */}
      <SideMenu isOpen={showSideMenu} onClose={() => setShowSideMenu(false)} />
    </header>
  )
}
