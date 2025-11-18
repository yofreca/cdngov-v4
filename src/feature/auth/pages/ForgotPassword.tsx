/**
 * Página de Recuperación de Contraseña - Fase 6
 * - Solicitud de restablecimiento de contraseña por email
 * - Seguridad OWASP (rate limiting, validación)
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co con Bootstrap
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
        <div className="w-100" style={{ maxWidth: '28rem' }}>
          <div
            className="bg-white p-4 rounded shadow text-center"
            role="alert"
            aria-live="polite"
          >
            <div className="fs-1 mb-3" aria-hidden="true">
              📧
            </div>
            <h2
              className="h4 fw-bold mb-3"
              style={{ color: 'var(--color-govco-verde)' }}
            >
              Correo enviado
            </h2>
            <p className="text-muted mb-3">
              Si existe una cuenta asociada con{' '}
              <strong className="text-dark">{email}</strong>, recibirá un
              correo electrónico con instrucciones para restablecer su
              contraseña.
            </p>
            <p className="small text-muted mb-4">
              Por favor, revise su bandeja de entrada y la carpeta de spam. El
              enlace expirará en 1 hora.
            </p>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/login')}
              >
                Volver al inicio de sesión
              </Button>

              <button
                onClick={() => setSuccess(false)}
                disabled={requestCount >= MAX_REQUESTS}
                className="btn btn-link small"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                ¿No recibió el correo? Intentar nuevamente
              </button>
            </div>

            {requestCount >= MAX_REQUESTS && (
              <p
                className="mt-3 small"
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
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
      <div className="w-100" style={{ maxWidth: '28rem' }}>
        {/* Encabezado */}
        <div className="text-center mb-4">
          <h1
            className="h3 fw-bold"
            style={{ color: 'var(--color-govco-azul-oscuro)' }}
          >
            Recuperar Contraseña
          </h1>
          <p className="mt-2 small text-muted">
            Ingrese su correo electrónico y le enviaremos instrucciones para
            restablecer su contraseña
          </p>
        </div>

        {/* Formulario */}
        <form
          className="bg-white p-4 rounded shadow"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Error general */}
          {error && (
            <div
              className="alert alert-danger d-flex align-items-start"
              role="alert"
              aria-live="assertive"
            >
              <span className="flex-shrink-0 me-2" aria-hidden="true">
                ⚠️
              </span>
              <div className="small fw-medium">{error}</div>
            </div>
          )}

          {/* Información de seguridad */}
          <div className="alert alert-primary" role="note">
            <div className="d-flex">
              <span
                className="flex-shrink-0 me-2"
                aria-hidden="true"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                ℹ️
              </span>
              <p className="small mb-0 text-dark">
                Por razones de seguridad, no revelamos si un correo
                electrónico está registrado en nuestro sistema. Si su correo
                está registrado, recibirá un email con instrucciones.
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label small fw-medium">
              Correo electrónico
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              autoComplete="email"
              disabled={isSubmitting || requestCount >= MAX_REQUESTS}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="correo@ejemplo.com"
            />
            {errors.email && (
              <div id="email-error" className="invalid-feedback" role="alert">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting || requestCount >= MAX_REQUESTS}
            className="w-100 mb-3"
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                />
                Enviando correo...
              </>
            ) : requestCount >= MAX_REQUESTS ? (
              'Límite de solicitudes alcanzado'
            ) : (
              'Enviar instrucciones'
            )}
          </Button>

          {/* Links de navegación */}
          <div className="d-flex align-items-center justify-content-between small">
            <Link
              to="/login"
              className="text-decoration-none fw-medium"
              style={{ color: 'var(--color-govco-marino)' }}
            >
              ← Volver al inicio de sesión
            </Link>

            <Link
              to="/registro"
              className="text-decoration-none fw-medium"
              style={{ color: 'var(--color-govco-marino)' }}
            >
              Crear cuenta
            </Link>
          </div>
        </form>

        {/* Información adicional */}
        <div className="text-center mt-3 small text-muted">
          <p className="mb-0">
            Si no recibe el correo en unos minutos, verifique su carpeta de spam
            o contacte al soporte técnico.
          </p>
        </div>
      </div>
    </div>
  )
}
