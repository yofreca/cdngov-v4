/**
 * SkipLinks - Enlaces de Salto para Navegación por Teclado
 * WCAG 2.1 AA - Guideline 2.4.1 Bypass Blocks
 *
 * Permite a usuarios de teclado y lectores de pantalla saltar directamente
 * a las secciones principales del contenido
 */

import { useEffect, useState } from 'react'

interface SkipLink {
  id: string
  label: string
  targetId: string
}

const defaultSkipLinks: SkipLink[] = [
  {
    id: 'skip-to-main',
    label: 'Ir al contenido principal',
    targetId: 'main-content',
  },
  {
    id: 'skip-to-nav',
    label: 'Ir a la navegación',
    targetId: 'main-navigation',
  },
  {
    id: 'skip-to-footer',
    label: 'Ir al pie de página',
    targetId: 'footer',
  },
  {
    id: 'skip-to-search',
    label: 'Ir al buscador',
    targetId: 'search',
  },
]

export interface SkipLinksProps {
  links?: SkipLink[]
}

/**
 * Componente SkipLinks siguiendo Gov.co y WCAG 2.1 AA
 * - Visible solo al recibir foco por teclado
 * - Navegación por Tab
 * - Smooth scroll al destino
 * - Enfoca el elemento de destino
 * - Accesible con lectores de pantalla
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = defaultSkipLinks,
}) => {
  const [visibleLinkId, setVisibleLinkId] = useState<string | null>(null)

  useEffect(() => {
    // Verificar que los IDs de destino existen en el DOM
    links.forEach((link) => {
      const target = document.getElementById(link.targetId)
      if (!target && import.meta.env.DEV) {
        console.warn(
          `SkipLinks: Target element with id "${link.targetId}" not found`
        )
      }
    })
  }, [links])

  const handleSkipLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()

    const target = document.getElementById(targetId)
    if (!target) {
      console.error(`Target element with id "${targetId}" not found`)
      return
    }

    // Scroll suave al destino
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    // Enfocar el elemento de destino
    // Si el elemento no es focusable, añadimos tabindex temporalmente
    const isFocusable = target.hasAttribute('tabindex') ||
                       ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)

    if (!isFocusable) {
      target.setAttribute('tabindex', '-1')
    }

    // Pequeño delay para que el scroll termine antes de enfocar
    setTimeout(() => {
      target.focus()

      // Remover tabindex temporal después de perder el foco
      if (!isFocusable) {
        const removeTempTabindex = () => {
          target.removeAttribute('tabindex')
          target.removeEventListener('blur', removeTempTabindex)
        }
        target.addEventListener('blur', removeTempTabindex)
      }
    }, 100)
  }

  return (
    <nav
      aria-label="Enlaces de navegación rápida"
      className="skip-links"
      role="navigation"
    >
      <ul className="list-none m-0 p-0">
        {links.map((link) => (
          <li key={link.id} className="inline">
            <a
              href={`#${link.targetId}`}
              onClick={(e) => handleSkipLinkClick(e, link.targetId)}
              onFocus={() => setVisibleLinkId(link.id)}
              onBlur={() => setVisibleLinkId(null)}
              className="skip-link"
              style={{
                opacity: visibleLinkId === link.id ? 1 : 0,
                transform:
                  visibleLinkId === link.id
                    ? 'translateY(0)'
                    : 'translateY(-100%)',
                pointerEvents: visibleLinkId === link.id ? 'auto' : 'none',
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Estilos inline para evitar dependencias */}
      <style>{`
        .skip-links {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
          pointer-events: none;
        }

        .skip-links ul {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .skip-link {
          display: inline-block;
          padding: 1rem 1.5rem;
          background-color: var(--color-govco-marino, #3366cc);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          border: 2px solid white;
          border-radius: 0 0 0.375rem 0.375rem;
          margin-left: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: opacity 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
        }

        .skip-link:hover {
          background-color: var(--color-govco-azul-oscuro, #004884);
        }

        .skip-link:focus {
          outline: 3px solid var(--color-govco-amarillo, #f7c924);
          outline-offset: 2px;
        }

        /* Modo de alto contraste */
        body.high-contrast .skip-link {
          background-color: #000 !important;
          color: #ffff00 !important;
          border-color: #ffff00 !important;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .skip-link {
            font-size: 0.875rem;
            padding: 0.75rem 1rem;
          }
        }
      `}</style>
    </nav>
  )
}

export default SkipLinks
