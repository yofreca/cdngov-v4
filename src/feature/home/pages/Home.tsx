import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui'
import { Card, CardHeader, CardContent } from '@shared/components/ui'
import { Alert } from '@shared/components/ui'

/**
 * Página de inicio / Home
 * Muestra información del proyecto y enlaces a las diferentes secciones
 * Diseño Gov.co con Bootstrap
 */
export function Home() {
  return (
    <div className="container-govco py-5">
      <div className="mx-auto" style={{ maxWidth: '56rem' }}>
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{ color: 'var(--color-govco-marino)' }}
          >
            Sistema de Diseño Gov.co
          </h1>
          <p className="lead" style={{ color: 'var(--color-govco-gris)' }}>
            Aplicación React 19 con componentes del Gobierno de Colombia
          </p>
        </div>

        {/* Success Alert */}
        <Alert variant="success" title="¡Proyecto Configurado!">
          Las Fases 1, 2 y 3 han sido completadas exitosamente. El sistema de
          rutas, componentes y navegación está funcionando.
        </Alert>

        {/* Features Grid */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <Card variant="elevated">
              <CardHeader title="Tecnologías" />
              <CardContent>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    React 19.2.0
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    TypeScript 5.9
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Vite 7.2
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Bootstrap 5
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    React Router 7
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-6">
            <Card variant="elevated">
              <CardHeader title="Características" />
              <CardContent>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Sistema de diseño Gov.co
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Accesibilidad WCAG 2.1 AA
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Responsive Design
                  </li>
                  <li className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Seguridad OWASP
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                    Rutas protegidas
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Buttons */}
        <Card className="mb-4">
          <CardContent>
            <div className="text-center">
              <h2
                className="h4 fw-semibold mb-4"
                style={{ color: 'var(--color-govco-gris-oscuro)' }}
              >
                Explora el Proyecto
              </h2>

              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-3">
                <Link to="/componentes">
                  <Button variant="primary" size="lg">
                    Ver Componentes
                  </Button>
                </Link>

                <Link to="/formulario">
                  <Button variant="secondary" size="lg">
                    Probar Formulario
                  </Button>
                </Link>
              </div>

              <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                Sistema de diseño siguiendo los lineamientos oficiales del
                Gobierno de Colombia
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="row g-3">
          <div className="col-md-4">
            <Card variant="outlined">
              <CardContent>
                <div className="text-center">
                  <div
                    className="h3 fw-bold mb-2"
                    style={{ color: 'var(--color-govco-marino)' }}
                  >
                    10+
                  </div>
                  <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                    Componentes Reutilizables
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4">
            <Card variant="outlined">
              <CardContent>
                <div className="text-center">
                  <div
                    className="h3 fw-bold mb-2"
                    style={{ color: 'var(--color-govco-verde)' }}
                  >
                    100%
                  </div>
                  <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                    TypeScript
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-md-4">
            <Card variant="outlined">
              <CardContent>
                <div className="text-center">
                  <div
                    className="h3 fw-bold mb-2"
                    style={{ color: 'var(--color-govco-naranja)' }}
                  >
                    AA
                  </div>
                  <p className="small mb-0" style={{ color: 'var(--color-govco-gris)' }}>
                    Accesibilidad WCAG
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
