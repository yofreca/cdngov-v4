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
        <div className="scroll-to-top fixed bottom-4 right-4 z-40">
          <button
            onClick={scrollToTop}
            className="flex flex-col items-center justify-center px-2 py-2 rounded-lg shadow-lg transition-all hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: 'var(--color-govco-marino)' }}
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <span className="text-white text-lg">↑</span>
            <span className="text-white text-[10px] font-medium leading-tight">
              Arriba
            </span>
          </button>
        </div>
      )}
    </>
  )
}
