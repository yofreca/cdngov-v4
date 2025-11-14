import { useState, useEffect } from 'react'

/**
 * Componente ScrollToTop siguiendo el diseño Gov.co
 * - Botón para volver al inicio de la página
 * - Aparece al hacer scroll hacia abajo
 * - Animación suave
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar botón cuando el usuario hace scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <div className="scroll-to-top fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center justify-center px-4 py-3 rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: 'var(--color-govco-marino)' }}
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <span className="text-white text-2xl mb-1">↑</span>
            <span className="text-white text-xs font-medium">
              Volver arriba
            </span>
          </button>
        </div>
      )}
    </>
  )
}
