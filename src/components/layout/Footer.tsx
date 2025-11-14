import { ReactNode } from 'react'

export interface FooterProps {
  children?: ReactNode
  copyright?: string
  links?: Array<{
    label: string
    href: string
  }>
}

/**
 * Componente Footer siguiendo el sistema de diseño Gov.co
 * - Accesible con landmark <footer>
 * - Copyright y links configurables
 */
export function Footer({
  children,
  copyright = `© ${new Date().getFullYear()} Gobierno de Colombia`,
  links,
}: FooterProps) {
  return (
    <footer
      style={{ backgroundColor: 'var(--color-govco-azul-oscuro)' }}
      className="py-6 mt-auto"
      role="contentinfo"
    >
      <div className="container-govco">
        {children ? (
          children
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm text-center md:text-left">
              {copyright}
            </p>

            {links && links.length > 0 && (
              <nav
                className="flex flex-wrap items-center justify-center gap-4"
                aria-label="Enlaces del pie de página"
              >
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white text-sm hover:underline transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
