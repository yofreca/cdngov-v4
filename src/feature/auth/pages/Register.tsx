/**
 * Página de Registro - Fase 6
 * - Registro de usuario con validación completa
 * - Seguridad OWASP (validación de contraseñas, prevención XSS)
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co con Bootstrap
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
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
    lastName: z
      .string()
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede exceder 50 caracteres')
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras'),
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
    acceptTerms: z.boolean().refine((val) => val === true, {
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

    if (strength <= 2) return { strength, label: 'Débil', color: 'var(--color-govco-rojo)' }
    if (strength === 3) return { strength, label: 'Media', color: 'var(--color-govco-naranja)' }
    if (strength === 4) return { strength, label: 'Buena', color: 'var(--color-govco-amarillo)' }
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
        { action: 'user_registered', email: data.email }
      )

      setRegisterSuccess(true)

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate('/login', {
          state: { message: 'Registro exitoso. Por favor, inicie sesión con sus credenciales.' },
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
        <div className="w-100 text-center" style={{ maxWidth: '28rem' }}>
          <div className="bg-white p-4 rounded shadow" role="alert" aria-live="polite">
            <div className="fs-1 mb-3" aria-hidden="true">✅</div>
            <h2 className="h4 fw-bold mb-3" style={{ color: 'var(--color-govco-verde)' }}>
              ¡Registro exitoso!
            </h2>
            <p className="text-muted mb-3">Su cuenta ha sido creada correctamente.</p>
            <p className="small text-muted">Redirigiendo a la página de inicio de sesión...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3">
      <div className="w-100" style={{ maxWidth: '42rem' }}>
        {/* Encabezado */}
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold" style={{ color: 'var(--color-govco-azul-oscuro)' }}>
            Crear Cuenta
          </h1>
          <p className="mt-2 small text-muted">
            Sistema de Apoyo para la Reincorporación (SARA)
          </p>
        </div>

        {/* Formulario */}
        <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Error general */}
          {registerError && (
            <div className="alert alert-danger d-flex align-items-start" role="alert" aria-live="assertive">
              <span className="flex-shrink-0 me-2" aria-hidden="true">⚠️</span>
              <div className="small fw-medium">{registerError}</div>
            </div>
          )}

          {/* Nombres y Apellidos */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="firstName" className="form-label small fw-medium">
                Nombres <span className="text-danger">*</span>
              </label>
              <input
                {...register('firstName')}
                type="text"
                id="firstName"
                autoComplete="given-name"
                disabled={isSubmitting}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              />
              {errors.firstName && (
                <div id="firstName-error" className="invalid-feedback" role="alert">
                  {errors.firstName.message}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label small fw-medium">
                Apellidos <span className="text-danger">*</span>
              </label>
              <input
                {...register('lastName')}
                type="text"
                id="lastName"
                autoComplete="family-name"
                disabled={isSubmitting}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              />
              {errors.lastName && (
                <div id="lastName-error" className="invalid-feedback" role="alert">
                  {errors.lastName.message}
                </div>
              )}
            </div>
          </div>

          {/* Cédula y Teléfono */}
          <div className="row mb-3">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="cedula" className="form-label small fw-medium">
                Cédula de Ciudadanía <span className="text-danger">*</span>
              </label>
              <input
                {...register('cedula')}
                type="text"
                id="cedula"
                placeholder="1234567890"
                disabled={isSubmitting}
                className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
                aria-invalid={errors.cedula ? 'true' : 'false'}
                aria-describedby={errors.cedula ? 'cedula-error' : undefined}
              />
              {errors.cedula && (
                <div id="cedula-error" className="invalid-feedback" role="alert">
                  {errors.cedula.message}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="phone" className="form-label small fw-medium">
                Teléfono <span className="text-danger">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                placeholder="3001234567"
                autoComplete="tel"
                disabled={isSubmitting}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <div id="phone-error" className="invalid-feedback" role="alert">
                  {errors.phone.message}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label small fw-medium">
              Correo electrónico <span className="text-danger">*</span>
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              autoComplete="email"
              disabled={isSubmitting}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <div id="email-error" className="invalid-feedback" role="alert">
                {errors.email.message}
              </div>
            )}
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label small fw-medium">
              Contraseña <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                disabled={isSubmitting}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby="password-error password-strength"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ zIndex: 5 }}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <span aria-hidden="true">{showPassword ? '🙈' : '👁️'}</span>
              </button>
            </div>

            {/* Indicador de fortaleza */}
            {password && (
              <div className="mt-2" id="password-strength">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="small text-muted">Fortaleza de la contraseña:</span>
                  <span className="small fw-medium" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="progress" style={{ height: '0.5rem' }}>
                  <div
                    className="progress-bar"
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
              <div id="password-error" className="invalid-feedback d-block" role="alert">
                {errors.password.message}
              </div>
            )}

            <p className="mt-1 small text-muted">
              Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial
            </p>
          </div>

          {/* Confirmar Contraseña */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label small fw-medium">
              Confirmar contraseña <span className="text-danger">*</span>
            </label>
            <div className="position-relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                autoComplete="new-password"
                disabled={isSubmitting}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isSubmitting}
                className="btn btn-link position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ zIndex: 5 }}
                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <span aria-hidden="true">{showConfirmPassword ? '🙈' : '👁️'}</span>
              </button>
            </div>
            {errors.confirmPassword && (
              <div id="confirmPassword-error" className="invalid-feedback d-block" role="alert">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Términos y condiciones */}
          <div className="mb-4">
            <div className="form-check">
              <input
                {...register('acceptTerms')}
                id="acceptTerms"
                type="checkbox"
                disabled={isSubmitting}
                className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                aria-invalid={errors.acceptTerms ? 'true' : 'false'}
                aria-describedby={errors.acceptTerms ? 'acceptTerms-error' : undefined}
              />
              <label htmlFor="acceptTerms" className="form-check-label small">
                Acepto los{' '}
                <Link
                  to="/terminos-y-condiciones"
                  target="_blank"
                  className="text-decoration-none fw-medium"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link
                  to="/politica-de-privacidad"
                  target="_blank"
                  className="text-decoration-none fw-medium"
                  style={{ color: 'var(--color-govco-marino)' }}
                >
                  política de privacidad
                </Link>{' '}
                <span className="text-danger">*</span>
              </label>
            </div>
            {errors.acceptTerms && (
              <div id="acceptTerms-error" className="invalid-feedback d-block" role="alert">
                {errors.acceptTerms.message}
              </div>
            )}
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-100 mb-3"
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                Creando cuenta...
              </>
            ) : (
              'Crear cuenta'
            )}
          </Button>

          {/* Link de login */}
          <div className="text-center">
            <p className="small text-muted mb-0">
              ¿Ya tiene una cuenta?{' '}
              <Link
                to="/login"
                className="text-decoration-none fw-medium"
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
