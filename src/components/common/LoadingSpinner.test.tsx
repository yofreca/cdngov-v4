/**
 * Tests para el componente LoadingSpinner
 * Verifica tamaños, mensajes, fullScreen y accesibilidad
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@test/test-utils'
import { LoadingSpinner } from './LoadingSpinner'

describe('LoadingSpinner Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar correctamente', () => {
      render(<LoadingSpinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toBeInTheDocument()
    })

    it('debe mostrar texto de "Cargando..." accesible', () => {
      render(<LoadingSpinner />)
      expect(screen.getByText(/cargando\.\.\./i)).toBeInTheDocument()
    })

    it('debe tener clase de animación spin', () => {
      render(<LoadingSpinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('animate-spin')
    })
  })

  describe('Tamaños', () => {
    it('debe aplicar tamaño medium por defecto', () => {
      render(<LoadingSpinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('h-12', 'w-12')
    })

    it('debe aplicar tamaño small', () => {
      render(<LoadingSpinner size="small" />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('h-6', 'w-6')
    })

    it('debe aplicar tamaño large', () => {
      render(<LoadingSpinner size="large" />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('h-16', 'w-16')
    })
  })

  describe('Mensaje personalizado', () => {
    it('debe mostrar mensaje cuando se proporciona', () => {
      render(<LoadingSpinner message="Cargando datos..." />)
      expect(screen.getByText('Cargando datos...')).toBeInTheDocument()
    })

    it('no debe mostrar mensaje adicional cuando no se proporciona', () => {
      const { container } = render(<LoadingSpinner />)
      const messages = container.querySelectorAll('p')
      expect(messages).toHaveLength(0)
    })

    it('debe mostrar mensajes largos correctamente', () => {
      const longMessage = 'Estamos cargando tus datos, por favor espera un momento...'
      render(<LoadingSpinner message={longMessage} />)
      expect(screen.getByText(longMessage)).toBeInTheDocument()
    })
  })

  describe('Modo fullScreen', () => {
    it('debe aplicar estilos de pantalla completa cuando fullScreen es true', () => {
      const { container } = render(<LoadingSpinner fullScreen />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center')
    })

    it('no debe aplicar estilos de pantalla completa por defecto', () => {
      const { container } = render(<LoadingSpinner />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper).not.toHaveClass('min-h-screen')
    })

    it('debe centrar contenido en modo fullScreen', () => {
      const { container } = render(<LoadingSpinner fullScreen message="Cargando..." />)
      const textCenter = container.querySelector('.text-center')
      expect(textCenter).toBeInTheDocument()
    })
  })

  describe('Accesibilidad', () => {
    it('debe tener role="status" para lectores de pantalla', () => {
      render(<LoadingSpinner />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('debe tener clase sr-only para texto accesible', () => {
      render(<LoadingSpinner />)
      const srText = screen.getByText(/cargando\.\.\./i)
      expect(srText).toHaveClass('sr-only')
    })

    it('debe respetar motion-reduce para animaciones', () => {
      render(<LoadingSpinner />)
      const spinner = screen.getByRole('status')
      expect(spinner.className).toContain('motion-reduce:animate-')
    })
  })

  describe('Estilos Gov.co', () => {
    it('debe usar color govco-marino para el spinner', () => {
      render(<LoadingSpinner />)
      const spinner = screen.getByRole('status')
      expect(spinner).toHaveClass('border-govco-marino')
    })

    it('debe usar fuente Work Sans para el mensaje', () => {
      render(<LoadingSpinner message="Test message" />)
      const message = screen.getByText('Test message')
      expect(message).toHaveClass('font-worksans')
    })

    it('debe usar color govco-gris para el texto del mensaje', () => {
      render(<LoadingSpinner message="Test message" />)
      const message = screen.getByText('Test message')
      expect(message).toHaveClass('text-govco-gris')
    })
  })

  describe('React.memo optimization', () => {
    it('debe ser un componente memoizado', () => {
      // memo() wraps the component, so the displayName should be different
      expect(LoadingSpinner).toBeDefined()
      // Los componentes memoizados por React.memo tienen una estructura interna específica
      expect(typeof LoadingSpinner).toBe('object')
    })
  })
})
