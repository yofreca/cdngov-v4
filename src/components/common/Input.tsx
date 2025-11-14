import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { clsx } from 'clsx'
import { useFormId } from '@utils/useFormId'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

/**
 * Componente Input siguiendo el sistema de diseño Gov.co
 * - Accesible (WCAG 2.1 AA) con labels y mensajes de error
 * - Soporte para iconos
 * - Validación visual
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
    const inputId = useFormId('input', id)
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const inputClasses = clsx(
      'block px-4 py-2.5 rounded-md border transition-colors',
      'text-base',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'w-full': fullWidth,
        'pl-10': leftIcon,
        'pr-10': rightIcon,
        'border-red-500 focus:ring-red-500': error,
        'focus:ring-opacity-50': !error,
      },
      className
    )

    const inputStyle: React.CSSProperties = error
      ? {
          borderColor: 'var(--color-govco-rojo)',
        }
      : {
          borderColor: 'var(--color-govco-gris-claro)',
        }

    return (
      <div className={clsx('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
            style={{ color: 'var(--color-govco-gris-oscuro)' }}
          >
            {label}
            {required && (
              <span
                className="ml-1"
                style={{ color: 'var(--color-govco-rojo)' }}
                aria-label="campo requerido"
              >
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-govco-gris)' }}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            style={inputStyle}
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
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--color-govco-gris)' }}
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="text-sm flex items-center gap-1"
            style={{ color: 'var(--color-govco-rojo)' }}
            role="alert"
          >
            <svg
              className="w-4 h-4"
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
          </p>
        )}

        {helperText && !error && (
          <p
            id={helperId}
            className="text-sm"
            style={{ color: 'var(--color-govco-gris)' }}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
