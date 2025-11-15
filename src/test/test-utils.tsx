/**
 * Utilidades para testing
 * Wrapper personalizado con providers necesarios
 */

import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'

interface AllTheProvidersProps {
  children: React.ReactNode
}

/**
 * Wrapper con todos los providers necesarios para testing
 */
function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  )
}

/**
 * Render personalizado que incluye todos los providers
 * Usa este en lugar de render() de @testing-library/react
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// Re-exportar todo de @testing-library/react
export * from '@testing-library/react'

// Sobrescribir render con nuestro customRender
export { customRender as render }
