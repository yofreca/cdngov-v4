import { z } from 'zod'

/**
 * Validaciones avanzadas con Zod siguiendo requisitos de seguridad OWASP
 * OWASP A03 - Injection
 */

// ============================================
// VALIDACIONES BÁSICAS
// ============================================

/**
 * Validación de nombre completo
 * - Mínimo 3 caracteres, máximo 100
 * - Solo letras, espacios y caracteres latinos
 */
export const nombreSchema = z
  .string()
  .min(3, 'El nombre debe tener al menos 3 caracteres')
  .max(100, 'El nombre no puede exceder 100 caracteres')
  .regex(
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
    'El nombre solo puede contener letras y espacios'
  )
  .transform((val) => val.trim())

/**
 * Validación de email
 * - Formato válido de email
 * - Máximo 255 caracteres
 * - Dominios permitidos (opcional)
 */
export const emailSchema = z
  .string()
  .email('El formato del email no es válido')
  .max(255, 'El email no puede exceder 255 caracteres')
  .toLowerCase()
  .transform((val) => val.trim())

/**
 * Validación de contraseña segura
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 */
export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña no puede exceder 128 caracteres')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(
    /[^A-Za-z0-9]/,
    'La contraseña debe contener al menos un carácter especial'
  )

// ============================================
// VALIDACIONES COLOMBIA
// ============================================

/**
 * Validación de documento de identidad colombiano
 * - Cédula: 6-10 dígitos
 * - Solo números
 */
export const cedulaSchema = z
  .string()
  .regex(/^\d{6,10}$/, 'La cédula debe tener entre 6 y 10 dígitos')
  .transform((val) => val.trim())

/**
 * Validación de NIT colombiano
 * - Formato: 123456789-0
 * - Con dígito de verificación
 */
export const nitSchema = z
  .string()
  .regex(
    /^\d{9,10}-\d$/,
    'El NIT debe tener el formato 123456789-0 (con dígito de verificación)'
  )
  .transform((val) => val.trim())

/**
 * Validación de teléfono móvil colombiano
 * - Formato: 3001234567 (10 dígitos, inicia con 3)
 */
export const telefonoMovilSchema = z
  .string()
  .regex(/^3\d{9}$/, 'El teléfono móvil debe tener 10 dígitos y comenzar con 3')
  .transform((val) => val.trim())

/**
 * Validación de teléfono fijo colombiano
 * - Formato: 6012345678 (10 dígitos, indicativo + número)
 * - O formato corto: 7 dígitos
 */
export const telefonoFijoSchema = z
  .string()
  .regex(
    /^(60[1-8]|605)\d{7}$|^\d{7}$/,
    'El teléfono fijo debe tener 7 dígitos o 10 dígitos con indicativo'
  )
  .transform((val) => val.trim())

/**
 * Validación de departamento colombiano
 */
export const departamentoSchema = z.enum(
  [
    'amazonas',
    'antioquia',
    'arauca',
    'atlantico',
    'bolivar',
    'boyaca',
    'caldas',
    'caqueta',
    'casanare',
    'cauca',
    'cesar',
    'choco',
    'cordoba',
    'cundinamarca',
    'guainia',
    'guaviare',
    'huila',
    'la_guajira',
    'magdalena',
    'meta',
    'narino',
    'norte_santander',
    'putumayo',
    'quindio',
    'risaralda',
    'san_andres',
    'santander',
    'sucre',
    'tolima',
    'valle_del_cauca',
    'vaupes',
    'vichada',
  ],
  {
    errorMap: () => ({ message: 'Seleccione un departamento válido' }),
  }
)

/**
 * Validación de código postal colombiano
 * - 6 dígitos
 */
export const codigoPostalSchema = z
  .string()
  .regex(/^\d{6}$/, 'El código postal debe tener 6 dígitos')
  .transform((val) => val.trim())

// ============================================
// VALIDACIONES AVANZADAS
// ============================================

/**
 * Validación de dirección colombiana
 * - Formato flexible
 * - Mínimo 10 caracteres
 */
export const direccionSchema = z
  .string()
  .min(10, 'La dirección debe tener al menos 10 caracteres')
  .max(200, 'La dirección no puede exceder 200 caracteres')
  .regex(
    /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-.,]+$/,
    'La dirección contiene caracteres no permitidos'
  )
  .transform((val) => val.trim())

/**
 * Validación de URL
 * - HTTPS obligatorio en producción
 */
export const urlSchema = z
  .string()
  .url('La URL no es válida')
  .refine(
    (url) => {
      if (import.meta.env.PROD) {
        return url.startsWith('https://')
      }
      return true
    },
    { message: 'La URL debe usar HTTPS en producción' }
  )

/**
 * Validación de fecha
 * - Formato ISO 8601 (YYYY-MM-DD)
 * - No permitir fechas futuras (opcional)
 */
export const fechaSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener el formato YYYY-MM-DD')
  .refine(
    (date) => {
      const d = new Date(date)
      return !isNaN(d.getTime())
    },
    { message: 'La fecha no es válida' }
  )

export const fechaNoFuturaSchema = fechaSchema.refine(
  (date) => {
    const inputDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return inputDate <= today
  },
  { message: 'La fecha no puede ser futura' }
)

export const fechaMayoriaEdadSchema = fechaSchema.refine(
  (date) => {
    const birthDate = new Date(date)
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18
    }
    return age >= 18
  },
  { message: 'Debe ser mayor de 18 años' }
)

/**
 * Validación de archivo
 * - Tamaño máximo
 * - Tipos MIME permitidos
 */
export const archivoSchema = (
  maxSizeMB: number = 5,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']
) =>
  z.instanceof(File).refine(
    (file) => {
      const maxSizeBytes = maxSizeMB * 1024 * 1024
      return file.size <= maxSizeBytes
    },
    { message: `El archivo no debe superar ${maxSizeMB}MB` }
  ).refine(
    (file) => allowedTypes.includes(file.type),
    { message: `Solo se permiten archivos de tipo: ${allowedTypes.join(', ')}` }
  )

// ============================================
// SCHEMAS DE FORMULARIOS COMPLETOS
// ============================================

/**
 * Schema de registro de usuario
 */
export const registroUsuarioSchema = z
  .object({
    nombre: nombreSchema,
    apellido: nombreSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    tipoDocumento: z.enum(['cedula', 'pasaporte', 'cedula_extranjeria'], {
      errorMap: () => ({ message: 'Seleccione un tipo de documento' }),
    }),
    numeroDocumento: cedulaSchema,
    telefono: telefonoMovilSchema,
    aceptaTerminos: z.boolean().refine((val) => val === true, {
      message: 'Debe aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

/**
 * Schema de login
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
  recordarme: z.boolean().optional(),
})

/**
 * Schema de contacto
 */
export const contactoSchema = z.object({
  nombre: nombreSchema,
  email: emailSchema,
  telefono: telefonoMovilSchema.optional(),
  asunto: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  mensaje: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
})

/**
 * Sanitizar string de caracteres peligrosos
 * Prevención adicional de XSS e Injection
 */
export const sanitizeString = (str: string): string => {
  return str
    .trim()
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+\s*=/gi, '') // Remover event handlers
}

/**
 * Validar si un string contiene código malicioso
 */
export const containsMaliciousCode = (str: string): boolean => {
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /eval\(/i,
    /expression\(/i,
  ]

  return maliciousPatterns.some((pattern) => pattern.test(str))
}
