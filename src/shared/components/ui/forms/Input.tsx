import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

// Generador simple de IDs unicos
let idCounter = 0
const generateId = (prefix: string, providedId?: string) => {
  if (providedId) return providedId
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

/**
 * Componente Input siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA) con labels y mensajes de error
 * - Soporte para iconos
 * - Validacion visual
 * - Compatible con React Hook Form
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      id,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const inputId = generateId('input', id)
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const inputClasses = clsx(
      'form-control',
      {
        'is-invalid': error,
        'ps-5': leftIcon,
        'pe-5': rightIcon,
      },
      className
    )

    return (
      <div className={clsx('mb-3', { 'w-100': fullWidth })}>
        {label && (
          <label htmlFor={inputId} className="form-label fw-medium">
            {label}
            {required && (
              <span className="text-danger ms-1" aria-label="campo requerido">
                *
              </span>
            )}
          </label>
        )}

        <div className="position-relative">
          {leftIcon && (
            <div
              className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            aria-required={required}
            {...props}
          />

          {rightIcon && (
            <div
              className="position-absolute top-50 end-0 translate-middle-y pe-3 text-secondary"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <div id={errorId} className="invalid-feedback d-flex align-items-center gap-1" role="alert">
            <svg
              width="16"
              height="16"
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
            {error}
          </div>
        )}

        {helperText && !error && (
          <div id={helperId} className="form-text">
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
