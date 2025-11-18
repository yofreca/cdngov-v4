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
 * Captura errores de JavaScript en cualquier lugar del arbol de componentes hijo,
 * registra esos errores y muestra una UI alternativa en lugar del arbol de componentes que fallo.
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
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error capturado por ErrorBoundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center px-3 py-5">
          <div className="container" style={{ maxWidth: '42rem' }}>
            <div className="card border-danger border-2 shadow-lg">
              <div className="card-body p-4 p-md-5">
                {/* Icono de error */}
                <div className="text-center mb-4">
                  <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex p-4">
                    <svg
                      width="64"
                      height="64"
                      className="text-danger"
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

                {/* Titulo */}
                <h1 className="h3 fw-semibold text-center mb-3">
                  Ups! Algo salio mal
                </h1>

                {/* Descripcion */}
                <p className="text-secondary text-center mb-4">
                  Lo sentimos, ocurrio un error inesperado. Nuestro equipo ha sido notificado y
                  estamos trabajando para solucionarlo.
                </p>

                {/* Detalles del error en desarrollo */}
                {import.meta.env.DEV && this.state.error && (
                  <div className="accordion mb-4" id="errorDetails">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseError"
                          aria-expanded="false"
                          aria-controls="collapseError"
                        >
                          Detalles del error (solo visible en desarrollo)
                        </button>
                      </h2>
                      <div
                        id="collapseError"
                        className="accordion-collapse collapse"
                        data-bs-parent="#errorDetails"
                      >
                        <div className="accordion-body">
                          <div className="mb-3">
                            <h6 className="fw-semibold">Error:</h6>
                            <pre className="bg-danger bg-opacity-10 p-3 rounded small text-danger overflow-auto">
                              {this.state.error.toString()}
                            </pre>
                          </div>
                          {this.state.errorInfo && (
                            <div>
                              <h6 className="fw-semibold">Stack trace:</h6>
                              <pre className="bg-light p-3 rounded small overflow-auto" style={{ maxHeight: '16rem' }}>
                                {this.state.errorInfo.componentStack}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Botones de accion */}
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <Button variant="primary" onClick={this.handleReload} className="px-4">
                    Recargar aplicacion
                  </Button>
                  <Button
                    variant="outline"
                    onClick={this.handleReset}
                    className="px-4"
                    aria-label="Intentar de nuevo sin recargar"
                  >
                    Intentar de nuevo
                  </Button>
                </div>

                {/* Mensaje de ayuda */}
                <div className="mt-4 text-center small text-muted">
                  <p className="mb-0">Si el problema persiste, por favor contacta al soporte tecnico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
