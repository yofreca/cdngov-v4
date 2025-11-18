/**
 * Sistema de Logging de Seguridad
 * OWASP A09 - Security Logging and Monitoring Failures
 *
 * Registra eventos de seguridad sin exponer información sensible
 */

export const SecurityEventType = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',
  PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  FILE_UPLOAD: 'FILE_UPLOAD',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const

export type SecurityEventType = typeof SecurityEventType[keyof typeof SecurityEventType]

export const SecurityLevel = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  CRITICAL: 'CRITICAL',
} as const

export type SecurityLevel = typeof SecurityLevel[keyof typeof SecurityLevel]

interface SecurityEvent {
  timestamp: string
  type: SecurityEventType
  level: SecurityLevel
  message: string
  userId?: string
  ip?: string
  userAgent?: string
  url?: string
  metadata?: Record<string, unknown>
}

class SecurityLogger {
  private static instance: SecurityLogger
  private events: SecurityEvent[] = []
  private maxEvents = 100 // Guardar últimos 100 eventos en memoria

  private constructor() {
    // Privado para singleton
  }

  public static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger()
    }
    return SecurityLogger.instance
  }

  /**
   * Registrar evento de seguridad
   */
  public log(
    type: SecurityEventType,
    level: SecurityLevel,
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    const event: SecurityEvent = {
      timestamp: new Date().toISOString(),
      type,
      level,
      message,
      userId: this.getCurrentUserId(),
      ip: this.getClientIP(),
      userAgent: navigator.userAgent,
      url: window.location.pathname,
      metadata: this.sanitizeMetadata(metadata),
    }

    // Agregar a la cola de eventos
    this.events.push(event)

    // Mantener solo los últimos maxEvents
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    // Enviar a consola en desarrollo
    if (import.meta.env.DEV) {
      this.logToConsole(event)
    }

    // En producción, enviar al servidor (implementar según necesidad)
    if (import.meta.env.PROD && level !== SecurityLevel.INFO) {
      this.sendToServer(event)
    }

    // Guardar en localStorage para análisis (solo eventos críticos)
    if (level === SecurityLevel.CRITICAL || level === SecurityLevel.ERROR) {
      this.saveToLocalStorage(event)
    }
  }

  /**
   * Obtener ID del usuario actual (sin exponer datos sensibles)
   */
  private getCurrentUserId(): string | undefined {
    try {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        // Retornar solo el ID, no información personal
        return user.id || undefined
      }
    } catch {
      return undefined
    }
    return undefined
  }

  /**
   * Obtener IP del cliente (aproximada, solo para logging)
   */
  private getClientIP(): string {
    // En producción, esto vendría del servidor
    return 'client-side'
  }

  /**
   * Sanitizar metadata para remover información sensible
   */
  private sanitizeMetadata(
    metadata?: Record<string, unknown>
  ): Record<string, unknown> | undefined {
    if (!metadata) return undefined

    const sanitized: Record<string, unknown> = {}
    const sensitiveKeys = [
      'password',
      'token',
      'secret',
      'authorization',
      'cookie',
      'session',
    ]

    for (const [key, value] of Object.entries(metadata)) {
      const lowerKey = key.toLowerCase()

      // Omitir claves sensibles
      if (sensitiveKeys.some((sensitive) => lowerKey.includes(sensitive))) {
        sanitized[key] = '[REDACTED]'
        continue
      }

      // Truncar strings largos
      if (typeof value === 'string' && value.length > 100) {
        sanitized[key] = value.substring(0, 100) + '...'
        continue
      }

      sanitized[key] = value
    }

    return sanitized
  }

  /**
   * Logear a consola con formato
   */
  private logToConsole(event: SecurityEvent): void {
    const emoji = this.getLevelEmoji(event.level)
    const style = this.getLevelStyle(event.level)

    console.log(
      `%c${emoji} [${event.type}] ${event.message}`,
      style,
      {
        timestamp: event.timestamp,
        level: event.level,
        url: event.url,
        userId: event.userId,
        metadata: event.metadata,
      }
    )
  }

  /**
   * Enviar evento al servidor
   */
  private async sendToServer(event: SecurityEvent): Promise<void> {
    try {
      // Implementar según tu backend
      const endpoint = import.meta.env.VITE_SECURITY_LOG_ENDPOINT

      if (!endpoint) return

      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      // No logear errores de logging para evitar loops
      console.error('Error al enviar log de seguridad:', error)
    }
  }

  /**
   * Guardar en localStorage para análisis posterior
   */
  private saveToLocalStorage(event: SecurityEvent): void {
    try {
      const key = 'security-logs'
      const logsStr = localStorage.getItem(key)
      const logs: SecurityEvent[] = logsStr ? JSON.parse(logsStr) : []

      logs.push(event)

      // Mantener solo los últimos 50 eventos críticos
      if (logs.length > 50) {
        logs.shift()
      }

      localStorage.setItem(key, JSON.stringify(logs))
    } catch {
      // Ignorar errores de localStorage (quota exceeded, etc.)
    }
  }

  /**
   * Obtener emoji según nivel
   */
  private getLevelEmoji(level: SecurityLevel): string {
    switch (level) {
      case SecurityLevel.INFO:
        return 'ℹ️'
      case SecurityLevel.WARNING:
        return '⚠️'
      case SecurityLevel.ERROR:
        return '❌'
      case SecurityLevel.CRITICAL:
        return '🚨'
      default:
        return '📝'
    }
  }

  /**
   * Obtener estilo CSS según nivel
   */
  private getLevelStyle(level: SecurityLevel): string {
    switch (level) {
      case SecurityLevel.INFO:
        return 'color: #0ea5e9; font-weight: bold;'
      case SecurityLevel.WARNING:
        return 'color: #f59e0b; font-weight: bold;'
      case SecurityLevel.ERROR:
        return 'color: #ef4444; font-weight: bold;'
      case SecurityLevel.CRITICAL:
        return 'color: #dc2626; font-weight: bold; background: #fee2e2; padding: 2px 4px;'
      default:
        return 'color: #6b7280;'
    }
  }

  /**
   * Obtener todos los eventos registrados
   */
  public getEvents(): SecurityEvent[] {
    return [...this.events]
  }

  /**
   * Limpiar eventos de memoria
   */
  public clearEvents(): void {
    this.events = []
  }

  /**
   * Exportar eventos a JSON para análisis
   */
  public exportEvents(): string {
    return JSON.stringify(this.events, null, 2)
  }

  /**
   * Alias para log() - compatibilidad con llamadas existentes
   */
  public logSecurityEvent(
    type: SecurityEventType,
    level: SecurityLevel,
    message: string,
    metadata?: Record<string, unknown>
  ): void {
    this.log(type, level, message, metadata)
  }
}

// Instancia singleton
export const securityLogger = SecurityLogger.getInstance()

// Funciones de conveniencia
export const logSecurityEvent = (
  type: SecurityEventType,
  level: SecurityLevel,
  message: string,
  metadata?: Record<string, unknown>
) => {
  securityLogger.log(type, level, message, metadata)
}

export const logLoginSuccess = (userId: string) => {
  securityLogger.log(
    SecurityEventType.LOGIN_SUCCESS,
    SecurityLevel.INFO,
    'Usuario inició sesión correctamente',
    { userId }
  )
}

export const logLoginFailure = (email: string) => {
  securityLogger.log(
    SecurityEventType.LOGIN_FAILURE,
    SecurityLevel.WARNING,
    'Intento de login fallido',
    { email: email.substring(0, 3) + '***' } // Parcialmente oculto
  )
}

export const logUnauthorizedAccess = (resource: string) => {
  securityLogger.log(
    SecurityEventType.UNAUTHORIZED_ACCESS,
    SecurityLevel.ERROR,
    'Acceso no autorizado a recurso',
    { resource }
  )
}

export const logSuspiciousActivity = (reason: string) => {
  securityLogger.log(
    SecurityEventType.SUSPICIOUS_ACTIVITY,
    SecurityLevel.CRITICAL,
    'Actividad sospechosa detectada',
    { reason }
  )
}

export default securityLogger
