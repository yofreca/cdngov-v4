import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService, type User } from '@services/authService'
import { securityLogger, SecurityEventType, SecurityLevel } from '@utils/securityLogger'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string, rememberMe?: boolean) => void
  logout: () => Promise<void>
  updateUser: (user: User) => void
}

// Crear el contexto (React 19 ya no requiere Provider wrapper obligatorio)
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * Provider de autenticación mejorado - Fase 6
 * - Persistencia de sesión con localStorage/sessionStorage
 * - Manejo de tokens JWT
 * - Validación automática de tokens
 * - Renovación automática de tokens
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Inicializar autenticación desde storage al cargar
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = authService.getUser()
        const token = authService.getToken()

        if (storedUser && token) {
          // Verificar si el token ha expirado
          if (authService.isTokenExpired(token)) {
            // Intentar renovar el token
            const newToken = await authService.refreshAuthToken()

            if (newToken) {
              setUser(storedUser)
              securityLogger.log(
                SecurityEventType.LOGIN_SUCCESS,
                SecurityLevel.INFO,
                'Sesión restaurada después de renovar token',
                { userId: storedUser.id }
              )
            } else {
              // No se pudo renovar, limpiar todo
              authService.clearAuthData()
              securityLogger.log(
                SecurityEventType.LOGOUT,
                SecurityLevel.WARNING,
                'Sesión expirada y datos limpiados',
                { userId: storedUser.id }
              )
            }
          } else {
            // Token válido, restaurar sesión
            setUser(storedUser)
            securityLogger.log(
              SecurityEventType.LOGIN_SUCCESS,
              SecurityLevel.INFO,
              'Sesión restaurada desde storage',
              { userId: storedUser.id }
            )
          }
        }
      } catch (error) {
        // Si hay error, limpiar todo por seguridad
        authService.clearAuthData()
        securityLogger.log(
          SecurityEventType.API_ERROR,
          SecurityLevel.ERROR,
          'Error al restaurar sesión',
          { error: error instanceof Error ? error.message : 'Unknown error' }
        )
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // Renovación automática de token antes de que expire
  useEffect(() => {
    if (!user) return

    const checkAndRefreshToken = async () => {
      const token = authService.getToken()
      if (!token) return

      // Renovar si falta menos de 5 minutos para expirar
      const decoded = authService.decodeToken(token)
      if (decoded && decoded.exp) {
        const expirationTime = decoded.exp * 1000
        const currentTime = Date.now()
        const timeUntilExpiration = expirationTime - currentTime
        const fiveMinutes = 5 * 60 * 1000

        if (timeUntilExpiration < fiveMinutes && timeUntilExpiration > 0) {
          const newToken = await authService.refreshAuthToken()
          if (!newToken) {
            // No se pudo renovar, cerrar sesión
            await logout()
          }
        }
      }
    }

    // Verificar cada minuto
    const interval = setInterval(checkAndRefreshToken, 60 * 1000)
    return () => clearInterval(interval)
  }, [user])

  const login = (user: User, token: string, rememberMe: boolean = false) => {
    authService.setAuthData(user, token, undefined, rememberMe)
    setUser(user)

    securityLogger.log(
      SecurityEventType.LOGIN_SUCCESS,
      SecurityLevel.INFO,
      'Contexto de autenticación actualizado',
      { userId: user.id }
    )
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)

      securityLogger.log(
        SecurityEventType.LOGOUT,
        SecurityLevel.INFO,
        'Logout exitoso, contexto actualizado',
        {}
      )
    } catch (error) {
      // Limpiar datos locales incluso si falla
      setUser(null)

      securityLogger.log(
        SecurityEventType.API_ERROR,
        SecurityLevel.WARNING,
        'Error al hacer logout',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      )
    }
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    const token = authService.getToken()
    const rememberMe = localStorage.getItem('remember_me') === 'true'

    if (token) {
      authService.setAuthData(updatedUser, token, undefined, rememberMe)
    }

    securityLogger.log(
      SecurityEventType.LOGIN_SUCCESS,
      SecurityLevel.INFO,
      'Información de usuario actualizada',
      { userId: updatedUser.id }
    )
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
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
