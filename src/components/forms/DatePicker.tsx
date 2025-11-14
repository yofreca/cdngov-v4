import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { useFormId } from '@utils/useFormId'

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
  minDate?: string // formato YYYY-MM-DD
  maxDate?: string // formato YYYY-MM-DD
  fullWidth?: boolean
}

/**
 * Componente DatePicker siguiendo el sistema de diseño Gov.co
 * - Input nativo HTML5 type="date" (accesible y compatible)
 * - Validación de rangos de fecha
 * - Formato DD/MM/YYYY para Colombia
 * - Accesible WCAG 2.1 AA
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      minDate,
      maxDate,
      fullWidth = true,
      className,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const id = useFormId(props.id)

    return (
      <div className={clsx('form-group', fullWidth && 'w-full', className)}>
        {label && (
          <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type="date"
          id={id}
          min={minDate}
          max={maxDate}
          disabled={disabled}
          required={required}
          aria-describedby={
            helperText || error ? `${id}-helper ${id}-error` : undefined
          }
          aria-invalid={!!error}
          aria-required={required}
          className={clsx(
            'w-full px-4 py-2 border rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500',
            disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
            'text-gray-900 placeholder-gray-400'
          )}
          style={
            !error && !disabled
              ? { borderColor: 'var(--color-govco-gris-claro)' }
              : undefined
          }
          {...props}
        />

        {helperText && !error && (
          <p id={`${id}-helper`} className="mt-2 text-sm text-gray-600">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={`${id}-error`}
            className="mt-2 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
