import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'
import { useFormId } from '@utils/useFormId'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

/**
 * Componente Radio siguiendo el sistema de diseño Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Validación visual
 * - Compatible con React Hook Form
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', id, disabled = false, ...props }, ref) => {
    const radioId = useFormId('radio', id)

    const radioClasses = clsx(
      'w-5 h-5 border-2 transition-all',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'cursor-pointer',
      {
        'border-red-500': error,
      },
      className
    )

    const radioStyle: React.CSSProperties = {
      accentColor: 'var(--color-govco-marino)',
      borderColor: error
        ? 'var(--color-govco-rojo)'
        : 'var(--color-govco-gris-claro)',
    }

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={radioClasses}
          style={radioStyle}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />

        {label && (
          <label
            htmlFor={radioId}
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
    )
  }
)

Radio.displayName = 'Radio'
