import { useState, useEffect } from 'react'

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'

/**
 * Componente AccessibilityBar siguiendo el diseño Gov.co
 * - Contraste alto/bajo
 * - Aumentar/disminuir tamaño de letra
 * - Modo daltonismo (protanopia, deuteranopia, tritanopia)
 * - Botón volver arriba
 * - Persistencia de preferencias en localStorage
 * - Diseño compacto: Solo iconos, texto visible al hacer hover
 * - Animación: icono se desplaza a la izquierda y aparece texto
 */
export function AccessibilityBar() {
  const [showScrollTop, setShowScrollTop] = useState(false)

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Detectar scroll para mostrar/ocultar botón "Volver arriba"
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Barra de Accesibilidad */}
      <div
        className="accessibility-bar fixed right-0 z-50"
        role="toolbar"
        aria-label="Herramientas de accesibilidad"
        style={{
          top: '50%',
          transform: 'translateY(-50%)'
        }}
      >
        <div className="flex flex-col gap-2 items-end py-4 pr-2">
          {/* Contraste */}
          <button
            onClick={toggleContrast}
            className="group relative h-12 w-12 flex items-center justify-center overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out hover:w-44 hover:pr-1"
            style={{
              backgroundColor: highContrast
                ? 'var(--color-govco-azul-oscuro)'
                : 'var(--color-govco-marino)',
            }}
            aria-label={
              highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'
            }
          >
            <span className="absolute left-3 text-sm text-white font-medium opacity-0 whitespace-nowrap transition-opacity duration-300 delay-75 group-hover:opacity-100 pointer-events-none">
              Contraste
            </span>
            <span className="absolute right-3 text-xl text-white transition-all duration-300 group-hover:right-3" aria-hidden="true">
              ◐
            </span>
          </button>

          {/* Reducir letra */}
          <button
            onClick={decreaseFontSize}
            disabled={fontSize <= 12}
            className="group relative h-12 w-12 flex items-center justify-center overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out hover:w-44 hover:pr-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:w-12"
            style={{ backgroundColor: 'var(--color-govco-marino)' }}
            aria-label="Reducir tamaño de letra"
          >
            <span className="absolute left-3 text-sm text-white font-medium opacity-0 whitespace-nowrap transition-opacity duration-300 delay-75 group-hover:opacity-100 pointer-events-none">
              Reducir letra
            </span>
            <span className="absolute right-3 text-lg text-white font-bold transition-all duration-300 group-hover:right-3" aria-hidden="true">
              A-
            </span>
          </button>

          {/* Aumentar letra */}
          <button
            onClick={increaseFontSize}
            disabled={fontSize >= 20}
            className="group relative h-12 w-12 flex items-center justify-center overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out hover:w-44 hover:pr-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:w-12"
            style={{ backgroundColor: 'var(--color-govco-marino)' }}
            aria-label="Aumentar tamaño de letra"
          >
            <span className="absolute left-3 text-sm text-white font-medium opacity-0 whitespace-nowrap transition-opacity duration-300 delay-75 group-hover:opacity-100 pointer-events-none">
              Aumentar letra
            </span>
            <span className="absolute right-3 text-xl text-white font-bold transition-all duration-300 group-hover:right-3" aria-hidden="true">
              A+
            </span>
          </button>

          {/* Daltonismo */}
          <button
            onClick={() => setShowColorBlindMenu(!showColorBlindMenu)}
            className="group relative h-12 w-12 flex items-center justify-center overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out hover:w-44 hover:pr-1"
            style={{
              backgroundColor:
                colorBlindMode !== 'none'
                  ? 'var(--color-govco-azul-oscuro)'
                  : 'var(--color-govco-marino)',
            }}
            aria-label="Modo daltonismo"
            aria-expanded={showColorBlindMenu}
          >
            <span className="absolute left-3 text-sm text-white font-medium opacity-0 whitespace-nowrap transition-opacity duration-300 delay-75 group-hover:opacity-100 pointer-events-none">
              Daltonismo
            </span>
            <span className="absolute right-3 text-xl text-white transition-all duration-300 group-hover:right-3" aria-hidden="true">
              👁️
            </span>
          </button>

          {/* Resetear */}
          <button
            onClick={resetPreferences}
            className="group relative h-12 w-12 flex items-center justify-center overflow-hidden rounded-l-lg shadow-lg transition-all duration-300 ease-in-out hover:w-44 hover:pr-1"
            style={{ backgroundColor: 'var(--color-govco-marino)' }}
            aria-label="Restablecer preferencias de accesibilidad"
          >
            <span className="absolute left-3 text-sm text-white font-medium opacity-0 whitespace-nowrap transition-opacity duration-300 delay-75 group-hover:opacity-100 pointer-events-none">
              Restablecer
            </span>
            <span className="absolute right-3 text-xl text-white transition-all duration-300 group-hover:right-3" aria-hidden="true">
              ↺
            </span>
          </button>
        </div>
      </div>

      {/* Menú de daltonismo (fuera del contenedor con overflow) */}
      {showColorBlindMenu && (
        <div
          className="fixed right-16 top-1/2 w-48 bg-white rounded-lg shadow-xl border-2 z-50"
          style={{
            borderColor: 'var(--color-govco-marino)',
            transform: 'translateY(-50%)'
          }}
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
                  {colorBlindMode === 'none' ? '✓ ' : ''}Normal
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

      {/* Botón Volver Arriba */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="group fixed right-4 bottom-8 h-12 w-12 flex items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-300 ease-in-out hover:w-40 hover:rounded-lg hover:pr-1 z-40"
          style={{ backgroundColor: 'var(--color-govco-verde-azulado)' }}
          aria-label="Volver arriba"
        >
          <span className="absolute left-3 text-sm text-white font-medium opacity-0 whitespace-nowrap transition-opacity duration-300 delay-75 group-hover:opacity-100 pointer-events-none">
            Volver arriba
          </span>
          <span className="absolute right-3 text-2xl text-white transition-all duration-300 group-hover:right-3" aria-hidden="true">
            ↑
          </span>
        </button>
      )}
    </>
  )
}
