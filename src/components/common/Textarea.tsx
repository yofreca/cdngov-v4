import { TextareaHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { useFormId } from '@utils/useFormId'

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
 * Componente Textarea siguiendo el sistema de diseño Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Contador de caracteres opcional
 * - Validación visual
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
    const textareaId = useFormId('textarea', id)
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`

    const currentLength =
      typeof value === 'string' ? value.length : value?.toString().length || 0

    const textareaClasses = clsx(
      'block px-4 py-2.5 rounded-md border transition-colors',
      'text-base resize-y',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        'w-full': fullWidth,
        'border-red-500 focus:ring-red-500': error,
        'focus:ring-opacity-50': !error,
      },
      className
    )

    const textareaStyle: React.CSSProperties = error
      ? {
          borderColor: 'var(--color-govco-rojo)',
        }
      : {
          borderColor: 'var(--color-govco-gris-claro)',
        }

    return (
      <div className={clsx('flex flex-col gap-1.5', { 'w-full': fullWidth })}>
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={textareaId}
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

          {showCount && maxLength && (
            <span
              className="text-sm"
              style={{ color: 'var(--color-govco-gris)' }}
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
          style={textareaStyle}
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

Textarea.displayName = 'Textarea'
