import { useState, useEffect } from 'react'

/**
 * Componente AccessibilityBar siguiendo el diseño Gov.co
 * - Contraste alto/bajo
 * - Aumentar/disminuir tamaño de letra
 * - Persistencia de preferencias en localStorage
 */
export function AccessibilityBar() {
  // Inicializar estados con valores guardados en localStorage
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('accessibility-font-size')
    return saved ? parseInt(saved) : 16
  })

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('accessibility-high-contrast') === 'true'
  })

  // Aplicar preferencias guardadas al cargar
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`

    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
  }, [])

  const increaseFontSize = () => {
    if (fontSize < 20) {
      const newSize = fontSize + 2
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}px`
      localStorage.setItem('accessibility-font-size', newSize.toString())
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      const newSize = fontSize - 2
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}px`
      localStorage.setItem('accessibility-font-size', newSize.toString())
    }
  }

  const toggleContrast = () => {
    const newContrast = !highContrast
    setHighContrast(newContrast)

    if (newContrast) {
      document.body.classList.add('high-contrast')
      localStorage.setItem('accessibility-high-contrast', 'true')
    } else {
      document.body.classList.remove('high-contrast')
      localStorage.setItem('accessibility-high-contrast', 'false')
    }
  }

  return (
    <div
      className="accessibility-bar fixed right-0 top-1/2 -translate-y-1/2 z-50"
      role="toolbar"
      aria-label="Herramientas de accesibilidad"
    >
      <div
        className="bg-white border-2 rounded-l-lg shadow-lg overflow-hidden"
        style={{ borderColor: 'var(--color-govco-marino)' }}
      >
        {/* Contraste */}
        <button
          onClick={toggleContrast}
          className="w-full px-4 py-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors border-b"
          aria-label={
            highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'
          }
          title="Contraste"
        >
          <span
            className="text-2xl mb-1"
            style={{ color: 'var(--color-govco-marino)' }}
          >
            ⚫⚪
          </span>
          <span className="text-xs text-center text-gray-700">Contraste</span>
        </button>

        {/* Reducir letra */}
        <button
          onClick={decreaseFontSize}
          disabled={fontSize <= 12}
          className="w-full px-4 py-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors border-b disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Reducir tamaño de letra"
          title="Reducir letra"
        >
          <span
            className="text-xl mb-1"
            style={{ color: 'var(--color-govco-marino)' }}
          >
            A-
          </span>
          <span className="text-xs text-center text-gray-700">
            Reducir letra
          </span>
        </button>

        {/* Aumentar letra */}
        <button
          onClick={increaseFontSize}
          disabled={fontSize >= 20}
          className="w-full px-4 py-3 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Aumentar tamaño de letra"
          title="Aumentar letra"
        >
          <span
            className="text-2xl mb-1"
            style={{ color: 'var(--color-govco-marino)' }}
          >
            A+
          </span>
          <span className="text-xs text-center text-gray-700">
            Aumentar letra
          </span>
        </button>
      </div>
    </div>
  )
}
