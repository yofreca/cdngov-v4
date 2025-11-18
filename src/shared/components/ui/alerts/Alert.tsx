import { ReactNode } from 'react'
import { clsx } from 'clsx'

export interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: ReactNode
  onClose?: () => void
  className?: string
}

/**
 * Componente Alert siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Multiples variantes (success, error, warning, info)
 * - Opcion de cerrar
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}: AlertProps) {
  // Mapeo de variantes a clases de Bootstrap
  const variantConfig = {
    success: {
      alertClass: 'alert-success',
      icon: (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      alertClass: 'alert-danger',
      icon: (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      alertClass: 'alert-warning',
      icon: (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      alertClass: 'alert-primary',
      icon: (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  }

  const config = variantConfig[variant]

  return (
    <div
      className={clsx(
        'alert d-flex align-items-start',
        config.alertClass,
        { 'alert-dismissible': onClose },
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex-shrink-0 me-3">{config.icon}</div>

      <div className="flex-grow-1">
        {title && <h5 className="alert-heading fs-6 fw-semibold mb-1">{title}</h5>}
        <div className="small">{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Cerrar alerta"
        />
      )}
    </div>
  )
}
