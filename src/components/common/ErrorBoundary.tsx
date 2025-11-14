import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

/**
 * ErrorBoundary Component
 * Captura errores de JavaScript en cualquier lugar del árbol de componentes hijo,
 * registra esos errores y muestra una UI alternativa en lugar del árbol de componentes que falló.
 *
 * Características:
 * - Captura errores en rendering, lifecycle methods y constructores
 * - Muestra UI alternativa con diseño Gov.co
 * - Opción de recargar la aplicación
 * - Registra errores en consola (puede extenderse a servicio de logging)
 * - Diseño responsive y accesible
 *
 * Uso:
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 *
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Actualiza el estado para que el siguiente render muestre la UI alternativa
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Puedes registrar el error en un servicio de logging
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)

    // Actualizar el estado con la información del error
    this.setState({
      error,
      errorInfo,
    })

    // TODO: Enviar a servicio de logging como Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo)
  }

  handleReload = () => {
    // Recargar la aplicación
    window.location.reload()
  }

  handleReset = () => {
    // Resetear el estado del error
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // Puedes usar un fallback personalizado si se proporciona
      if (this.props.fallback) {
        return this.props.fallback
      }

      // UI alternativa por defecto
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full">
            <div className="bg-white shadow-lg rounded-lg border-2 border-govco-rojo p-8">
              {/* Icono de error */}
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 rounded-full p-6">
                  <svg
                    className="h-16 w-16 text-govco-rojo"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Título */}
              <h1 className="text-3xl font-montserrat font-semibold text-govco-gris-oscuro text-center mb-4">
                ¡Ups! Algo salió mal
              </h1>

              {/* Descripción */}
              <p className="text-govco-gris text-center mb-6 font-worksans">
                Lo sentimos, ocurrió un error inesperado. Nuestro equipo ha sido notificado y
                estamos trabajando para solucionarlo.
              </p>

              {/* Detalles del error en desarrollo */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <summary className="cursor-pointer font-semibold text-govco-marino mb-2">
                    Detalles del error (solo visible en desarrollo)
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-govco-gris-oscuro mb-2">Error:</h3>
                      <pre className="bg-red-50 p-3 rounded text-sm text-red-800 overflow-x-auto">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <h3 className="font-semibold text-govco-gris-oscuro mb-2">
                          Stack trace:
                        </h3>
                        <pre className="bg-gray-100 p-3 rounded text-xs text-gray-700 overflow-x-auto max-h-64">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" onClick={this.handleReload} className="min-w-[200px]">
                  Recargar aplicación
                </Button>
                <Button
                  variant="outline"
                  onClick={this.handleReset}
                  className="min-w-[200px]"
                  aria-label="Intentar de nuevo sin recargar"
                >
                  Intentar de nuevo
                </Button>
              </div>

              {/* Mensaje de ayuda */}
              <div className="mt-8 text-center text-sm text-govco-gris">
                <p>Si el problema persiste, por favor contacta al soporte técnico.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
