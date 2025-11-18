import { memo } from 'react'
import { clsx } from 'clsx'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
  fullScreen?: boolean
}

/**
 * LoadingSpinner Component
 * Spinner de carga optimizado con diseno Gov.co
 *
 * Caracteristicas:
 * - 3 tamanos: small, medium, large
 * - Opcion de pantalla completa
 * - Mensaje personalizable
 * - Accesible con ARIA labels
 * - Optimizado con React.memo
 */
export const LoadingSpinner = memo(function LoadingSpinner({
  size = 'medium',
  message,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'spinner-border-sm',
    medium: '',
    large: 'spinner-border',
  }

  const sizeStyles = {
    small: { width: '1.5rem', height: '1.5rem' },
    medium: { width: '3rem', height: '3rem' },
    large: { width: '4rem', height: '4rem' },
  }

  const spinnerElement = (
    <>
      <div
        className={clsx('spinner-border text-primary', sizeClasses[size])}
        style={sizeStyles[size]}
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
      {message && <p className="mt-3 text-secondary">{message}</p>}
    </>
  )

  if (fullScreen) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">{spinnerElement}</div>
      </div>
    )
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-4">
      {spinnerElement}
    </div>
  )
})
