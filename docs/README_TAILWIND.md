# Guía de Uso - Tailwind CSS 4 con Estilos Gov.co

Este proyecto usa **Tailwind CSS 4** (última versión) con variables CSS personalizadas para el sistema de diseño de Gov.co.

## 🎨 Diferencias con Tailwind CSS 3

Tailwind CSS 4 introduce cambios importantes:

- ✨ **Nueva sintaxis:** `@import "tailwindcss"` en lugar de `@tailwind base/components/utilities`
- 🎯 **@theme directive:** Configuración del tema directamente en CSS
- ⚡ **Sin PostCSS:** Plugin de Vite integrado (`@tailwindcss/vite`)
- 📦 **Variables CSS nativas:** Todas las personalizaciones usan CSS custom properties

## 📋 Variables CSS Disponibles

### Colores Gov.co

```css
--color-govco-marino: #3366cc
--color-govco-azul-oscuro: #004884
--color-govco-verde: #068460
--color-govco-rojo: #f42f63
--color-govco-naranja: #f3561f
--color-govco-amarillo: #f7c924
--color-govco-gris-oscuro: #2c2c2c
--color-govco-gris: #4b4b4b
--color-govco-gris-claro: #d2d2d2
--color-govco-gris-muy-claro: #f2f2f2
```

### Fuentes

```css
--font-family-montserrat: 'Montserrat', sans-serif
--font-family-work-sans: 'Work Sans', sans-serif
```

### Tamaños de Texto

```css
--font-size-h1: 40px
--font-size-h2: 32px
--font-size-h3: 28px
--font-size-h4: 24px
--font-size-h5: 20px
--font-size-h6: 16px
--font-size-body: 20px
--font-size-body-md: 16px
--font-size-body-sm: 14px
```

## 🎯 Cómo Usar los Colores Personalizados

En Tailwind CSS 4, las clases personalizadas NO se generan automáticamente desde `@theme`.
Debes usar las variables CSS directamente con el atributo `style`:

### ❌ NO funciona (clases no generadas)
```jsx
<div className="bg-govco-marino text-govco-gris">
  Contenido
</div>
```

### ✅ SÍ funciona (variables CSS)
```jsx
<div style={{ backgroundColor: 'var(--color-govco-marino)', color: 'var(--color-govco-gris)' }}>
  Contenido
</div>
```

### ✅ Alternativa con clases Tailwind estándar + style
```jsx
<div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-govco-marino)' }}>
  <p className="text-white">Contenido</p>
</div>
```

## 🔧 Componentes Personalizados (Clases CSS)

Tenemos clases CSS personalizadas definidas en `src/index.css`:

### Container Gov.co
```jsx
<div className="container-govco">
  {/* Contenedor centrado con padding responsive */}
</div>
```

### Botones
```jsx
{/* Botón primario */}
<button className="btn-govco-primary">
  Primario
</button>

{/* Botón secundario */}
<button className="btn-govco-secondary">
  Secundario
</button>

{/* Botón outline */}
<button className="btn-govco-outline">
  Outline
</button>
```

## 📦 Tipografía Automática

Los elementos HTML tienen estilos aplicados automáticamente:

```jsx
{/* Usa automáticamente Montserrat y el tamaño correcto */}
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Sección</h3>

{/* Usa automáticamente Work Sans */}
<p>Párrafo con estilo por defecto</p>
```

## 🎨 Ejemplos Prácticos

### Card con colores Gov.co
```jsx
function Card() {
  return (
    <div className="rounded-lg shadow-md p-6" style={{ backgroundColor: 'var(--color-govco-gris-muy-claro)' }}>
      <h3 style={{ color: 'var(--color-govco-marino)' }}>
        Título de la Card
      </h3>
      <p className="mt-2">Contenido de la card</p>
      <button className="btn-govco-primary mt-4">
        Acción
      </button>
    </div>
  )
}
```

### Alert de éxito
```jsx
function SuccessAlert({ message }) {
  return (
    <div
      className="p-4 rounded-md border-2 flex items-center gap-3"
      style={{
        backgroundColor: '#f0fdf4',
        borderColor: 'var(--color-govco-verde)'
      }}
    >
      <svg className="w-5 h-5" style={{ color: 'var(--color-govco-verde)' }}>
        {/* Icono de check */}
      </svg>
      <p style={{ color: 'var(--color-govco-verde)' }}>{message}</p>
    </div>
  )
}
```

### Header
```jsx
function Header() {
  return (
    <header
      className="py-4"
      style={{ backgroundColor: 'var(--color-govco-marino)' }}
    >
      <div className="container-govco">
        <h1 className="text-white">Gov.co</h1>
        <nav className="flex gap-4 mt-2">
          <a href="/" className="text-white hover:underline">Inicio</a>
          <a href="/servicios" className="text-white hover:underline">Servicios</a>
        </nav>
      </div>
    </header>
  )
}
```

## 🚀 Mejores Prácticas

### 1. Combina Tailwind con Variables CSS
```jsx
// ✅ Usa utilidades de Tailwind para layout y spacing
// ✅ Usa variables CSS para colores personalizados
<div className="flex items-center gap-4 p-6 rounded-lg"
     style={{ backgroundColor: 'var(--color-govco-gris-muy-claro)' }}>
  <button className="btn-govco-primary">Click</button>
</div>
```

### 2. Crea Componentes Reutilizables
```jsx
// components/common/Alert.tsx
interface AlertProps {
  variant: 'success' | 'error' | 'warning'
  children: React.ReactNode
}

const colorMap = {
  success: 'var(--color-govco-verde)',
  error: 'var(--color-govco-rojo)',
  warning: 'var(--color-govco-amarillo)',
}

export function Alert({ variant, children }: AlertProps) {
  return (
    <div
      className="p-4 rounded-md border-2"
      style={{ borderColor: colorMap[variant] }}
    >
      {children}
    </div>
  )
}
```

### 3. Usa Tailwind para Estados
```jsx
<button
  className="px-4 py-2 rounded-md hover:opacity-90 active:scale-95 transition-all"
  style={{ backgroundColor: 'var(--color-govco-marino)' }}
>
  Hover me
</button>
```

## 📚 Recursos

- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [Tailwind CSS 4 @theme directive](https://tailwindcss.com/docs/theme)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 🔄 Migración desde Tailwind v3

Si encuentras código antiguo con clases como `bg-govco-marino`:

```jsx
// ❌ Tailwind v3 (no funciona en v4)
<div className="bg-govco-marino text-white">

// ✅ Actualizar a Tailwind v4
<div className="text-white" style={{ backgroundColor: 'var(--color-govco-marino)' }}>
```

O crea un componente wrapper:

```tsx
interface BoxProps {
  bgColor?: string
  children: React.ReactNode
  className?: string
}

export function Box({ bgColor, children, className = '' }: BoxProps) {
  return (
    <div
      className={className}
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {children}
    </div>
  )
}

// Uso:
<Box bgColor="var(--color-govco-marino)" className="p-4 rounded-lg">
  Contenido
</Box>
```
