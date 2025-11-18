import { memo, useMemo } from 'react'

/**
 * StatsCard - Tarjeta de estadísticas para Dashboard
 * - Diseño Gov.co con colores oficiales
 * - Accesibilidad WCAG 2.1 AA
 * - Animaciones suaves
 * - Optimizado con React.memo para evitar re-renders innecesarios
 * - Convertido a Bootstrap 5
 */

interface StatsCardProps {
  title: string
  value: string | number
  icon?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'blue' | 'green' | 'yellow' | 'red'
  description?: string
}

export const StatsCard = memo(function StatsCard({
  title,
  value,
  icon,
  trend,
  color = 'blue',
  description,
}: StatsCardProps) {
  // Memoizar el objeto de colores para evitar recrearlo en cada render
  const colors = useMemo(() => {
    const colorStyles = {
      blue: {
        bg: 'rgba(59, 66, 130, 0.1)',
        border: 'var(--color-govco-marino)',
        text: 'var(--color-govco-marino)',
        iconBg: 'var(--color-govco-marino)',
      },
      green: {
        bg: 'rgba(6, 159, 170, 0.1)',
        border: 'var(--color-govco-verde-azulado)',
        text: 'var(--color-govco-verde-azulado)',
        iconBg: 'var(--color-govco-verde-azulado)',
      },
      yellow: {
        bg: 'rgba(255, 193, 7, 0.1)',
        border: 'var(--color-govco-amarillo)',
        text: '#997404',
        iconBg: 'var(--color-govco-amarillo)',
      },
      red: {
        bg: 'rgba(168, 19, 62, 0.1)',
        border: 'var(--color-govco-rojo)',
        text: 'var(--color-govco-rojo)',
        iconBg: 'var(--color-govco-rojo)',
      },
    }
    return colorStyles[color]
  }, [color])

  return (
    <div
      className="rounded-3 p-4"
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
        transition: 'all 0.3s ease',
      }}
      role="article"
      aria-label={`Estadística: ${title}`}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)'
        e.currentTarget.style.transform = 'translateY(-0.25rem)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div className="d-flex align-items-start justify-content-between">
        <div className="flex-grow-1">
          <p className="small fw-medium text-secondary mb-1">{title}</p>
          <p
            className="h3 fw-bold mb-2"
            style={{ color: colors.text }}
          >
            {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
          </p>

          {description && (
            <p className="small text-muted mb-0">{description}</p>
          )}

          {trend && (
            <div className="d-flex align-items-center mt-2">
              <span
                className="small fw-medium"
                style={{ color: trend.isPositive ? 'var(--bs-success)' : 'var(--bs-danger)' }}
                aria-label={`Tendencia: ${trend.isPositive ? 'positiva' : 'negativa'}`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="small text-muted ms-2">vs. mes anterior</span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className="rounded-3 d-flex align-items-center justify-content-center text-white fs-4 flex-shrink-0"
            style={{
              backgroundColor: colors.iconBg,
              width: '3rem',
              height: '3rem',
            }}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
})
