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
        bg: 'bg-blue-50',
        border: 'border-govco-marino',
        text: 'text-govco-marino',
        iconBg: 'bg-govco-marino',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-govco-verde-azulado',
        text: 'text-govco-verde-azulado',
        iconBg: 'bg-govco-verde-azulado',
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-govco-amarillo',
        text: 'text-govco-amarillo',
        iconBg: 'bg-govco-amarillo',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-govco-rojo',
        text: 'text-govco-rojo',
        iconBg: 'bg-govco-rojo',
      },
    }
    return colorClasses[color]
  }, [color])

  return (
    <div
      className={`${colors.bg} ${colors.border} border-2 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
      role="article"
      aria-label={`Estadística: ${title}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colors.text} mb-2`}>
            {value.toLocaleString('es-CO')}
          </p>

          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}

          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
                aria-label={`Tendencia: ${trend.isPositive ? 'positiva' : 'negativa'}`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 ml-2">vs. mes anterior</span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`${colors.iconBg} w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
})
