import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { clsx } from 'clsx'

// Generador simple de IDs unicos
let idCounter = 0
const generateId = (prefix: string, providedId?: string) => {
  if (providedId) return providedId
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * Componente Checkbox siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Validacion visual
 * - Compatible con React Hook Form
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      id,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const checkboxId = generateId('checkbox', id)
    const errorId = `${checkboxId}-error`
    const helperId = `${checkboxId}-helper`

    return (
      <div className="mb-3">
        <div className="form-check">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={clsx('form-check-input', { 'is-invalid': error }, className)}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />

          {label && (
            <label
              htmlFor={checkboxId}
              className={clsx('form-check-label', {
                'text-muted': disabled,
              })}
            >
              {label}
            </label>
          )}

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
        </div>

        {helperText && !error && (
          <div id={helperId} className="form-text ms-4">
            {helperText}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
