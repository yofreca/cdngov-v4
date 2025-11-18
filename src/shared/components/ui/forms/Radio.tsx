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

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

/**
 * Componente Radio siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Validacion visual
 * - Compatible con React Hook Form
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, className = '', id, disabled = false, ...props }, ref) => {
    const radioId = generateId('radio', id)

    return (
      <div className="form-check">
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className={clsx('form-check-input', { 'is-invalid': error }, className)}
          disabled={disabled}
          aria-invalid={!!error}
          {...props}
        />

        {label && (
          <label
            htmlFor={radioId}
            className={clsx('form-check-label', {
              'text-muted': disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
