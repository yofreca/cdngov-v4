import { memo, useMemo } from 'react'

/**
 * StatsCard - Tarjeta de estadísticas para Dashboard
 * - Diseño Gov.co con colores oficiales
 * - Accesibilidad WCAG 2.1 AA
 * - Animaciones suaves
 * - Optimizado con React.memo para evitar re-renders innecesarios
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
    const colorClasses = {
      blue: {
        bg: 'rgba(51, 102, 204, 0.1)',
        border: 'var(--color-govco-marino)',
        text: 'var(--color-govco-marino)',
        iconBg: 'var(--color-govco-marino)',
      },
      green: {
        bg: 'rgba(6, 132, 96, 0.1)',
        border: 'var(--color-govco-verde)',
        text: 'var(--color-govco-verde)',
        iconBg: 'var(--color-govco-verde)',
      },
      yellow: {
        bg: 'rgba(247, 201, 36, 0.1)',
        border: 'var(--color-govco-amarillo)',
        text: 'var(--color-govco-amarillo)',
        iconBg: 'var(--color-govco-amarillo)',
      },
      red: {
        bg: 'rgba(244, 47, 99, 0.1)',
        border: 'var(--color-govco-rojo)',
        text: 'var(--color-govco-rojo)',
        iconBg: 'var(--color-govco-rojo)',
      },
    }
    return colorClasses[color]
  }, [color])

  return (
    <div
      className="rounded-3 p-4 transition"
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
      }}
      role="article"
      aria-label={`Estadística: ${title}`}
    >
      <div className="d-flex align-items-start justify-content-between">
        <div className="flex-grow-1">
          <p className="small fw-medium text-secondary mb-1">{title}</p>
          <p
            className="fs-3 fw-bold mb-2"
            style={{ color: colors.text }}
          >
            {typeof value === 'number' ? value.toLocaleString('es-CO') : value}
          </p>

          {description && (
            <p className="small text-muted">{description}</p>
          )}

          {trend && (
            <div className="d-flex align-items-center mt-2">
              <span
                className={`small fw-medium ${
                  trend.isPositive ? 'text-success' : 'text-danger'
                }`}
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
            className="d-flex align-items-center justify-content-center text-white fs-4 flex-shrink-0 rounded-3"
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
