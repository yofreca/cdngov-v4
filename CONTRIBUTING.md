# Guía de Contribución - Gov.co React App

¡Gracias por tu interés en contribuir a la aplicación Gov.co React App! Esta guía te ayudará a empezar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Guía de Estilo](#guía-de-estilo)
- [Testing](#testing)
- [Documentación](#documentación)
- [Pull Requests](#pull-requests)

## 📜 Código de Conducta

Este proyecto sigue los estándares del Gobierno de Colombia. Se espera que todos los contribuyentes:

- Sean respetuosos y profesionales
- Acepten críticas constructivas
- Se enfoquen en lo mejor para el proyecto
- Muestren empatía hacia otros colaboradores

## 🤝 Cómo Contribuir

### Tipos de Contribuciones

Aceptamos contribuciones en:

1. **Reportar Bugs** 🐛
   - Usa el template de issues
   - Incluye pasos para reproducir
   - Adjunta screenshots si es posible

2. **Proponer Funcionalidades** ✨
   - Describe el caso de uso
   - Explica el beneficio esperado
   - Considera alternativas

3. **Mejorar Documentación** 📚
   - Corregir errores tipográficos
   - Clarificar instrucciones
   - Agregar ejemplos

4. **Código** 💻
   - Correcciones de bugs
   - Nuevas funcionalidades
   - Optimizaciones de performance
   - Tests adicionales

## ⚙️ Configuración del Entorno

### Requisitos Previos

```bash
# Versión de Node.js
node --version  # v20.19+ o v22.12+

# Versión de npm
npm --version   # v9.0.0+
```

### Instalación

```bash
# 1. Fork el repositorio en GitHub

# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/cdngov-v4.git
cd cdngov-v4

# 3. Agregar upstream
git remote add upstream https://github.com/yofreca/cdngov-v4.git

# 4. Instalar dependencias
npm install

# 5. Copiar variables de entorno
cp .env.example .env

# 6. Iniciar servidor de desarrollo
npm run dev
```

### Verificar Instalación

```bash
# Ejecutar tests
npm run test:run

# Ejecutar linter
npm run lint

# Ejecutar formateo
npm run format:check
```

## 🔄 Flujo de Trabajo

### 1. Crear una Rama

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear rama feature/bugfix
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-bug
```

### Convención de Nombres de Ramas

- `feature/` - Nuevas funcionalidades
- `fix/` - Correcciones de bugs
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización de código
- `test/` - Agregar o modificar tests
- `perf/` - Mejoras de performance

Ejemplos:
- `feature/user-profile-page`
- `fix/login-validation-error`
- `docs/update-readme`
- `refactor/auth-service`

### 2. Hacer Cambios

```bash
# Hacer tus cambios...

# Verificar que todo funcione
npm run dev
npm run test:run
npm run lint

# Stage de cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar página de perfil de usuario"
```

### 3. Mantener Actualizada tu Rama

```bash
# Obtener últimos cambios
git fetch upstream

# Rebase sobre main
git rebase upstream/main

# Si hay conflictos, resolverlos y continuar
git rebase --continue
```

### 4. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Crear Pull Request en GitHub
# Usar el template de PR
```

## 📝 Estándares de Código

### TypeScript

```typescript
// ✅ DO: Usar tipos explícitos
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): User {
  // ...
}

// ❌ DON'T: Usar any
function getData(id: any): any {
  // ...
}
```

### React Components

```typescript
// ✅ DO: Componentes funcionales con TypeScript
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}

// ❌ DON'T: Componentes sin tipos
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}
```

### Naming Conventions

```typescript
// Components: PascalCase
export function UserProfile() {}

// Hooks: camelCase con prefijo 'use'
export function useAuth() {}

// Utilities: camelCase
export function formatDate() {}

// Constants: UPPER_SNAKE_CASE
export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024

// Types/Interfaces: PascalCase
export interface UserData {}
export type Status = 'active' | 'inactive'
```

### Imports

```typescript
// ✅ DO: Orden correcto de imports
import { useState, useEffect } from 'react'  // React primero
import { useNavigate } from 'react-router-dom'  // Librerías externas
import { Button } from '@components/common/Button'  // Componentes locales
import { useAuth } from '@hooks/useAuth'  // Hooks locales
import type { User } from '@services/authService'  // Types

// ❌ DON'T: Imports desordenados
import { Button } from '@components/common/Button'
import { useState } from 'react'
import type { User } from '@services/authService'
```

## 🎨 Guía de Estilo

### Sistema de Diseño Gov.co

Siempre usa los colores y componentes del sistema de diseño:

```typescript
// ✅ DO: Usar variables CSS de Gov.co
style={{ color: 'var(--color-govco-marino)' }}

// ❌ DON'T: Hardcodear colores
style={{ color: '#3366CC' }}
```

### Tailwind CSS

```typescript
// ✅ DO: Usar clases de Tailwind
<div className="flex items-center gap-4 p-6 bg-gray-50">

// ❌ DON'T: Inline styles innecesarios
<div style={{ display: 'flex', padding: '24px' }}>
```

### Accesibilidad (WCAG 2.1 AA)

```typescript
// ✅ DO: ARIA labels y roles
<button aria-label="Cerrar menú" role="button">
  <CloseIcon aria-hidden="true" />
</button>

// ✅ DO: Navegación por teclado
<div tabIndex={0} onKeyDown={handleKeyDown}>

// ❌ DON'T: Elementos sin accesibilidad
<div onClick={handleClick}>Clickeable</div>
```

### Seguridad OWASP

```typescript
// ✅ DO: Validar y sanitizar inputs
const emailSchema = z.string().email().max(255)
const sanitized = sanitizeString(userInput)

// ❌ DON'T: Usar input sin validar
const rawInput = request.body.email  // Peligroso
```

## 🧪 Testing

### Todos los Cambios Requieren Tests

```typescript
// Para componentes nuevos
describe('MyComponent', () => {
  it('debe renderizar correctamente', () => {
    render(<MyComponent />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('debe manejar interacciones', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)
    await user.click(screen.getByRole('button'))
    // Verificar resultado
  })
})

// Para utilidades
describe('myUtility', () => {
  it('debe procesar input correctamente', () => {
    expect(myUtility('input')).toBe('expected')
  })

  it('debe manejar casos edge', () => {
    expect(myUtility(null)).toBe(defaultValue)
  })
})
```

### Ejecutar Tests

```bash
# Antes de hacer commit
npm run test:run

# Verificar cobertura
npm run test:coverage
```

### Cobertura Mínima

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

## 📚 Documentación

### Comentarios en Código

```typescript
/**
 * Función que formatea una fecha según el formato colombiano
 *
 * @param date - Fecha a formatear
 * @param format - Formato deseado ('short' | 'long')
 * @returns String con la fecha formateada
 *
 * @example
 * formatDate(new Date(), 'short')  // "15/01/2025"
 * formatDate(new Date(), 'long')   // "15 de enero de 2025"
 */
export function formatDate(date: Date, format: 'short' | 'long'): string {
  // ...
}
```

### README de Componentes

Para componentes complejos, agregar README:

```markdown
# ComponentName

## Uso

\`\`\`typescript
<ComponentName
  prop1="value"
  prop2={true}
/>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | - | Descripción de prop1 |

## Ejemplos

...
```

## 🔍 Pull Requests

### Checklist Antes de Crear PR

- [ ] Tests pasan: `npm run test:run`
- [ ] Linter pasa: `npm run lint`
- [ ] Formato correcto: `npm run format:check`
- [ ] Build exitoso: `npm run build`
- [ ] Documentación actualizada
- [ ] Tests tienen cobertura adecuada
- [ ] Commits siguen conventional commits

### Template de PR

```markdown
## Descripción

Breve descripción de los cambios...

## Tipo de Cambio

- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Testing

- [ ] Tests unitarios agregados/actualizados
- [ ] Tests de integración agregados/actualizados
- [ ] Tests manuales realizados

## Screenshots (si aplica)

...

## Checklist

- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado self-review
- [ ] He comentado código complejo
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan warnings
- [ ] He agregado tests
- [ ] Todos los tests pasan
```

### Conventional Commits

Usamos el formato de conventional commits:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo, punto y coma faltante, etc
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `perf`: Mejoras de performance
- `chore`: Tareas de mantenimiento

**Ejemplos**:
```
feat(auth): agregar recuperación de contraseña
fix(dashboard): corregir error en paginación
docs(readme): actualizar instrucciones de instalación
test(button): agregar tests de accesibilidad
perf(datatable): optimizar renderizado con React.memo
```

### Scope Recomendados

- `auth` - Autenticación
- `dashboard` - Dashboard
- `forms` - Formularios
- `components` - Componentes
- `services` - Servicios
- `utils` - Utilidades
- `tests` - Testing
- `docs` - Documentación
- `build` - Build y configuración

## 🐛 Reportar Bugs

### Template de Issue

```markdown
**Describe el bug**
Descripción clara del problema...

**Pasos para reproducir**
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

**Comportamiento esperado**
Lo que debería suceder...

**Screenshots**
Si aplica, agregar screenshots

**Entorno**
- OS: [e.g. Windows 10, macOS 13]
- Navegador: [e.g. Chrome 120, Firefox 121]
- Versión Node: [e.g. v20.11.0]
- Versión del proyecto: [e.g. 1.0.0]

**Contexto adicional**
Cualquier información relevante...
```

## 🎓 Recursos

- [React 19 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Gov.co Design System](https://www.gov.co/)

## 💬 Comunicación

Para preguntas o discusiones:

- **GitHub Issues**: Para bugs y features
- **Pull Requests**: Para revisión de código
- **Email**: [correo de contacto]

## 📄 Licencia

Al contribuir, aceptas que tus contribuciones se licenciarán bajo la misma licencia del proyecto.

---

¡Gracias por contribuir a Gov.co React App! 🇨🇴
