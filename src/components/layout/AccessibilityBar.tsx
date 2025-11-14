import { useState, useEffect } from 'react'

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'

/**
 * Componente AccessibilityBar siguiendo el diseño Gov.co
 * - Contraste alto/bajo
 * - Aumentar/disminuir tamaño de letra
 * - Modo daltonismo (protanopia, deuteranopia, tritanopia)
 * - Persistencia de preferencias en localStorage
 * - Diseño: Azul Gov.co con iconos blancos
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

  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>(() => {
    const saved = localStorage.getItem('accessibility-colorblind-mode')
    return (saved as ColorBlindMode) || 'none'
  })

  const [showColorBlindMenu, setShowColorBlindMenu] = useState(false)

  // Funciones auxiliares
  const applyColorBlindFilter = (mode: ColorBlindMode) => {
    // Remover clases anteriores
    document.body.classList.remove(
      'colorblind-protanopia',
      'colorblind-deuteranopia',
      'colorblind-tritanopia'
    )

    // Aplicar nueva clase
    if (mode !== 'none') {
      document.body.classList.add(`colorblind-${mode}`)
    }
  }

  // Aplicar preferencias guardadas al cargar
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`

    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }

    // Aplicar filtro de daltonismo
    applyColorBlindFilter(colorBlindMode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const changeColorBlindMode = (mode: ColorBlindMode) => {
    setColorBlindMode(mode)
    applyColorBlindFilter(mode)
    localStorage.setItem('accessibility-colorblind-mode', mode)
    setShowColorBlindMenu(false)
  }

  const resetPreferences = () => {
    setFontSize(16)
    setHighContrast(false)
    setColorBlindMode('none')
    document.documentElement.style.fontSize = '16px'
    document.body.classList.remove('high-contrast')
    applyColorBlindFilter('none')
    localStorage.removeItem('accessibility-font-size')
    localStorage.removeItem('accessibility-high-contrast')
    localStorage.removeItem('accessibility-colorblind-mode')
  }

  return (
    <div
      className="accessibility-bar fixed right-0 top-1/2 -translate-y-1/2 z-50"
      role="toolbar"
      aria-label="Herramientas de accesibilidad"
    >
      <div
        className="rounded-l-lg shadow-lg overflow-hidden"
        style={{ backgroundColor: 'var(--color-govco-marino)' }}
      >
        {/* Contraste */}
        <button
          onClick={toggleContrast}
          className="w-full px-4 py-3 flex flex-col items-center justify-center transition-colors border-b border-white/20"
          style={{
            backgroundColor: highContrast
              ? 'var(--color-govco-azul-oscuro)'
              : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (!highContrast) {
              e.currentTarget.style.backgroundColor =
                'var(--color-govco-azul-oscuro)'
            }
          }}
          onMouseLeave={(e) => {
            if (!highContrast) {
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
          aria-label={
            highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'
          }
          title="Contraste"
        >
          <span className="text-2xl mb-1 text-white" aria-hidden="true">
            ⚫⚪
          </span>
          <span className="text-xs text-center text-white font-medium">
            Contraste
          </span>
        </button>

        {/* Reducir letra */}
        <button
          onClick={decreaseFontSize}
          disabled={fontSize <= 12}
          className="w-full px-4 py-3 flex flex-col items-center justify-center transition-colors border-b border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          onMouseEnter={(e) => {
            if (fontSize > 12) {
              e.currentTarget.style.backgroundColor =
                'var(--color-govco-azul-oscuro)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          aria-label="Reducir tamaño de letra"
          title="Reducir letra"
        >
          <span className="text-xl mb-1 text-white font-bold" aria-hidden="true">
            A-
          </span>
          <span className="text-xs text-center text-white font-medium">
            Reducir
          </span>
        </button>

        {/* Aumentar letra */}
        <button
          onClick={increaseFontSize}
          disabled={fontSize >= 20}
          className="w-full px-4 py-3 flex flex-col items-center justify-center transition-colors border-b border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          onMouseEnter={(e) => {
            if (fontSize < 20) {
              e.currentTarget.style.backgroundColor =
                'var(--color-govco-azul-oscuro)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          aria-label="Aumentar tamaño de letra"
          title="Aumentar letra"
        >
          <span className="text-2xl mb-1 text-white font-bold" aria-hidden="true">
            A+
          </span>
          <span className="text-xs text-center text-white font-medium">
            Aumentar
          </span>
        </button>

        {/* Daltonismo */}
        <div className="relative">
          <button
            onClick={() => setShowColorBlindMenu(!showColorBlindMenu)}
            className="w-full px-4 py-3 flex flex-col items-center justify-center transition-colors border-b border-white/20"
            style={{
              backgroundColor:
                colorBlindMode !== 'none'
                  ? 'var(--color-govco-azul-oscuro)'
                  : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (colorBlindMode === 'none') {
                e.currentTarget.style.backgroundColor =
                  'var(--color-govco-azul-oscuro)'
              }
            }}
            onMouseLeave={(e) => {
              if (colorBlindMode === 'none') {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
            aria-label="Modo daltonismo"
            aria-expanded={showColorBlindMenu}
            title="Daltonismo"
          >
            <span className="text-2xl mb-1 text-white" aria-hidden="true">
              👁️
            </span>
            <span className="text-xs text-center text-white font-medium">
              Daltonismo
            </span>
          </button>

          {/* Menú de daltonismo */}
          {showColorBlindMenu && (
            <div
              className="absolute right-full top-0 mr-2 w-48 bg-white rounded-lg shadow-xl border-2"
              style={{ borderColor: 'var(--color-govco-marino)' }}
            >
              <button
                onClick={() => changeColorBlindMode('none')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors rounded-t-lg"
                style={{
                  backgroundColor:
                    colorBlindMode === 'none' ? '#e6effd' : 'transparent',
                  color: 'var(--color-govco-gris-oscuro)',
                }}
              >
                ✓ Normal
              </button>
              <button
                onClick={() => changeColorBlindMode('protanopia')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors border-t"
                style={{
                  backgroundColor:
                    colorBlindMode === 'protanopia' ? '#e6effd' : 'transparent',
                  color: 'var(--color-govco-gris-oscuro)',
                }}
              >
                {colorBlindMode === 'protanopia' ? '✓ ' : ''}Protanopia
              </button>
              <button
                onClick={() => changeColorBlindMode('deuteranopia')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors border-t"
                style={{
                  backgroundColor:
                    colorBlindMode === 'deuteranopia'
                      ? '#e6effd'
                      : 'transparent',
                  color: 'var(--color-govco-gris-oscuro)',
                }}
              >
                {colorBlindMode === 'deuteranopia' ? '✓ ' : ''}Deuteranopia
              </button>
              <button
                onClick={() => changeColorBlindMode('tritanopia')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition-colors border-t rounded-b-lg"
                style={{
                  backgroundColor:
                    colorBlindMode === 'tritanopia' ? '#e6effd' : 'transparent',
                  color: 'var(--color-govco-gris-oscuro)',
                }}
              >
                {colorBlindMode === 'tritanopia' ? '✓ ' : ''}Tritanopia
              </button>
            </div>
          )}
        </div>

        {/* Resetear */}
        <button
          onClick={resetPreferences}
          className="w-full px-4 py-3 flex flex-col items-center justify-center transition-colors"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              'var(--color-govco-azul-oscuro)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
          aria-label="Restablecer preferencias de accesibilidad"
          title="Restablecer"
        >
          <span className="text-2xl mb-1 text-white" aria-hidden="true">
            ↺
          </span>
          <span className="text-xs text-center text-white font-medium">
            Restablecer
          </span>
        </button>
      </div>
    </div>
  )
}
