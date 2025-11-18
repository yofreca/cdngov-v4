import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui'
import { Card, CardContent } from '@shared/components/ui'

/**
 * Página 404 - No Encontrada
 * Se muestra cuando el usuario navega a una ruta que no existe
 * Diseño Gov.co con Bootstrap
 */
export function NotFound() {
  return (
    <div className="container-govco py-5">
      <div className="mx-auto" style={{ maxWidth: '42rem' }}>
        <Card variant="elevated">
          <CardContent>
            <div className="text-center py-4">
              {/* Error Code */}
              <div
                className="display-1 fw-bold"
                style={{ color: 'var(--color-govco-marino)' }}
                aria-label="Error 404"
              >
                404
              </div>

              {/* Error Message */}
              <div className="mb-4">
                <h1
                  className="h3 fw-semibold"
                  style={{ color: 'var(--color-govco-gris-oscuro)' }}
                >
                  Página no encontrada
                </h1>
                <p style={{ color: 'var(--color-govco-gris)' }}>
                  Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
              </div>

              {/* Icon */}
              <div className="d-flex justify-content-center mb-4" aria-hidden="true">
                <svg
                  style={{ width: '8rem', height: '8rem', color: 'var(--color-govco-gris-claro)' }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Actions */}
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
                <Link to="/">
                  <Button variant="primary" size="lg">
                    Volver al Inicio
                  </Button>
                </Link>

                <Link to="/componentes">
                  <Button variant="outline" size="lg">
                    Ver Componentes
                  </Button>
                </Link>
              </div>

              {/* Help Text */}
              <p
                className="small"
                style={{ color: 'var(--color-govco-gris)' }}
              >
                Si crees que esto es un error, por favor{' '}
                <Link
                  to="/formulario"
                  className="text-decoration-underline"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  contáctanos
                </Link>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Popular Links */}
        <div className="mt-4">
          <h2
            className="h5 fw-semibold mb-3 text-center"
            style={{ color: 'var(--color-govco-gris-oscuro)' }}
          >
            Enlaces Populares
          </h2>
          <div className="row g-3">
            <div className="col-sm-4">
              <Link
                to="/"
                className="d-block p-3 rounded bg-white text-decoration-none border border-2 border-transparent"
                style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-govco-marino)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <h3
                  className="h6 fw-semibold mb-1"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  Inicio
                </h3>
                <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                  Página principal del proyecto
                </p>
              </Link>
            </div>

            <div className="col-sm-4">
              <Link
                to="/componentes"
                className="d-block p-3 rounded bg-white text-decoration-none border border-2 border-transparent"
                style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-govco-verde)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <h3
                  className="h6 fw-semibold mb-1"
                  style={{ color: 'var(--color-govco-verde)' }}
                >
                  Componentes
                </h3>
                <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                  Catálogo de componentes UI
                </p>
              </Link>
            </div>

            <div className="col-sm-4">
              <Link
                to="/formulario"
                className="d-block p-3 rounded bg-white text-decoration-none border border-2 border-transparent"
                style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-govco-naranja)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <h3
                  className="h6 fw-semibold mb-1"
                  style={{ color: 'var(--color-govco-naranja)' }}
                >
                  Formulario
                </h3>
                <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                  Ejemplo de formulario completo
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
