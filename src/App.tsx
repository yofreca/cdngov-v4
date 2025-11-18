import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'
import { AppRoutes } from '@routes/AppRoutes'
import { ErrorBoundary } from '@shared/components/ui'

/**
 * Componente principal de la aplicación
 * Configura:
 * - ErrorBoundary para capturar errores de React
 * - BrowserRouter para navegación
 * - AuthProvider para estado de autenticación
 * - AppRoutes con lazy loading y code splitting
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
