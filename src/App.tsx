import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context/AuthContext'
import { AppRoutes } from '@routes/AppRoutes'

/**
 * Componente principal de la aplicación
 * Configura:
 * - BrowserRouter para navegación
 * - AuthProvider para estado de autenticación
 * - AppRoutes con todas las rutas de la aplicación
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
