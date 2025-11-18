/**
 * Página de Registro - Fase 6
 * - Registro de usuario con validación completa
 * - Seguridad OWASP (validación de contraseñas, prevención XSS)
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@shared/components/ui'
import { passwordSchema, cedulaSchema, telefonoMovilSchema } from '@utils/validations'
import { securityLogger, SecurityEventType, SecurityLevel } from '@utils/securityLogger'

// Esquema de validación completo para registro
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede exceder 50 caracteres')
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        'El nombre solo puede contener letras'
      ),
    lastName: z
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede exceder 50 caracteres')
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        'El apellido solo puede contener letras'
      ),
    cedula: cedulaSchema,
    phone: telefonoMovilSchema,
    email: z
      .string()
      .min(1, 'El correo electrónico es requerido')
      .email('Correo electrónico inválido')
      .max(255, 'El correo electrónico es demasiado largo')
      .toLowerCase()
      .trim(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Debe confirmar la contraseña'),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Debe aceptar los términos y condiciones',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export function Register() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [registerSuccess, setRegisterSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      cedula: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const password = watch('password')

  // Indicador de fortaleza de contraseña
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '' }

    let strength = 0
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++

    if (strength <= 2)
      return { strength, label: 'Débil', color: 'var(--color-govco-rojo)' }
    if (strength === 3)
      return {
        strength,
        label: 'Media',
        color: 'var(--color-govco-naranja)',
      }
    if (strength === 4)
      return {
        strength,
        label: 'Buena',
        color: 'var(--color-govco-amarillo)',
      }
    return { strength, label: 'Fuerte', color: 'var(--color-govco-verde)' }
  }

  const passwordStrength = getPasswordStrength(password)

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    setRegisterError(null)

    try {
      // Simular llamada a API de registro
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulación: verificar si el email ya existe
          if (data.email === 'existente@arn.gov.co') {
            reject(new Error('El correo electrónico ya está registrado'))
          } else {
            resolve({ success: true })
          }
        }, 2000)
      })

      // Registro exitoso
      securityLogger.logSecurityEvent(
        SecurityEventType.LOGIN_SUCCESS,
        SecurityLevel.INFO,
        'Usuario registrado exitosamente',
        {
          action: 'user_registered',
          email: data.email,
        }
      )

      setRegisterSuccess(true)

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login', {
          state: {
            message:
              'Registro exitoso. Por favor, inicie sesión con sus credenciales.',
          },
        })
      }, 3000)
    } catch (error) {
      setRegisterError(
        error instanceof Error
          ? error.message
          : 'Error al registrar usuario. Por favor, intente nuevamente.'
      )

      securityLogger.logSecurityEvent(
        SecurityEventType.LOGIN_SUCCESS,
        SecurityLevel.WARNING,
        'Fallo en registro de usuario',
        {
          action: 'registration_failed',
          email: data.email,
          error: error instanceof Error ? error.message : 'Unknown error',
        }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Mensaje de éxito
  if (registerSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div
            className="bg-white p-8 rounded-lg shadow-md"
            role="alert"
            aria-live="polite"
          >
            <div className="text-6xl mb-4" aria-hidden="true">
              ✅
            </div>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--color-govco-verde)' }}
            >
              ¡Registro exitoso!
            </h2>
            <p className="text-gray-600 mb-4">
              Su cuenta ha sido creada correctamente.
            </p>
            <p className="text-sm text-gray-500">
              Redirigiendo a la página de inicio de sesión...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Encabezado */}
        <div>
          <h1
            className="text-center text-3xl font-bold"
            style={{ color: 'var(--color-govco-azul-oscuro)' }}
          >
            Crear Cuenta
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema de Apoyo para la Reincorporación (SARA)
          </p>
        </div>

        {/* Formulario */}
        <form
          className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Error general */}
          {registerError && (
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
                    {registerError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Nombres y Apellidos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombres <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  autoComplete="given-name"
                  disabled={isSubmitting}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  aria-describedby={
                    errors.firstName ? 'firstName-error' : undefined
                  }
                />
                {errors.firstName && (
                  <p
                    id="firstName-error"
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-govco-rojo)' }}
                    role="alert"
                  >
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Apellidos <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  id="lastName"
                  autoComplete="family-name"
                  disabled={isSubmitting}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
                  aria-invalid={errors.lastName ? 'true' : 'false'}
                  aria-describedby={
                    errors.lastName ? 'lastName-error' : undefined
                  }
                />
                {errors.lastName && (
                  <p
                    id="lastName-error"
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-govco-rojo)' }}
                    role="alert"
                  >
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Cédula y Teléfono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cedula"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cédula de Ciudadanía <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('cedula')}
                  type="text"
                  id="cedula"
                  placeholder="1234567890"
                  disabled={isSubmitting}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.cedula ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
                  aria-invalid={errors.cedula ? 'true' : 'false'}
                  aria-describedby={errors.cedula ? 'cedula-error' : undefined}
                />
                {errors.cedula && (
                  <p
                    id="cedula-error"
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-govco-rojo)' }}
                    role="alert"
                  >
                    {errors.cedula.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  placeholder="3001234567"
                  autoComplete="tel"
                  disabled={isSubmitting}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="mt-1 text-sm"
                    style={{ color: 'var(--color-govco-rojo)' }}
                    role="alert"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                disabled={isSubmitting}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
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
                Contraseña <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  className={`block w-full px-3 py-2 border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
                  aria-invalid={errors.password ? 'true' : 'false'}
                  aria-describedby="password-error password-strength"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  <span aria-hidden="true">{showPassword ? '🙈' : '👁️'}</span>
                </button>
              </div>

              {/* Indicador de fortaleza */}
              {password && (
                <div className="mt-2" id="password-strength">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">
                      Fortaleza de la contraseña:
                    </span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(passwordStrength.strength / 5) * 100}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                      role="progressbar"
                      aria-valuenow={passwordStrength.strength}
                      aria-valuemin={0}
                      aria-valuemax={5}
                      aria-label={`Fortaleza de contraseña: ${passwordStrength.label}`}
                    />
                  </div>
                </div>
              )}

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

              <p className="mt-1 text-xs text-gray-500">
                Mínimo 8 caracteres, una mayúscula, una minúscula, un número y
                un carácter especial
              </p>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  className={`block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-govco-marino focus:border-transparent disabled:bg-gray-100`}
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  aria-describedby={
                    errors.confirmPassword ? 'confirmPassword-error' : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  aria-label={
                    showConfirmPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  <span aria-hidden="true">
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </span>
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="mt-1 text-sm"
                  style={{ color: 'var(--color-govco-rojo)' }}
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Términos y condiciones */}
            <div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    {...register('acceptTerms')}
                    id="acceptTerms"
                    type="checkbox"
                    disabled={isSubmitting}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-govco-marino"
                    style={{ accentColor: 'var(--color-govco-marino)' }}
                    aria-invalid={errors.acceptTerms ? 'true' : 'false'}
                    aria-describedby={
                      errors.acceptTerms ? 'acceptTerms-error' : undefined
                    }
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-gray-700">
                    Acepto los{' '}
                    <Link
                      to="/terminos-y-condiciones"
                      target="_blank"
                      className="font-medium hover:underline"
                      style={{ color: 'var(--color-govco-marino)' }}
                    >
                      términos y condiciones
                    </Link>{' '}
                    y la{' '}
                    <Link
                      to="/politica-de-privacidad"
                      target="_blank"
                      className="font-medium hover:underline"
                      style={{ color: 'var(--color-govco-marino)' }}
                    >
                      política de privacidad
                    </Link>{' '}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              {errors.acceptTerms && (
                <p
                  id="acceptTerms-error"
                  className="mt-1 text-sm ml-7"
                  style={{ color: 'var(--color-govco-rojo)' }}
                  role="alert"
                >
                  {errors.acceptTerms.message}
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
              disabled={isSubmitting}
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
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </Button>
          </div>

          {/* Link de login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tiene una cuenta?{' '}
              <Link
                to="/login"
                className="font-medium hover:underline"
                style={{ color: 'var(--color-govco-marino)' }}
              >
                Inicie sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
