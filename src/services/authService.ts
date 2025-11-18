/**
 * Servicio de Autenticación - Fase 6
 * - Manejo de tokens JWT
 * - Persistencia en localStorage/sessionStorage
 * - Validación y renovación de tokens
 * - Seguridad OWASP
 */

// import { api } from './api' // No usado por ahora
import { securityLogger, SecurityEventType, SecurityLevel } from '@utils/securityLogger'

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn?: number
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  cedula: string
  phone: string
}

const TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_KEY = 'auth_user'
const REMEMBER_ME_KEY = 'remember_me'

/**
 * Servicio de autenticación con JWT
 */
class AuthService {
  /**
   * Obtiene el token de autenticación almacenado
   */
  getToken(): string | null {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'
    const storage = rememberMe ? localStorage : sessionStorage
    return storage.getItem(TOKEN_KEY)
  }

  /**
   * Obtiene el refresh token almacenado
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }

  /**
   * Obtiene el usuario almacenado
   */
  getUser(): User | null {
    try {
      const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'
      const storage = rememberMe ? localStorage : sessionStorage
      const userJson = storage.getItem(USER_KEY)
      return userJson ? JSON.parse(userJson) : null
    } catch (error) {
      securityLogger.log(
        SecurityEventType.API_ERROR,
        SecurityLevel.WARNING,
        'Error al obtener usuario de storage',
        { error: error instanceof Error ? error.message : 'Unknown error' }
      )
      return null
    }
  }

  /**
   * Almacena el token y usuario
   */
  setAuthData(
    user: User,
    token: string,
    refreshToken?: string,
    rememberMe: boolean = false
  ): void {
    const storage = rememberMe ? localStorage : sessionStorage

    storage.setItem(TOKEN_KEY, token)
    storage.setItem(USER_KEY, JSON.stringify(user))
    localStorage.setItem(REMEMBER_ME_KEY, String(rememberMe))

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    }

    securityLogger.log(
      SecurityEventType.LOGIN_SUCCESS,
      SecurityLevel.INFO,
      'Datos de autenticación almacenados',
      { userId: user.id }
    )
  }

  /**
   * Limpia todos los datos de autenticación
   */
  clearAuthData(): void {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(USER_KEY)
    localStorage.removeItem(REMEMBER_ME_KEY)

    securityLogger.log(
      SecurityEventType.LOGOUT,
      SecurityLevel.INFO,
      'Datos de autenticación limpiados',
      {}
    )
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  /**
   * Decodifica un token JWT (sin verificar firma - solo para leer datos)
   * ADVERTENCIA: No usar para validación de seguridad, solo para UI
   */
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]
      const decoded = atob(payload)
      return JSON.parse(decoded)
    } catch (error) {
      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.WARNING, {
        action: 'token_decode_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      return null
    }
  }

  /**
   * Verifica si el token ha expirado
   */
  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.decodeToken(token)
      if (!decoded || !decoded.exp) return true

      const expirationTime = decoded.exp * 1000 // Convertir a milisegundos
      const currentTime = Date.now()

      return currentTime >= expirationTime
    } catch (error) {
      return true
    }
  }

  /**
   * Login de usuario
   * En producción, esto haría una llamada al backend
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulación de llamada a API
      // En producción, usar: const response = await api.post('/auth/login', credentials)

      // MOCK: Simular respuesta de servidor
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Credenciales de prueba
      if (
        credentials.email === 'admin@arn.gov.co' &&
        credentials.password === 'Admin123!'
      ) {
        const mockResponse: AuthResponse = {
          user: {
            id: '1',
            name: 'Administrador ARN',
            email: credentials.email,
            role: 'admin',
          },
          token: this.generateMockToken({
            userId: '1',
            email: credentials.email,
            role: 'admin',
          }),
          refreshToken: this.generateMockToken({ type: 'refresh' }),
          expiresIn: 3600, // 1 hora
        }

        this.setAuthData(
          mockResponse.user,
          mockResponse.token,
          mockResponse.refreshToken,
          credentials.rememberMe
        )

        securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.INFO, {
          action: 'login_success',
          userId: mockResponse.user.id,
          email: mockResponse.user.email,
        })

        return mockResponse
      }

      throw new Error('Credenciales inválidas')
    } catch (error) {
      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.WARNING, {
        action: 'login_failed',
        email: credentials.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  }

  /**
   * Registro de nuevo usuario
   * En producción, esto haría una llamada al backend
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      // Simulación de llamada a API
      // En producción, usar: const response = await api.post('/auth/register', data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockResponse: AuthResponse = {
        user: {
          id: Date.now().toString(),
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          role: 'user',
        },
        token: this.generateMockToken({
          userId: Date.now().toString(),
          email: data.email,
          role: 'user',
        }),
        refreshToken: this.generateMockToken({ type: 'refresh' }),
        expiresIn: 3600,
      }

      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.INFO, {
        action: 'user_registered',
        userId: mockResponse.user.id,
        email: mockResponse.user.email,
      })

      return mockResponse
    } catch (error) {
      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.ERROR, {
        action: 'registration_failed',
        email: data.email,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  }

  /**
   * Logout de usuario
   */
  async logout(): Promise<void> {
    try {
      const user = this.getUser()

      // En producción, invalidar el token en el servidor
      // await api.post('/auth/logout')

      this.clearAuthData()

      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.INFO, {
        action: 'logout_success',
        userId: user?.id,
      })
    } catch (error) {
      // Limpiar datos locales incluso si falla la llamada al servidor
      this.clearAuthData()

      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.WARNING, {
        action: 'logout_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  /**
   * Solicitar restablecimiento de contraseña
   */
  async requestPasswordReset(email: string): Promise<void> {
    try {
      // En producción: await api.post('/auth/forgot-password', { email })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.INFO, {
        action: 'password_reset_requested',
        email,
      })
    } catch (error) {
      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.ERROR, {
        action: 'password_reset_request_error',
        email,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  }

  /**
   * Restablecer contraseña con token
   */
  async resetPassword(_token: string, _newPassword: string): Promise<void> {
    try {
      // En producción: await api.post('/auth/reset-password', { token, password: newPassword })

      await new Promise((resolve) => setTimeout(resolve, 2000))

      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.INFO, {
        action: 'password_reset_success',
      })
    } catch (error) {
      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.ERROR, {
        action: 'password_reset_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      throw error
    }
  }

  /**
   * Renovar token con refresh token
   */
  async refreshAuthToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) return null

      // En producción: const response = await api.post('/auth/refresh', { refreshToken })

      // MOCK: Generar nuevo token
      await new Promise((resolve) => setTimeout(resolve, 500))
      const newToken = this.generateMockToken({ type: 'access' })

      const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'
      const storage = rememberMe ? localStorage : sessionStorage
      storage.setItem(TOKEN_KEY, newToken)

      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.INFO, {
        action: 'token_refreshed',
      })

      return newToken
    } catch (error) {
      securityLogger.logSecurityEvent(SecurityEventType.LOGIN_SUCCESS, SecurityLevel.WARNING, {
        action: 'token_refresh_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      })

      // Si falla el refresh, limpiar todo y forzar re-login
      this.clearAuthData()
      return null
    }
  }

  /**
   * Generar token mock para desarrollo
   * En producción, el token viene del servidor
   */
  private generateMockToken(payload: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payloadStr = btoa(
      JSON.stringify({
        ...payload,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
      })
    )
    const signature = btoa('mock-signature')
    return `${header}.${payloadStr}.${signature}`
  }
}

// Exportar instancia única del servicio
export const authService = new AuthService()
