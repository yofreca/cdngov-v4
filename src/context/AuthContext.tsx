import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

// Crear el contexto (React 19 ya no requiere Provider wrapper obligatorio)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider de autenticación para la aplicación
 * Maneja el estado de autenticación del usuario
 *
 * En React 19, createContext ya no requiere un Provider wrapper,
 * pero lo mantenemos para compatibilidad y claridad
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    // Simulación de login (en producción, hacer llamada a API)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Usuario mock
    if (email && password) {
      setUser({
        id: '1',
        name: 'Usuario Demo',
        email: email,
      })
    } else {
      throw new Error('Credenciales inválidas')
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return <AuthContext value={value}>{children}</AuthContext>
}

/**
 * Hook para usar el contexto de autenticación
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }

  return context
}
