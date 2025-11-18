import { Link } from 'react-router-dom'
import { Button } from '@shared/components/ui'
import { Card, CardHeader, CardContent } from '@shared/components/ui'
import { Alert } from '@shared/components/ui'

/**
 * Página de inicio / Home
 * Muestra información del proyecto y enlaces a las diferentes secciones
 */
export function Home() {
  return (
    <div className="container-govco py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ color: 'var(--color-govco-marino)' }}
          >
            Sistema de Diseño Gov.co
          </h1>
          <p
            className="text-xl md:text-2xl"
            style={{ color: 'var(--color-govco-gris)' }}
          >
            Aplicación React 19 con componentes del Gobierno de Colombia
          </p>
        </div>

        {/* Success Alert */}
        <Alert variant="success" title="¡Proyecto Configurado!">
          Las Fases 1, 2 y 3 han sido completadas exitosamente. El sistema de
          rutas, componentes y navegación está funcionando.
        </Alert>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated">
            <CardHeader title="Tecnologías" />
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  React 19.2.0
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  TypeScript 5.9
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Vite 7.2
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Tailwind CSS 4
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  React Router 7
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader title="Características" />
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Sistema de diseño Gov.co
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Accesibilidad WCAG 2.1 AA
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Responsive Design
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Seguridad OWASP
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: 'var(--color-govco-verde)' }}>✓</span>
                  Rutas protegidas
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA Buttons */}
        <Card>
          <CardContent>
            <div className="text-center space-y-6">
              <h2
                className="text-2xl font-semibold"
                style={{ color: 'var(--color-govco-gris-oscuro)' }}
              >
                Explora el Proyecto
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

              <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                Sistema de diseño siguiendo los lineamientos oficiales del
                Gobierno de Colombia
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="outlined">
            <CardContent>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  10+
                </div>
                <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                  Componentes Reutilizables
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--color-govco-verde)' }}
                >
                  100%
                </div>
                <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                  TypeScript
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--color-govco-naranja)' }}
                >
                  AA
                </div>
                <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                  Accesibilidad WCAG
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
