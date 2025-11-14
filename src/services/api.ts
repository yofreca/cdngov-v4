import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import DOMPurify from 'dompurify'

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'
const API_TIMEOUT = 30000 // 30 segundos
const MAX_RETRIES = 3

/**
 * Instancia de Axios con configuración de seguridad OWASP
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Prevención CSRF
  },
  withCredentials: true, // Enviar cookies (para CSRF tokens)
})

/**
 * Sanitizar datos de entrada antes de enviar al servidor
 * Prevención de XSS e Injection (OWASP A03, A07)
 */
const sanitizeData = (data: unknown): unknown => {
  if (typeof data === 'string') {
    return DOMPurify.sanitize(data, { ALLOWED_TAGS: [] })
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData)
  }

  if (data && typeof data === 'object') {
    const sanitized: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeData(value)
    }
    return sanitized
  }

  return data
}

/**
 * Interceptor de Request - Agregar headers de seguridad
 * OWASP A05 - Security Misconfiguration
 */
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Agregar CSRF token si existe
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content')
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken
    }

    // Sanitizar datos antes de enviar (solo para POST, PUT, PATCH)
    if (
      config.data &&
      ['post', 'put', 'patch'].includes(config.method?.toLowerCase() || '')
    ) {
      config.data = sanitizeData(config.data)
    }

    // Agregar timestamp para prevenir replay attacks
    config.headers['X-Request-Timestamp'] = Date.now().toString()

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Interceptor de Response - Manejo de errores y logging
 * OWASP A09 - Security Logging
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log exitoso (solo en desarrollo)
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        method: response.config.method?.toUpperCase(),
      })
    }
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: number
    }

    // Log de error (sin información sensible)
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: originalRequest?.url,
        status: error.response?.status,
        method: originalRequest?.method?.toUpperCase(),
        message: error.message,
      })
    }

    // Manejo de errores específicos
    if (error.response) {
      const status = error.response.status

      // 401 Unauthorized - Token expirado
      if (status === 401) {
        localStorage.removeItem('auth-token')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      // 403 Forbidden - Sin permisos
      if (status === 403) {
        console.warn('⚠️ Acceso denegado:', originalRequest?.url)
        return Promise.reject(
          new Error('No tiene permisos para realizar esta acción')
        )
      }

      // 429 Too Many Requests - Rate limiting
      if (status === 429) {
        const retryAfter = error.response.headers['retry-after']
        const delay = retryAfter ? parseInt(retryAfter) * 1000 : 5000
        console.warn(`⏳ Rate limit alcanzado. Reintentando en ${delay}ms`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        return apiClient(originalRequest)
      }

      // 5xx Server Error - Retry con backoff exponencial
      if (status >= 500 && status < 600) {
        const retryCount = originalRequest._retry || 0

        if (retryCount < MAX_RETRIES) {
          originalRequest._retry = retryCount + 1
          const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s
          console.warn(
            `🔄 Reintentando petición (${retryCount + 1}/${MAX_RETRIES}) en ${delay}ms`
          )
          await new Promise((resolve) => setTimeout(resolve, delay))
          return apiClient(originalRequest)
        }
      }
    }

    // Error de red o timeout
    if (error.code === 'ECONNABORTED' || !error.response) {
      return Promise.reject(
        new Error(
          'No se pudo conectar con el servidor. Verifique su conexión a internet.'
        )
      )
    }

    return Promise.reject(error)
  }
)

/**
 * Métodos HTTP seguros con tipado
 */
export const api = {
  get: <T = unknown>(url: string, config?: InternalAxiosRequestConfig) =>
    apiClient.get<T>(url, config),

  post: <T = unknown>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    apiClient.post<T>(url, data, config),

  put: <T = unknown>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    apiClient.put<T>(url, data, config),

  patch: <T = unknown>(url: string, data?: unknown, config?: InternalAxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config),

  delete: <T = unknown>(url: string, config?: InternalAxiosRequestConfig) =>
    apiClient.delete<T>(url, config),
}

/**
 * Función para subir archivos con validación de seguridad
 * OWASP A08 - Software Integrity
 */
export const uploadFile = async (
  url: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('file', file)

  // Agregar checksum del archivo para verificar integridad
  const arrayBuffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  formData.append('checksum', hashHex)

  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    },
  })
}

export default api
