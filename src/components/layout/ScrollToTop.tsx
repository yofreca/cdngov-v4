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
        <div className="scroll-to-top fixed bottom-8 right-4 z-40">
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: 'var(--color-govco-marino)' }}
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
