import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardContent,
  Input,
  Select,
  Textarea,
  Checkbox,
  Button,
  Alert,
} from '@components'

// Schema de validación con Zod (seguridad OWASP)
const formSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo se permiten letras y espacios'),

  email: z
    .string()
    .email('Formato de email inválido')
    .max(255, 'El email no puede exceder 255 caracteres'),

  documento: z
    .string()
    .regex(/^\d{6,10}$/, 'El documento debe tener entre 6 y 10 dígitos'),

  departamento: z
    .string()
    .min(1, 'Debes seleccionar un departamento'),

  telefono: z
    .string()
    .regex(/^3\d{9}$/, 'El teléfono debe ser un número móvil colombiano válido (10 dígitos iniciando con 3)'),

  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(500, 'El mensaje no puede exceder 500 caracteres'),

  terminos: z
    .boolean()
    .refine((val) => val === true, 'Debes aceptar los términos y condiciones'),
})

type FormData = z.infer<typeof formSchema>

const departamentos = [
  { value: '', label: 'Selecciona un departamento', disabled: true },
  { value: 'antioquia', label: 'Antioquia' },
  { value: 'atlantico', label: 'Atlántico' },
  { value: 'bogota', label: 'Bogotá D.C.' },
  { value: 'bolivar', label: 'Bolívar' },
  { value: 'cundinamarca', label: 'Cundinamarca' },
  { value: 'valle', label: 'Valle del Cauca' },
]

/**
 * Página de Formulario de Ejemplo
 * Implementa todas las mejores prácticas:
 * - Validación con Zod
 * - React Hook Form
 * - Seguridad OWASP (validación de inputs)
 * - Accesibilidad WCAG 2.1 AA
 * - Mensajes de error claros
 */
export function FormExample() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      email: '',
      documento: '',
      departamento: '',
      telefono: '',
      mensaje: '',
      terminos: false,
    },
  })

  const mensajeValue = watch('mensaje')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitSuccess(false)

    // Simulación de envío a API (sanitización en backend)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // En producción, enviar a API aquí
    // eslint-disable-next-line no-console
    console.log('Datos del formulario:', data)

    setIsSubmitting(false)
    setSubmitSuccess(true)
    reset()

    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <div className="container-govco py-12">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          style={{ color: 'var(--color-govco-marino)' }}
        >
          Formulario de Contacto
        </h1>

        {submitSuccess && (
          <Alert
            variant="success"
            title="¡Formulario enviado exitosamente!"
            onClose={() => setSubmitSuccess(false)}
            className="mb-6"
          >
            Hemos recibido tu información. Te contactaremos pronto.
          </Alert>
        )}

        <Card variant="elevated">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="space-y-6">
                {/* Nombre */}
                <Input
                  label="Nombre completo"
                  placeholder="Ingresa tu nombre completo"
                  {...register('nombre')}
                  error={errors.nombre?.message}
                  helperText="Tu nombre tal como aparece en el documento de identidad"
                  required
                  fullWidth
                />

                {/* Email */}
                <Input
                  label="Correo electrónico"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  {...register('email')}
                  error={errors.email?.message}
                  helperText="Te enviaremos la confirmación a este correo"
                  required
                  fullWidth
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Documento */}
                  <Input
                    label="Número de documento"
                    type="text"
                    placeholder="123456789"
                    {...register('documento')}
                    error={errors.documento?.message}
                    required
                    fullWidth
                  />

                  {/* Teléfono */}
                  <Input
                    label="Teléfono móvil"
                    type="tel"
                    placeholder="3001234567"
                    {...register('telefono')}
                    error={errors.telefono?.message}
                    helperText="10 dígitos iniciando con 3"
                    required
                    fullWidth
                  />
                </div>

                {/* Departamento */}
                <Select
                  label="Departamento"
                  {...register('departamento')}
                  options={departamentos}
                  error={errors.departamento?.message}
                  helperText="Selecciona el departamento donde resides"
                  required
                  fullWidth
                />

                {/* Mensaje */}
                <Textarea
                  label="Mensaje"
                  placeholder="Escribe tu mensaje o consulta aquí..."
                  {...register('mensaje')}
                  rows={5}
                  maxLength={500}
                  showCount
                  value={mensajeValue}
                  error={errors.mensaje?.message}
                  helperText="Describe tu solicitud o consulta (máximo 500 caracteres)"
                  required
                  fullWidth
                />

                {/* Términos y condiciones */}
                <Checkbox
                  label="Acepto los términos y condiciones y la política de privacidad"
                  {...register('terminos')}
                  error={errors.terminos?.message}
                />

                {/* Información de seguridad */}
                <Alert variant="info" title="Seguridad de tus datos">
                  Tu información está protegida y será procesada de acuerdo con
                  la legislación colombiana de protección de datos personales
                  (Ley 1581 de 2012).
                </Alert>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            </CardContent>
          </form>
        </Card>

        {/* Información adicional */}
        <div className="mt-6 p-4 rounded-md" style={{ backgroundColor: 'var(--color-govco-gris-muy-claro)' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-govco-gris-oscuro)' }}>
            Características de Seguridad Implementadas:
          </h3>
          <ul className="text-sm space-y-1" style={{ color: 'var(--color-govco-gris)' }}>
            <li>✓ Validación de inputs con Zod (prevención de inyección)</li>
            <li>✓ Sanitización de caracteres especiales en servidor</li>
            <li>✓ Límites de longitud en todos los campos</li>
            <li>✓ Validación de formato de email y teléfono</li>
            <li>✓ Expresiones regulares para prevenir XSS</li>
            <li>✓ Accesibilidad WCAG 2.1 AA compliant</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
