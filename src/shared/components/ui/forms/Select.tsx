import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { clsx } from 'clsx'

// Generador simple de IDs unicos
let idCounter = 0
const generateId = (prefix: string, providedId?: string) => {
  if (providedId) return providedId
  idCounter += 1
  return `${prefix}-${idCounter}`
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

/**
 * Componente Select siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Validacion visual
 * - Compatible con React Hook Form
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder,
      fullWidth = false,
      className = '',
      id,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const selectId = generateId('select', id)
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`

    const selectClasses = clsx(
      'form-select',
      {
        'is-invalid': error,
      },
      className
    )

    return (
      <div className={clsx('mb-3', { 'w-100': fullWidth })}>
        {label && (
          <label htmlFor={selectId} className="form-label fw-medium">
            {label}
            {required && (
              <span className="text-danger ms-1" aria-label="campo requerido">
                *
              </span>
            )}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          aria-required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

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

Select.displayName = 'Select'
