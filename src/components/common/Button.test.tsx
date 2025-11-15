/**
 * Tests para el componente Button
 * Verifica variantes, tamaños, estados y accesibilidad
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@test/test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
  describe('Renderizado básico', () => {
    it('debe renderizar correctamente con children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('debe aplicar className personalizado', () => {
      render(<Button className="custom-class">Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('debe tener type="button" por defecto', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    })

    it('debe permitir cambiar el type', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })
  })

  describe('Variantes', () => {
    it('debe aplicar estilo primary por defecto', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({
        backgroundColor: 'var(--color-govco-marino)',
        color: 'white',
      })
    })

    it('debe aplicar estilo secondary', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({
        backgroundColor: 'var(--color-govco-verde)',
        color: 'white',
      })
    })

    it('debe aplicar estilo outline', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        border: '2px solid var(--color-govco-marino)',
      })
    })

    it('debe aplicar estilo danger', () => {
      render(<Button variant="danger">Danger</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({
        backgroundColor: 'var(--color-govco-rojo)',
        color: 'white',
      })
    })

    it('debe aplicar estilo link', () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveStyle({
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      })
    })
  })

  describe('Tamaños', () => {
    it('debe aplicar tamaño md por defecto', () => {
      render(<Button>Medium</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-6', 'py-3', 'text-base')
    })

    it('debe aplicar tamaño sm', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-sm')
    })

    it('debe aplicar tamaño lg', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-8', 'py-4', 'text-lg')
    })
  })

  describe('Estado fullWidth', () => {
    it('debe aplicar width completo cuando fullWidth es true', () => {
      render(<Button fullWidth>Full Width</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('w-full')
    })

    it('no debe aplicar width completo por defecto', () => {
      render(<Button>Normal Width</Button>)
      const button = screen.getByRole('button')
      expect(button).not.toHaveClass('w-full')
    })
  })

  describe('Estado loading', () => {
    it('debe mostrar spinner cuando loading es true', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      const spinner = button.querySelector('svg')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('animate-spin')
    })

    it('debe deshabilitar el botón cuando loading es true', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('debe tener aria-busy="true" cuando loading', () => {
      render(<Button loading>Loading</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
    })
  })

  describe('Estado disabled', () => {
    it('debe deshabilitar el botón cuando disabled es true', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('debe tener aria-disabled="true" cuando disabled', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('debe aplicar clase de opacidad cuando disabled', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
    })
  })

  describe('Interacciones', () => {
    it('debe llamar onClick cuando se hace click', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('no debe llamar onClick cuando está disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick} disabled>Disabled</Button>)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('no debe llamar onClick cuando está loading', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick} loading>Loading</Button>)
      const button = screen.getByRole('button')

      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Accesibilidad', () => {
    it('debe tener role="button"', () => {
      render(<Button>Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('debe ser navegable por teclado', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Button</Button>)
      const button = screen.getByRole('button')

      button.focus()
      expect(button).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })

    it('debe tener clases de focus visible', () => {
      render(<Button>Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2')
    })
  })

  describe('ForwardRef', () => {
    it('debe soportar ref', () => {
      const ref = { current: null }
      render(<Button ref={ref}>Button</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
