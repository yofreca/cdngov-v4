import { useState } from 'react'
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Radio,
  Alert,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@shared/components/ui'

/**
 * Página de demostración de todos los componentes del sistema de diseño Gov.co
 */
export function ComponentsDemo() {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [showAlert, setShowAlert] = useState(true)
  const [loading, setLoading] = useState(false)

  const departamentos = [
    { value: 'antioquia', label: 'Antioquia' },
    { value: 'bogota', label: 'Bogotá D.C.' },
    { value: 'cundinamarca', label: 'Cundinamarca' },
    { value: 'valle', label: 'Valle del Cauca' },
  ]

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="container-govco py-8">
        <div className="space-y-8">
          {/* Introducción */}
          <Card variant="elevated">
            <CardHeader
              title="Demostración de Componentes"
              subtitle="Todos los componentes siguiendo las mejores prácticas de accesibilidad WCAG 2.1 AA"
            />
            <CardContent>
              <p className="text-base" style={{ color: 'var(--color-govco-gris)' }}>
                Esta página muestra todos los componentes disponibles en el sistema de diseño Gov.co.
                Cada componente está construido con React 19, TypeScript, y sigue las guías de accesibilidad.
              </p>
            </CardContent>
          </Card>

          {/* Alertas */}
          <Card>
            <CardHeader title="Alertas" subtitle="Componente Alert con variantes" />
            <CardContent>
              <div className="space-y-4">
                {showAlert && (
                  <Alert
                    variant="success"
                    title="¡Éxito!"
                    onClose={() => setShowAlert(false)}
                  >
                    Los cambios se han guardado correctamente.
                  </Alert>
                )}

                <Alert variant="info" title="Información">
                  Este es un mensaje informativo para el usuario.
                </Alert>

                <Alert variant="warning" title="Advertencia">
                  Por favor revisa los datos antes de continuar.
                </Alert>

                <Alert variant="error" title="Error">
                  Ha ocurrido un error al procesar la solicitud.
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <Card>
            <CardHeader title="Botones" subtitle="Componente Button con variantes y tamaños" />
            <CardContent>
              <div className="space-y-6">
                {/* Variantes */}
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-govco-gris-oscuro)' }}>
                    Variantes
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primario</Button>
                    <Button variant="secondary">Secundario</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="danger">Peligro</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* Tamaños */}
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-govco-gris-oscuro)' }}>
                    Tamaños
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Pequeño</Button>
                    <Button size="md">Mediano</Button>
                    <Button size="lg">Grande</Button>
                  </div>
                </div>

                {/* Estados */}
                <div>
                  <h4 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-govco-gris-oscuro)' }}>
                    Estados
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Deshabilitado</Button>
                    <Button loading={loading} onClick={handleLoadingDemo}>
                      {loading ? 'Cargando...' : 'Cargar'}
                    </Button>
                    <Button fullWidth>Ancho Completo</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formularios */}
          <Card>
            <CardHeader
              title="Formularios"
              subtitle="Componentes de formulario con validación"
            />
            <CardContent>
              <div className="space-y-6">
                {/* Input */}
                <Input
                  label="Nombre completo"
                  placeholder="Ingresa tu nombre"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="Tu nombre tal como aparece en el documento de identidad"
                  required
                  fullWidth
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  error="El formato del email no es válido"
                  fullWidth
                />

                {/* Select */}
                <Select
                  label="Departamento"
                  placeholder="Selecciona un departamento"
                  options={departamentos}
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  helperText="Selecciona el departamento donde resides"
                  required
                  fullWidth
                />

                {/* Textarea */}
                <Textarea
                  label="Mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  rows={4}
                  maxLength={500}
                  showCount
                  helperText="Máximo 500 caracteres"
                  fullWidth
                />

                {/* Checkbox */}
                <Checkbox
                  label="Acepto los términos y condiciones"
                  checked={checkboxValue}
                  onChange={(e) => setCheckboxValue(e.target.checked)}
                />

                {/* Radio Group */}
                <div className="space-y-2">
                  <p className="text-sm font-medium" style={{ color: 'var(--color-govco-gris-oscuro)' }}>
                    Selecciona una opción
                  </p>
                  <div className="space-y-2">
                    <Radio
                      label="Opción 1"
                      name="radio-group"
                      value="option1"
                      checked={radioValue === 'option1'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      label="Opción 2"
                      name="radio-group"
                      value="option2"
                      checked={radioValue === 'option2'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                    <Radio
                      label="Opción 3"
                      name="radio-group"
                      value="option3"
                      checked={radioValue === 'option3'}
                      onChange={(e) => setRadioValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-3">
                <Button variant="primary">Enviar</Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </CardFooter>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader
              title="Cards"
              subtitle="Componente Card con variantes"
            />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default">
                  <CardContent>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--color-govco-marino)' }}>
                      Card Default
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                      Card con borde simple
                    </p>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--color-govco-verde)' }}>
                      Card Outlined
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                      Card con borde grueso
                    </p>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardContent>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--color-govco-rojo)' }}>
                      Card Elevated
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-govco-gris)' }}>
                      Card con sombra
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
