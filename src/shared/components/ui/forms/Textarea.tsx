import { TextareaHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

// Generador simple de IDs unicos
let idCounter = 0
const generateId = (prefix: string, providedId?: string) => {
  if (providedId) return providedId
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
  showCount?: boolean
  maxLength?: number
}

/**
 * Componente Textarea siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Contador de caracteres opcional
 * - Validacion visual
 * - Compatible con React Hook Form
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      showCount = false,
      maxLength,
      className = '',
      id,
      required = false,
      disabled = false,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = generateId('textarea', id)
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`

    const currentLength =
      typeof value === 'string' ? value.length : value?.toString().length || 0

    const textareaClasses = clsx(
      'form-control',
      {
        'is-invalid': error,
      },
      className
    )

    return (
      <div className={clsx('mb-3', { 'w-100': fullWidth })}>
        <div className="d-flex align-items-center justify-content-between">
          {label && (
            <label htmlFor={textareaId} className="form-label fw-medium">
              {label}
              {required && (
                <span className="text-danger ms-1" aria-label="campo requerido">
                  *
                </span>
              )}
            </label>
          )}

          {showCount && maxLength && (
            <span
              className="small text-muted"
              aria-live="polite"
              aria-atomic="true"
            >
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClasses}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          aria-required={required}
          {...props}
        />

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

Textarea.displayName = 'Textarea'
