import { ReactNode } from 'react'

export interface HeaderProps {
  title: string
  subtitle?: string
  logo?: ReactNode
  actions?: ReactNode
}

/**
 * Componente Header siguiendo el sistema de diseño Gov.co
 * - Accesible con landmark <header>
 * - Logo y título configurables
 * - Área de acciones (menú, botones, etc.)
 */
export function Header({ title, subtitle, logo, actions }: HeaderProps) {
  return (
    <header
      style={{ backgroundColor: 'var(--color-govco-marino)' }}
      className="py-4"
      role="banner"
    >
      <div className="container-govco">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo && <div className="flex-shrink-0">{logo}</div>}

            <div>
              <h1 className="text-white text-2xl md:text-3xl font-semibold">
                {title}
              </h1>
              {subtitle && (
                <p className="text-white text-sm md:text-base opacity-90 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex items-center gap-4">{actions}</div>
          )}
        </div>
      </div>
    </header>
  )
}
