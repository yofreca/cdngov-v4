import { ReactNode, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

/**
 * Componente Card siguiendo el sistema de diseño Gov.co
 * - Variantes: default, outlined, elevated
 * - Padding configurable
 * - Responsive
 */
export function Card({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  ...props
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const variantClasses = {
    default: 'bg-white border',
    outlined: 'bg-white border-2',
    elevated: 'bg-white shadow-lg',
  }

  const cardClasses = clsx(
    'rounded-lg transition-all',
    variantClasses[variant],
    paddingClasses[padding],
    className
  )

  const cardStyle: React.CSSProperties =
    variant !== 'elevated'
      ? {
          borderColor: 'var(--color-govco-gris-claro)',
        }
      : {}

  return (
    <div className={cardClasses} style={cardStyle} {...props}>
      {children}
    </div>
  )
}

/**
 * Subcomponente CardHeader
 */
export interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
}

export function CardHeader({
  title,
  subtitle,
  action,
  className = '',
}: CardHeaderProps) {
  return (
    <div className={clsx('flex items-start justify-between mb-4', className)}>
      <div>
        <h3
          className="text-lg font-semibold"
          style={{ color: 'var(--color-govco-gris-oscuro)' }}
        >
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm mt-1" style={{ color: 'var(--color-govco-gris)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  )
}

/**
 * Subcomponente CardContent
 */
export interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>
}

/**
 * Subcomponente CardFooter
 */
export interface CardFooterProps {
  children: ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div
      className={clsx('mt-4 pt-4 border-t', className)}
      style={{ borderColor: 'var(--color-govco-gris-claro)' }}
    >
      {children}
    </div>
  )
}
