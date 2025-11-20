import { useState, useEffect } from 'react'

/**
 * Componente ScrollToTop siguiendo el diseno Gov.co
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

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
        <div className="scroll-to-top position-fixed" style={{ bottom: '2rem', right: '1rem', zIndex: 1020 }}>
          <button
            onClick={scrollToTop}
            className="btn btn-primary rounded-circle shadow d-flex align-items-center justify-content-center p-0"
            style={{ width: '3rem', height: '3rem' }}
            aria-label="Volver arriba"
            title="Volver arriba"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              width="24"
              height="24"
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
