# Componentes del Sistema de Diseño Gov.co

Sistema completo de componentes React siguiendo el diseño y lineamientos del Gobierno de Colombia.

## 📦 Componentes Disponibles

### Componentes Comunes

#### Button
Botón con múltiples variantes y estados.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' | 'link'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `disabled`: boolean

**Ejemplo:**
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Enviar
</Button>

<Button variant="outline" loading={isLoading}>
  Cargar más
</Button>
```

---

#### Input
Campo de texto con label, validación y mensajes de error.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `leftIcon`: ReactNode
- `rightIcon`: ReactNode
- `fullWidth`: boolean

**Ejemplo:**
```tsx
<Input
  label="Nombre completo"
  placeholder="Ingresa tu nombre"
  value={name}
  onChange={(e) => setName(e.target.value)}
  helperText="Tu nombre tal como aparece en el documento"
  required
  fullWidth
/>

<Input
  label="Email"
  type="email"
  error="El formato del email no es válido"
  fullWidth
/>
```

---

#### Select
Dropdown/select con opciones y validación.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `options`: SelectOption[]
- `placeholder`: string
- `fullWidth`: boolean

**Ejemplo:**
```tsx
const departamentos = [
  { value: 'antioquia', label: 'Antioquia' },
  { value: 'bogota', label: 'Bogotá D.C.' },
]

<Select
  label="Departamento"
  placeholder="Selecciona un departamento"
  options={departamentos}
  value={dept}
  onChange={(e) => setDept(e.target.value)}
  required
  fullWidth
/>
```

---

#### Textarea
Área de texto multilinea con contador de caracteres opcional.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `showCount`: boolean
- `maxLength`: number
- `fullWidth`: boolean

**Ejemplo:**
```tsx
<Textarea
  label="Mensaje"
  placeholder="Escribe tu mensaje aquí..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={4}
  maxLength={500}
  showCount
  fullWidth
/>
```

---

#### Checkbox
Casilla de verificación con label.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string

**Ejemplo:**
```tsx
<Checkbox
  label="Acepto los términos y condiciones"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
  required
/>
```

---

#### Radio
Botón de opción para grupos de selección única.

**Props:**
- `label`: string
- `error`: string

**Ejemplo:**
```tsx
<div>
  <Radio
    label="Opción 1"
    name="opciones"
    value="1"
    checked={selected === '1'}
    onChange={(e) => setSelected(e.target.value)}
  />
  <Radio
    label="Opción 2"
    name="opciones"
    value="2"
    checked={selected === '2'}
    onChange={(e) => setSelected(e.target.value)}
  />
</div>
```

---

#### Alert
Componente para mostrar mensajes de alerta, éxito, error o información.

**Props:**
- `variant`: 'success' | 'error' | 'warning' | 'info'
- `title`: string
- `onClose`: () => void

**Ejemplo:**
```tsx
<Alert variant="success" title="¡Éxito!">
  Los cambios se han guardado correctamente.
</Alert>

<Alert variant="error" title="Error" onClose={() => setShowAlert(false)}>
  Ha ocurrido un error al procesar la solicitud.
</Alert>

<Alert variant="warning" title="Advertencia">
  Por favor revisa los datos antes de continuar.
</Alert>

<Alert variant="info" title="Información">
  Este es un mensaje informativo para el usuario.
</Alert>
```

---

#### Card
Contenedor con variantes y subcomponentes.

**Props:**
- `variant`: 'default' | 'outlined' | 'elevated'
- `padding`: 'none' | 'sm' | 'md' | 'lg'

**Subcomponentes:**
- `CardHeader`: Encabezado con título y subtítulo
- `CardContent`: Contenido principal
- `CardFooter`: Pie de card

**Ejemplo:**
```tsx
<Card variant="elevated">
  <CardHeader
    title="Título de la Card"
    subtitle="Subtítulo opcional"
    action={<Button size="sm">Acción</Button>}
  />
  <CardContent>
    <p>Contenido de la card</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Guardar</Button>
    <Button variant="outline">Cancelar</Button>
  </CardFooter>
</Card>
```

---

### Componentes de Layout

#### Header
Encabezado de la aplicación con título y acciones.

**Props:**
- `title`: string
- `subtitle`: string
- `logo`: ReactNode
- `actions`: ReactNode

**Ejemplo:**
```tsx
<Header
  title="Gov.co React App"
  subtitle="Sistema de Diseño Gobierno de Colombia"
  logo={<Logo />}
  actions={
    <>
      <Button variant="outline" size="sm">Login</Button>
      <Button variant="primary" size="sm">Registro</Button>
    </>
  }
/>
```

---

#### Footer
Pie de página con copyright y links.

**Props:**
- `copyright`: string
- `links`: Array<{ label: string, href: string }>

**Ejemplo:**
```tsx
<Footer
  copyright="© 2025 Gobierno de Colombia"
  links={[
    { label: 'Términos y Condiciones', href: '/terminos' },
    { label: 'Política de Privacidad', href: '/privacidad' },
    { label: 'Contacto', href: '/contacto' },
  ]}
/>
```

---

## 🎨 Variables CSS de Gov.co

Todos los componentes usan las variables CSS personalizadas definidas en `src/index.css`:

### Colores
```css
var(--color-govco-marino)          /* #3366cc - Azul principal */
var(--color-govco-azul-oscuro)     /* #004884 - Azul oscuro */
var(--color-govco-verde)           /* #068460 - Verde éxito */
var(--color-govco-rojo)            /* #f42f63 - Rojo error */
var(--color-govco-naranja)         /* #f3561f - Naranja advertencia */
var(--color-govco-amarillo)        /* #f7c924 - Amarillo info */
var(--color-govco-gris-oscuro)     /* #2c2c2c - Gris texto */
var(--color-govco-gris)            /* #4b4b4b - Gris secundario */
var(--color-govco-gris-claro)      /* #d2d2d2 - Gris bordes */
var(--color-govco-gris-muy-claro)  /* #f2f2f2 - Gris fondo */
```

### Tipografía
```css
var(--font-family-montserrat)  /* Para títulos */
var(--font-family-work-sans)   /* Para texto */
```

## ♿ Accesibilidad

Todos los componentes siguen las guías WCAG 2.1 AA:

- ✅ Labels asociados correctamente con inputs
- ✅ Mensajes de error con `role="alert"`
- ✅ Navegación por teclado
- ✅ Focus visible personalizado
- ✅ ARIA attributes apropiados
- ✅ Contraste de colores adecuado
- ✅ Estados disabled y loading accesibles

## 🔧 Uso con React Hook Form

Todos los componentes de formulario son compatibles con React Hook Form:

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Select, Button } from '@components'

const schema = z.object({
  nombre: z.string().min(3, 'Mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  departamento: z.string().min(1, 'Selecciona un departamento'),
})

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Nombre"
        {...register('nombre')}
        error={errors.nombre?.message}
        fullWidth
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        fullWidth
      />

      <Select
        label="Departamento"
        {...register('departamento')}
        options={departamentos}
        error={errors.departamento?.message}
        fullWidth
      />

      <Button type="submit" variant="primary">
        Enviar
      </Button>
    </form>
  )
}
```

## 📱 Responsive

Todos los componentes son responsive y funcionan correctamente en:

- 📱 **Mobile:** 320px - 639px
- 📱 **Tablet:** 640px - 1023px
- 💻 **Desktop:** 1024px+

## 🚀 Importación

Todos los componentes se pueden importar desde el barrel export:

```tsx
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
  Header,
  Footer,
} from '@components'
```

O importar individualmente:

```tsx
import { Button } from '@components/common/Button'
import { Header } from '@components/layout/Header'
```

## 📚 Más Información

- Ver `src/pages/ComponentsDemo.tsx` para ejemplos de uso de todos los componentes
- Ver `README_TAILWIND.md` para guía de uso de Tailwind CSS 4
- Ver `react-19-best-practices.md` para mejores prácticas de React 19
