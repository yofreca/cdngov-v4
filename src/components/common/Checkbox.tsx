import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { useFormId } from '@utils/useFormId'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
}

/**
 * Componente Checkbox siguiendo el sistema de diseño Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Validación visual
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
    const checkboxId = useFormId('checkbox', id)
    const errorId = `${checkboxId}-error`
    const helperId = `${checkboxId}-helper`

    const checkboxClasses = clsx(
      'w-5 h-5 rounded border-2 transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer',
      {
        'border-red-500': error,
      },
      className
    )

    const checkboxStyle: React.CSSProperties = {
      accentColor: 'var(--color-govco-marino)',
      borderColor: error
        ? 'var(--color-govco-rojo)'
        : 'var(--color-govco-gris-claro)',
    }

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={checkboxClasses}
            style={checkboxStyle}
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
              className={clsx(
                'text-sm select-none',
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              )}
              style={{ color: 'var(--color-govco-gris-oscuro)' }}
            >
              {label}
            </label>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            className="text-sm flex items-center gap-1 ml-7"
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
            className="text-sm ml-7"
            style={{ color: 'var(--color-govco-gris)' }}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
