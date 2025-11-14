/**
 * Página de Login - Fase 6
 * - Autenticación segura con validación OWASP
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co
 * - Protección contra ataques comunes
 */

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@context/AuthContext'
import { Button } from '@components/common/Button'
import { securityLogger } from '@utils/securityLogger'

// Esquema de validación con Zod (seguridad OWASP)
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido')
    .max(255, 'El correo electrónico es demasiado largo')
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .max(128, 'La contraseña es demasiado larga'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [attemptCount, setAttemptCount] = useState(0)
  const MAX_ATTEMPTS = 5

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const from = (location.state as { from?: { pathname: string } })?.from
    ?.pathname || '/'

  const onSubmit = async (data: LoginFormData) => {
    // Verificar límite de intentos (protección contra fuerza bruta)
    if (attemptCount >= MAX_ATTEMPTS) {
      setLoginError(
        'Demasiados intentos fallidos. Por favor, intente más tarde o recupere su contraseña.'
      )
      securityLogger.logSecurityEvent('authentication', 'high', {
        action: 'login_blocked_max_attempts',
        email: data.email,
      })
      return
    }

    setIsSubmitting(true)
    setLoginError(null)

    try {
      // Simular llamada a API de autenticación
      // En producción, esto llamaría a tu backend
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulación: credenciales de prueba
          if (
            data.email === 'admin@arn.gov.co' &&
            data.password === 'Admin123!'
          ) {
            resolve({
              user: {
                id: '1',
                name: 'Administrador ARN',
                email: data.email,
                role: 'admin',
              },
              token: 'mock-jwt-token-' + Date.now(),
            })
          } else {
            reject(new Error('Credenciales inválidas'))
          }
        }, 1000)
      })
        .then((response: any) => {
          // Login exitoso
          securityLogger.logSecurityEvent('authentication', 'info', {
            action: 'login_success',
            email: data.email,
          })

          login(response.user, response.token, data.rememberMe)
          navigate(from, { replace: true })
        })
        .catch((error) => {
          // Login fallido
          const newAttemptCount = attemptCount + 1
          setAttemptCount(newAttemptCount)

          securityLogger.logSecurityEvent('authentication', 'warning', {
            action: 'login_failed',
            email: data.email,
            attempt: newAttemptCount,
          })

          if (newAttemptCount >= MAX_ATTEMPTS) {
            setLoginError(
              'Demasiados intentos fallidos. Por favor, recupere su contraseña.'
            )
          } else {
            setLoginError(
              'Correo electrónico o contraseña incorrectos. ' +
                `Le quedan ${MAX_ATTEMPTS - newAttemptCount} intentos.`
            )
          }
        })
    } catch (error) {
      setLoginError('Error al iniciar sesión. Por favor, intente nuevamente.')
      securityLogger.logSecurityEvent('authentication', 'error', {
        action: 'login_error',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    } finally {
      setIsSubmitting(false)
    }
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
            Iniciar Sesión
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de Apoyo para la Reincorporación (SARA)
          </p>
          {from !== '/' && (
            <p
              className="mt-2 text-center text-sm"
              style={{ color: 'var(--color-govco-naranja)' }}
              role="alert"
            >
              Debe iniciar sesión para acceder a esta página
            </p>
          )}
        </div>

        {/* Formulario */}
        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Error general */}
          {loginError && (
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
                    {loginError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Credenciales de prueba (solo desarrollo) */}
          {import.meta.env.DEV && (
            <div
              className="rounded-md p-4"
              style={{ backgroundColor: '#fef3c7' }}
              role="note"
            >
              <p className="text-xs text-gray-700">
                <strong>Credenciales de prueba:</strong>
                <br />
                Email: admin@arn.gov.co
                <br />
                Contraseña: Admin123!
              </p>
            </div>
          )}

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
                disabled={isSubmitting || attemptCount >= MAX_ATTEMPTS}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed`}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
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

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  disabled={isSubmitting || attemptCount >= MAX_ATTEMPTS}
                  className={`block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting || attemptCount >= MAX_ATTEMPTS}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  <span aria-hidden="true">{showPassword ? '🙈' : '👁️'}</span>
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1 text-sm"
                  style={{ color: 'var(--color-govco-rojo)' }}
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Recordarme */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register('rememberMe')}
                  id="rememberMe"
                  type="checkbox"
                  disabled={isSubmitting || attemptCount >= MAX_ATTEMPTS}
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-govco-marino"
                  style={{ accentColor: 'var(--color-govco-marino)' }}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/recuperar-contrasena"
                  className="font-medium hover:underline"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting || attemptCount >= MAX_ATTEMPTS}
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
                  Iniciando sesión...
                </>
              ) : attemptCount >= MAX_ATTEMPTS ? (
                'Cuenta bloqueada temporalmente'
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </div>

          {/* Link de registro */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tiene una cuenta?{' '}
              <Link
                to="/registro"
                className="font-medium hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Regístrese aquí
              </Link>
            </p>
          </div>
        </form>

        {/* Información de seguridad */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>
            Esta es una conexión segura protegida. Sus datos están encriptados.
          </p>
          <p className="mt-1">
            Si tiene problemas para acceder, contacte al soporte técnico.
          </p>
        </div>
      </div>
    </div>
  )
}
