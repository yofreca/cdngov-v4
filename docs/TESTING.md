# Testing Strategy - Gov.co React App

## 📋 Resumen

Esta documentación describe la estrategia de testing implementada en la aplicación Gov.co React App, incluyendo herramientas, estructura, mejores prácticas y cobertura.

## 🛠️ Herramientas

### Stack de Testing

- **Vitest** (v4.0.9) - Framework de testing ultrarrápido compatible con Vite
- **React Testing Library** (v16.3.0) - Testing de componentes React 19
- **@testing-library/jest-dom** (v6.9.1) - Matchers adicionales para DOM
- **@testing-library/user-event** (v14.6.1) - Simulación de interacciones de usuario
- **jsdom** (v27.2.0) - Implementación de DOM para Node.js
- **@vitest/ui** (v4.0.9) - Interfaz gráfica para visualizar tests

### ¿Por qué Vitest?

1. **Rendimiento**: 5-10x más rápido que Jest
2. **Integración con Vite**: Usa la misma configuración
3. **ES Modules nativos**: Sin necesidad de transformaciones
4. **Watch mode inteligente**: Solo re-ejecuta tests afectados
5. **Compatible con Jest**: API similar, fácil migración

## 📁 Estructura de Tests

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx           # Tests del componente
│   │   ├── LoadingSpinner.tsx
│   │   └── LoadingSpinner.test.tsx
│   └── dashboard/
│       ├── DataTable.tsx
│       └── DataTable.test.tsx
├── utils/
│   ├── validations.ts
│   └── validations.test.ts           # Tests de utilidades
├── services/
│   ├── authService.ts
│   └── authService.test.ts
└── test/
    ├── setup.ts                      # Configuración global
    └── test-utils.tsx                # Utilidades de testing
```

### Convención de Nombres

- Tests unitarios: `Component.test.tsx` o `function.test.ts`
- Tests de integración: `Feature.integration.test.tsx`
- Ubicación: Mismo directorio que el código fuente

## ⚙️ Configuración

### Vite Config (vite.config.ts)

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
      ],
    },
  },
})
```

### Setup File (src/test/setup.ts)

Configuración global que se ejecuta antes de todos los tests:

- Importa `@testing-library/jest-dom` para matchers adicionales
- Configura cleanup automático después de cada test
- Mocks de APIs del navegador:
  - `window.matchMedia` - Para tests responsive
  - `IntersectionObserver` - Para lazy loading
  - `localStorage` y `sessionStorage` - Para autenticación

### Test Utils (src/test/test-utils.tsx)

Wrapper personalizado con todos los providers necesarios:

```typescript
// Incluye automáticamente:
// - BrowserRouter (para navegación)
// - AuthProvider (para autenticación)
// - Cualquier otro provider global

import { render, screen } from '@test/test-utils'

// Uso en tests
render(<MyComponent />)
```

## 📝 Scripts de Testing

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar todos los tests una vez
npm run test:run

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Generar reporte de coverage
npm run test:coverage
```

## 🧪 Tipos de Tests

### 1. Tests Unitarios

Verifican componentes y funciones individuales de forma aislada.

**Ejemplo: Componente Button**

```typescript
describe('Button Component', () => {
  it('debe renderizar correctamente con children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('debe llamar onClick cuando se hace click', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Button</Button>)
    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**Componentes Testeados**:
- ✅ Button (27 tests)
- ✅ LoadingSpinner (19 tests)
- ⏳ Card (pendiente)
- ⏳ DataTable (pendiente)

### 2. Tests de Utilidades

Verifican funciones auxiliares y validaciones.

**Ejemplo: Validaciones OWASP**

```typescript
describe('Seguridad - OWASP', () => {
  describe('sanitizeString', () => {
    it('debe eliminar etiquetas HTML', () => {
      expect(sanitizeString('<script>alert("xss")</script>'))
        .toBe('scriptalert("xss")/script')
    })

    it('debe eliminar event handlers', () => {
      expect(sanitizeString('onclick=alert(1)')).toBe('')
    })
  })

  describe('containsMaliciousCode', () => {
    it('debe detectar código malicioso', () => {
      expect(containsMaliciousCode('<script>alert(1)</script>')).toBe(true)
      expect(containsMaliciousCode('javascript:void(0)')).toBe(true)
    })
  })
})
```

**Utilidades Testeadas**:
- ✅ validations.ts (60 tests)
  - Validaciones básicas (nombre, email, password)
  - Validaciones colombianas (cédula, teléfono, dirección)
  - Validaciones avanzadas (URLs, fechas, archivos)
  - Seguridad OWASP (sanitización, detección XSS)

### 3. Tests de Integración (Futuro)

Verifican la interacción entre múltiples componentes.

**Planeados**:
- Flow completo de autenticación (Login → Dashboard)
- Formularios con validación y envío
- Navegación entre páginas

### 4. Tests de Accesibilidad

Verifican cumplimiento WCAG 2.1 AA.

**Ejemplo**:

```typescript
it('debe ser accesible por teclado', async () => {
  const user = userEvent.setup()
  render(<Button onClick={handleClick}>Button</Button>)

  const button = screen.getByRole('button')
  button.focus()
  expect(button).toHaveFocus()

  await user.keyboard('{Enter}')
  expect(handleClick).toHaveBeenCalled()
})
```

## 📊 Cobertura Actual

### Resumen

```
Tests Ejecutados: 106
Tests Pasando: 91 (85.8%)
Tests Fallando: 15 (mayormente estilos inline en jsdom)

Archivos Testeados:
- src/components/common/Button.tsx
- src/components/common/LoadingSpinner.tsx
- src/utils/validations.ts
```

### Objetivo de Cobertura

| Tipo | Objetivo | Actual |
|------|----------|--------|
| Statements | 80% | ~40% (en progreso) |
| Branches | 75% | ~35% (en progreso) |
| Functions | 80% | ~45% (en progreso) |
| Lines | 80% | ~40% (en progreso) |

**Nota**: La cobertura aumentará significativamente al completar tests para:
- Componentes restantes (Card, DataTable, Forms)
- Servicios (authService, api)
- Hooks personalizados (useDataFetcher)
- Context providers (AuthContext)

## 🎯 Mejores Prácticas

### 1. Estructura de Tests

```typescript
describe('ComponentName', () => {
  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange - Preparar
      const props = { ... }

      // Act - Ejecutar
      render(<Component {...props} />)

      // Assert - Verificar
      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })
})
```

### 2. Testing Library Queries (Orden de Prioridad)

1. **getByRole** - Más accesible (preferido)
   ```typescript
   screen.getByRole('button', { name: /submit/i })
   ```

2. **getByLabelText** - Para formularios
   ```typescript
   screen.getByLabelText('Email')
   ```

3. **getByPlaceholderText** - Para inputs
   ```typescript
   screen.getByPlaceholderText('Ingrese su email')
   ```

4. **getByText** - Para contenido textual
   ```typescript
   screen.getByText(/bienvenido/i)
   ```

5. **getByTestId** - Último recurso
   ```typescript
   screen.getByTestId('custom-element')
   ```

### 3. Interacciones de Usuario

Usar `userEvent` en lugar de `fireEvent`:

```typescript
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

// Click
await user.click(button)

// Type
await user.type(input, 'texto')

// Keyboard
await user.keyboard('{Enter}')
```

### 4. Async Testing

```typescript
// Esperar a que aparezca un elemento
await waitFor(() => {
  expect(screen.getByText('Cargado')).toBeInTheDocument()
})

// Usar queries async
const element = await screen.findByRole('button')
```

### 5. Mocking

```typescript
// Mock de funciones
const mockFn = vi.fn()

// Mock de módulos
vi.mock('@services/api', () => ({
  api: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
  },
}))
```

## 🚫 Anti-Patrones a Evitar

### ❌ NO: Testing de Implementación

```typescript
// Malo - depende de la implementación interna
expect(wrapper.state('count')).toBe(1)
```

### ✅ SÍ: Testing de Comportamiento

```typescript
// Bueno - verifica el resultado visible
expect(screen.getByText('Count: 1')).toBeInTheDocument()
```

### ❌ NO: Queries por className o IDs

```typescript
// Malo - no es accesible
container.querySelector('.button-primary')
```

### ✅ SÍ: Queries por Roles y Labels

```typescript
// Bueno - accesible
screen.getByRole('button', { name: /primary/i })
```

### ❌ NO: Múltiples Asserts No Relacionados

```typescript
// Malo - difícil de debuggear
it('debe hacer muchas cosas', () => {
  expect(a).toBe(1)
  expect(b).toBe(2)
  expect(c).toBe(3)
})
```

### ✅ SÍ: Tests Enfocados

```typescript
// Bueno - un concepto por test
it('debe incrementar el contador', () => {
  expect(counter).toBe(1)
})
```

## 🔒 Testing de Seguridad

### Validaciones OWASP

Todos los tests de validación verifican protecciones contra:

- **A03 - Injection**: XSS, SQL injection
- **A07 - Identification Failures**: Validación de autenticación
- **A01 - Broken Access Control**: Autorización de rutas

```typescript
describe('Seguridad XSS', () => {
  it('debe detectar scripts maliciosos', () => {
    expect(containsMaliciousCode('<script>alert(1)</script>')).toBe(true)
  })

  it('debe sanitizar input del usuario', () => {
    const malicious = '<img src=x onerror=alert(1)>'
    const safe = sanitizeString(malicious)
    expect(safe).not.toContain('onerror')
  })
})
```

## ♿ Testing de Accesibilidad

Cada componente debe verificar:

1. **Roles ARIA correctos**
   ```typescript
   expect(screen.getByRole('button')).toBeInTheDocument()
   ```

2. **Labels accesibles**
   ```typescript
   expect(screen.getByLabelText('Email')).toBeInTheDocument()
   ```

3. **Navegación por teclado**
   ```typescript
   button.focus()
   await user.keyboard('{Enter}')
   ```

4. **Estados aria-disabled, aria-busy**
   ```typescript
   expect(button).toHaveAttribute('aria-busy', 'true')
   ```

## 📈 Roadmap de Testing

### Fase 10 - Actual (75% completada)

- ✅ Configuración de Vitest y RTL
- ✅ Setup files y test utils
- ✅ Tests de componentes comunes (Button, LoadingSpinner)
- ✅ Tests de utilidades (validations)
- ⏳ Tests de servicios (authService)
- ⏳ Tests de hooks (useDataFetcher)
- ⏳ Coverage reports configurados

### Próximas Mejoras

1. **Aumentar Cobertura**
   - Tests para todos los componentes (Card, DataTable, Forms)
   - Tests de servicios (authService, api)
   - Tests de context providers (AuthContext)

2. **Tests de Integración**
   - Flow completo de login
   - Navegación protegida
   - Formularios end-to-end

3. **Tests E2E** (Playwright)
   - User journeys completos
   - Tests en múltiples navegadores
   - Tests de accesibilidad automatizados

4. **Performance Testing**
   - Lighthouse CI en pipeline
   - Bundle size tracking
   - Render performance

## 🐛 Debugging Tests

### Ver Tests en UI

```bash
npm run test:ui
```

Abre interfaz gráfica en `http://localhost:51204/__vitest__/`

### Ver Coverage

```bash
npm run test:coverage
```

Genera reporte en `coverage/index.html`

### Debug en VS Code

Agregar a `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test"],
  "console": "integratedTerminal"
}
```

## 📚 Recursos

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [A11y Testing](https://www.a11y-101.com/development/automated-testing)

---

**Última actualización**: 2025-01-15
**Versión**: 1.0.0
**Tests Totales**: 106
**Cobertura**: ~40% (objetivo: 80%)
