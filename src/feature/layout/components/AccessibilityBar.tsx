import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'

/**
 * Componente AccessibilityBar siguiendo el diseno Gov.co
 */
export function AccessibilityBar() {
  const [showScrollTop, setShowScrollTop] = useState(false)

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

  const applyColorBlindFilter = (mode: ColorBlindMode) => {
    document.body.classList.remove(
      'colorblind-protanopia',
      'colorblind-deuteranopia',
      'colorblind-tritanopia'
    )

    if (mode !== 'none') {
      document.body.classList.add(`colorblind-${mode}`)
    }
  }

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`

    if (highContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const buttonBaseClass = 'btn btn-primary rounded-start-3 shadow position-relative overflow-hidden d-flex align-items-center justify-content-center'
  const buttonStyle = { width: '3rem', height: '3rem', transition: 'all 0.3s ease' }

  return (
    <>
      {/* Barra de Accesibilidad */}
      <div
        className="accessibility-bar position-fixed end-0"
        role="toolbar"
        aria-label="Herramientas de accesibilidad"
        style={{
          top: '50vh',
          marginTop: '-9.5rem',
          zIndex: 1030
        }}
      >
        <div className="d-flex flex-column gap-2 align-items-end py-3 pe-2">
          {/* Contraste */}
          <button
            onClick={toggleContrast}
            className={buttonBaseClass}
            style={buttonStyle}
            aria-label={
              highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'
            }
            title="Contraste"
          >
            <span aria-hidden="true">&#9680;</span>
          </button>

          {/* Reducir letra */}
          <button
            onClick={decreaseFontSize}
            disabled={fontSize <= 12}
            className={buttonBaseClass}
            style={buttonStyle}
            aria-label="Reducir tamano de letra"
            title="Reducir letra"
          >
            <span aria-hidden="true" className="fw-bold">A-</span>
          </button>

          {/* Aumentar letra */}
          <button
            onClick={increaseFontSize}
            disabled={fontSize >= 20}
            className={buttonBaseClass}
            style={buttonStyle}
            aria-label="Aumentar tamano de letra"
            title="Aumentar letra"
          >
            <span aria-hidden="true" className="fw-bold fs-5">A+</span>
          </button>

          {/* Daltonismo */}
          <div className="position-relative">
            <button
              onClick={() => setShowColorBlindMenu(!showColorBlindMenu)}
              className={buttonBaseClass}
              style={buttonStyle}
              aria-label="Modo daltonismo"
              aria-expanded={showColorBlindMenu}
              title="Daltonismo"
            >
              <span aria-hidden="true">&#128065;</span>
            </button>

            {showColorBlindMenu && (
              <div
                className="position-absolute end-100 top-0 me-2 bg-white rounded shadow border border-primary"
                style={{ width: '12rem', zIndex: 1050 }}
              >
                <button
                  onClick={() => changeColorBlindMode('none')}
                  className={`btn btn-link text-start w-100 text-decoration-none py-2 px-3 small ${colorBlindMode === 'none' ? 'bg-light' : ''}`}
                >
                  {colorBlindMode === 'none' ? '&#10003; ' : ''}Normal
                </button>
                <button
                  onClick={() => changeColorBlindMode('protanopia')}
                  className={`btn btn-link text-start w-100 text-decoration-none py-2 px-3 small border-top ${colorBlindMode === 'protanopia' ? 'bg-light' : ''}`}
                >
                  {colorBlindMode === 'protanopia' ? '&#10003; ' : ''}Protanopia
                </button>
                <button
                  onClick={() => changeColorBlindMode('deuteranopia')}
                  className={`btn btn-link text-start w-100 text-decoration-none py-2 px-3 small border-top ${colorBlindMode === 'deuteranopia' ? 'bg-light' : ''}`}
                >
                  {colorBlindMode === 'deuteranopia' ? '&#10003; ' : ''}Deuteranopia
                </button>
                <button
                  onClick={() => changeColorBlindMode('tritanopia')}
                  className={`btn btn-link text-start w-100 text-decoration-none py-2 px-3 small border-top ${colorBlindMode === 'tritanopia' ? 'bg-light' : ''}`}
                >
                  {colorBlindMode === 'tritanopia' ? '&#10003; ' : ''}Tritanopia
                </button>
              </div>
            )}
          </div>

          {/* Resetear */}
          <button
            onClick={resetPreferences}
            className={buttonBaseClass}
            style={buttonStyle}
            aria-label="Restablecer preferencias de accesibilidad"
            title="Restablecer"
          >
            <span aria-hidden="true">&#8634;</span>
          </button>
        </div>
      </div>

      {/* Boton Volver Arriba */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="btn btn-success position-fixed rounded-circle shadow d-flex align-items-center justify-content-center"
          style={{
            right: '1rem',
            bottom: '2rem',
            width: '3rem',
            height: '3rem',
            zIndex: 1020
          }}
          aria-label="Volver arriba"
        >
          <FaArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </>
  )
}
