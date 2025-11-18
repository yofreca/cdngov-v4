import type { ReactNode, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

/**
 * Componente Card siguiendo el sistema de diseno Gov.co
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
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5',
  }

  const variantClasses = {
    default: 'card',
    outlined: 'card border-2',
    elevated: 'card shadow-lg border-0',
  }

  const cardClasses = clsx(
    variantClasses[variant],
    paddingClasses[padding],
    className
  )

  return (
    <div className={cardClasses} {...props}>
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
    <div className={clsx('d-flex align-items-start justify-content-between mb-3', className)}>
      <div>
        <h5 className="card-title mb-1">{title}</h5>
        {subtitle && (
          <p className="card-subtitle text-muted small">{subtitle}</p>
        )}
      </div>
      {action && <div className="ms-3">{action}</div>}
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
  return <div className={clsx('card-body p-0', className)}>{children}</div>
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
    <div className={clsx('card-footer bg-transparent border-top mt-3 pt-3', className)}>
      {children}
    </div>
  )
}
