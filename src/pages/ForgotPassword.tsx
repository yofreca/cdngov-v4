/**
 * Página de Recuperación de Contraseña - Fase 6
 * - Solicitud de restablecimiento de contraseña por email
 * - Seguridad OWASP (rate limiting, validación)
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@shared/components/ui'
import { securityLogger, SecurityEventType, SecurityLevel } from '@utils/securityLogger'

// Esquema de validación para recuperación de contraseña
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido')
    .max(255, 'El correo electrónico es demasiado largo')
    .toLowerCase()
    .trim(),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function ForgotPassword() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [requestCount, setRequestCount] = useState(0)
  const MAX_REQUESTS = 3

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const email = watch('email')

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Verificar límite de solicitudes (protección contra abuso)
    if (requestCount >= MAX_REQUESTS) {
      setError(
        'Ha excedido el límite de solicitudes. Por favor, contacte al soporte técnico.'
      )
      securityLogger.logSecurityEvent(
        SecurityEventType.LOGIN_SUCCESS,
        SecurityLevel.CRITICAL,
        'Bloqueo por exceso de solicitudes de restablecimiento',
        {
          action: 'password_reset_blocked_max_requests',
          email: data.email,
        }
      )
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Simular llamada a API para enviar email de recuperación
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true })
        }, 2000)
      })

      // Siempre mostrar mensaje de éxito (seguridad: no revelar si el email existe)
      securityLogger.logSecurityEvent(
        SecurityEventType.LOGIN_SUCCESS,
        SecurityLevel.INFO,
        'Solicitud de restablecimiento de contraseña',
        {
          action: 'password_reset_requested',
          email: data.email,
        }
      )

      setSuccess(true)
      setRequestCount(requestCount + 1)
    } catch (error) {
      setError(
        'Error al procesar la solicitud. Por favor, intente nuevamente.'
      )

      securityLogger.logSecurityEvent(
        SecurityEventType.LOGIN_SUCCESS,
        SecurityLevel.ERROR,
        'Error al procesar solicitud de restablecimiento',
        {
          action: 'password_reset_error',
          email: data.email,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Mensaje de éxito
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div
            className="bg-white p-8 rounded-lg shadow-md text-center"
            role="alert"
            aria-live="polite"
          >
            <div className="text-6xl mb-4" aria-hidden="true">
              📧
            </div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-govco-verde)' }}
            >
              Correo enviado
            </h2>
            <p className="text-gray-600 mb-4">
              Si existe una cuenta asociada con{' '}
              <strong className="text-gray-800">{email}</strong>, recibirá un
              correo electrónico con instrucciones para restablecer su
              contraseña.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Por favor, revise su bandeja de entrada y la carpeta de spam. El
              enlace expirará en 1 hora.
            </p>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Volver al inicio de sesión
              </Button>

              <button
                onClick={() => setSuccess(false)}
                disabled={requestCount >= MAX_REQUESTS}
                className="w-full text-sm hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                ¿No recibió el correo? Intentar nuevamente
              </button>
            </div>

            {requestCount >= MAX_REQUESTS && (
              <p
                className="mt-4 text-sm"
                style={{ color: 'var(--color-govco-rojo)' }}
              >
                Ha alcanzado el límite de solicitudes. Por favor, contacte al
                soporte técnico.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Encabezado */}
        <div>
          <h1
            className="text-center text-3xl font-bold"
            style={{ color: 'var(--color-govco-azul-oscuro)' }}
          >
            Recuperar Contraseña
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingrese su correo electrónico y le enviaremos instrucciones para
            restablecer su contraseña
          </p>
        </div>

        {/* Formulario */}
        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Error general */}
          {error && (
            <div
              className="rounded-md p-4"
              style={{ backgroundColor: '#fee2e2' }}
              role="alert"
              aria-live="assertive"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-red-400" aria-hidden="true">
                    ⚠️
                  </span>
                </div>
                <div className="ml-3">
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-govco-rojo)' }}
                  >
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Información de seguridad */}
          <div
            className="rounded-md p-4"
            style={{ backgroundColor: '#e0f2fe' }}
            role="note"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <span
                  className="text-blue-400"
                  aria-hidden="true"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  ℹ️
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  Por razones de seguridad, no revelamos si un correo
                  electrónico está registrado en nuestro sistema. Si su correo
                  está registrado, recibirá un email con instrucciones.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                disabled={isSubmitting || requestCount >= MAX_REQUESTS}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm"
                  style={{ color: 'var(--color-govco-rojo)' }}
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Botón de envío */}
          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || requestCount >= MAX_REQUESTS}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <span
                    className="inline-block animate-spin mr-2"
                    aria-hidden="true"
                  >
                    ⏳
                  </span>
                  Enviando correo...
                </>
              ) : requestCount >= MAX_REQUESTS ? (
                'Límite de solicitudes alcanzado'
              ) : (
                'Enviar instrucciones'
              )}
            </Button>
          </div>

          {/* Links de navegación */}
          <div className="flex items-center justify-between text-sm">
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: 'var(--color-govco-marino)' }}
            >
              ← Volver al inicio de sesión
            </Link>

            <Link
              to="/registro"
              className="font-medium hover:underline"
              style={{ color: 'var(--color-govco-marino)' }}
            >
              Crear cuenta
            </Link>
          </div>
        </form>

        {/* Información adicional */}
        <div className="text-center text-xs text-gray-500">
          <p>
            Si no recibe el correo en unos minutos, verifique su carpeta de spam
            o contacte al soporte técnico.
          </p>
        </div>
      </div>
    </div>
  )
}
