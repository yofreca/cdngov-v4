import { useState, useEffect, useRef, memo } from 'react'
import { clsx } from 'clsx'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  width?: number | string
  height?: number | string
  onLoad?: () => void
  onError?: () => void
}

/**
 * LazyImage Component
 * Componente de imagen con lazy loading optimizado
 */
export const LazyImage = memo(function LazyImage({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f2f2f2"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23999"%3ECargando...%3C/text%3E%3C/svg%3E',
  width,
  height,
  onLoad,
  onError,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setImageSrc(src)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src)
            if (imgRef.current) {
              observer.unobserve(imgRef.current)
            }
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
    onError?.()
  }

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={clsx(
        className,
        'transition-all',
        {
          'opacity-100': isLoaded,
          'opacity-0': !isLoaded,
          'bg-light': hasError,
        }
      )}
      style={{ transitionDuration: '300ms' }}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
    />
  )
})
