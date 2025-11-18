import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui'
import { Card, CardContent } from '@shared/components/ui'

/**
 * Página 404 - No Encontrada
 * Se muestra cuando el usuario navega a una ruta que no existe
 */
export function NotFound() {
  return (
    <div className="container-govco py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated">
          <CardContent>
            <div className="text-center space-y-6 py-8">
              {/* Error Code */}
              <div
                className="text-8xl md:text-9xl font-bold"
                style={{ color: 'var(--color-govco-marino)' }}
                aria-label="Error 404"
              >
                404
              </div>

              {/* Error Message */}
              <div className="space-y-2">
                <h1
                  className="text-2xl md:text-3xl font-semibold"
                  style={{ color: 'var(--color-govco-gris-oscuro)' }}
                >
                  Página no encontrada
                </h1>
                <p
                  className="text-base md:text-lg"
                  style={{ color: 'var(--color-govco-gris)' }}
                >
                  Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
              </div>

              {/* Icon */}
              <div className="flex justify-center" aria-hidden="true">
                <svg
                  className="w-24 h-24 md:w-32 md:h-32"
                  style={{ color: 'var(--color-govco-gris-claro)' }}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
                className="text-sm pt-4"
                style={{ color: 'var(--color-govco-gris)' }}
              >
                Si crees que esto es un error, por favor{' '}
                <Link
                  to="/formulario"
                  className="underline hover:no-underline"
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
        <div className="mt-8">
          <h2
            className="text-lg font-semibold mb-4 text-center"
            style={{ color: 'var(--color-govco-gris-oscuro)' }}
          >
            Enlaces Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/"
              className="block p-4 rounded-lg border-2 border-transparent hover:border-govco-marino transition-all"
              style={{ backgroundColor: 'white' }}
            >
              <h3
                className="font-semibold mb-1"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Inicio
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                Página principal del proyecto
              </p>
            </Link>

            <Link
              to="/componentes"
              className="block p-4 rounded-lg border-2 border-transparent hover:border-govco-verde transition-all"
              style={{ backgroundColor: 'white' }}
            >
              <h3
                className="font-semibold mb-1"
                style={{ color: 'var(--color-govco-verde)' }}
              >
                Componentes
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                Catálogo de componentes UI
              </p>
            </Link>

            <Link
              to="/formulario"
              className="block p-4 rounded-lg border-2 border-transparent hover:border-govco-naranja transition-all"
              style={{ backgroundColor: 'white' }}
            >
              <h3
                className="font-semibold mb-1"
                style={{ color: 'var(--color-govco-naranja)' }}
              >
                Formulario
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                Ejemplo de formulario completo
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
