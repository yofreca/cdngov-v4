import { memo } from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  message?: string
  fullScreen?: boolean
}

/**
 * LoadingSpinner Component
 * Spinner de carga optimizado con diseño Gov.co
 *
 * Características:
 * - 3 tamaños: small (6), medium (12), large (16)
 * - Opción de pantalla completa
 * - Mensaje personalizable
 * - Accesible con ARIA labels
 * - Optimizado con React.memo
 *
 * Uso:
 * <LoadingSpinner size="medium" message="Cargando datos..." />
 * <LoadingSpinner fullScreen />
 */
export const LoadingSpinner = memo(function LoadingSpinner({
  size = 'medium',
  message,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  }

  const spinnerElement = (
    <>
      <div
        className={`${sizeClasses[size]} inline-block animate-spin rounded-full border-4 border-solid border-govco-marino border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
      {message && <p className="mt-4 text-govco-gris font-worksans">{message}</p>}
    </>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">{spinnerElement}</div>
      </div>
    )
  }

  return <div className="flex flex-col items-center justify-center py-8">{spinnerElement}</div>
})
