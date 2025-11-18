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
    label: 'Ir a la navegacion',
    targetId: 'main-navigation',
  },
  {
    id: 'skip-to-footer',
    label: 'Ir al pie de pagina',
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
 */
export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = defaultSkipLinks,
}) => {
  const [visibleLinkId, setVisibleLinkId] = useState<string | null>(null)

  useEffect(() => {
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

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    const isFocusable = target.hasAttribute('tabindex') ||
                       ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)

    if (!isFocusable) {
      target.setAttribute('tabindex', '-1')
    }

    setTimeout(() => {
      target.focus()

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
      aria-label="Enlaces de navegacion rapida"
      className="skip-links"
      role="navigation"
    >
      <ul className="list-unstyled m-0 p-0">
        {links.map((link) => (
          <li key={link.id} className="d-inline">
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
          background-color: var(--govco-marino, #3366cc);
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
          background-color: var(--govco-azul-oscuro, #004884);
        }

        .skip-link:focus {
          outline: 3px solid var(--govco-amarillo, #f7c924);
          outline-offset: 2px;
        }

        body.high-contrast .skip-link {
          background-color: #000 !important;
          color: #ffff00 !important;
          border-color: #ffff00 !important;
        }

        @media (max-width: 576px) {
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
