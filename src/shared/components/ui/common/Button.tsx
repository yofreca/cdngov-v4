import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'link'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
}

/**
 * Componente Button siguiendo el sistema de diseno Gov.co
 * - Accesible (WCAG 2.1 AA)
 * - Soporte para estados (hover, focus, disabled, loading)
 * - Multiples variantes y tamanos
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Mapeo de variantes a clases de Bootstrap
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-success',
      outline: 'btn-outline-primary',
      danger: 'btn-danger',
      link: 'btn-link',
    }

    // Mapeo de tamanos a clases de Bootstrap
    const sizeClasses = {
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg',
    }

    const buttonClasses = clsx(
      'btn',
      variantClasses[variant],
      sizeClasses[size],
      {
        'w-100': fullWidth,
        'disabled': disabled || loading,
      },
      'd-inline-flex align-items-center justify-content-center',
      className
    )

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
