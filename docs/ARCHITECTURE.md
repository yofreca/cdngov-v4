# Arquitectura - Gov.co React App

## Tabla de Contenidos

- [Vision General](#vision-general)
- [Stack Tecnologico](#stack-tecnologico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Arquitectura Modular](#arquitectura-modular)
- [Patrones de Diseno](#patrones-de-diseno)
- [Flujo de Datos](#flujo-de-datos)
- [Sistema de Rutas](#sistema-de-rutas)
- [Gestion de Estado](#gestion-de-estado)
- [Autenticacion y Autorizacion](#autenticacion-y-autorizacion)
- [Seguridad](#seguridad)
- [Performance](#performance)
- [Testing](#testing)

## Vision General

Gov.co React App es una aplicacion web moderna construida con React 19, TypeScript y Vite, disenada para el Gobierno de Colombia siguiendo estandares de accesibilidad WCAG 2.1 AA y seguridad OWASP.

### Principios Arquitectonicos

1. **Arquitectura Modular por Features** - Organizacion del codigo por dominios funcionales
2. **Separacion de Responsabilidades** - Componentes, logica de negocio y servicios separados
3. **Composicion sobre Herencia** - Componentes funcionales reutilizables
4. **Type Safety** - TypeScript en toda la aplicacion
5. **Performance First** - Lazy loading, code splitting, memoization
6. **Accessibility First** - WCAG 2.1 AA compliance
7. **Security First** - Validaciones OWASP, sanitizacion XSS

## Stack Tecnologico

### Core

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| React | 19.2.0 | UI Library con nuevas features (use, useOptimistic) |
| TypeScript | 5.9.3 | Type safety y mejor DX |
| Vite | 7.2.2 | Build tool ultrarrapido |
| React Router | 7.9.6 | Navegacion client-side |

### Styling

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Bootstrap | 5.3.3 | CSS framework con componentes |
| Sass | 1.77.0 | Preprocesador CSS |
| clsx | 2.1.1 | Conditional classnames |

### Forms & Validation

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| React Hook Form | 7.66.0 | Gestion de formularios |
| Zod | 4.1.12 | Validacion de schemas |
| @hookform/resolvers | 5.2.2 | Integracion RHF + Zod |

### HTTP & Security

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Axios | 1.13.2 | Cliente HTTP |
| DOMPurify | 3.3.0 | Sanitizacion XSS |

### Testing

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| Vitest | 4.0.9 | Framework de testing |
| React Testing Library | 16.3.0 | Testing de componentes |
| @testing-library/jest-dom | 6.9.1 | Matchers adicionales |
| jsdom | 27.2.0 | Entorno DOM |

### Development Tools

| Tecnologia | Version | Proposito |
|------------|---------|-----------|
| ESLint | 9.39.1 | Linting |
| Prettier | 3.6.2 | Formateo de codigo |
| @axe-core/react | 4.11.0 | Testing de accesibilidad |

## Estructura del Proyecto

```
cdngov-v4/
├── public/                    # Assets estaticos
│
├── src/
│   ├── assets/                # Recursos (imagenes, fuentes)
│   │   ├── images/            # Imagenes y logos
│   │   │   ├── CO.svg
│   │   │   ├── header_govco.png
│   │   │   ├── logo-arn.png
│   │   │   └── sara_icon_square.png
│   │   └── react.svg          # Logo React
│   │
│   ├── components/            # Componentes especificos (legacy - en proceso de migracion)
│   │   ├── dashboard/         # Componentes del dashboard
│   │   │   ├── DataTable.tsx
│   │   │   └── StatsCard.tsx
│   │   └── forms/             # Componentes de formularios
│   │       ├── DatePicker.tsx
│   │       └── FileUpload.tsx
│   │
│   ├── context/               # React Context providers
│   │
│   ├── feature/               # ARQUITECTURA MODULAR POR FEATURES
│   │   ├── auth/              # Modulo de autenticacion
│   │   │   ├── pages/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   └── ForgotPassword.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/         # Modulo de dashboard
│   │   │   ├── pages/
│   │   │   │   └── Dashboard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── demo/              # Modulo de demostracion
│   │   │   ├── pages/
│   │   │   │   ├── ComponentsDemo.tsx
│   │   │   │   ├── FormExample.tsx
│   │   │   │   ├── React19Features.tsx
│   │   │   │   └── NotFound.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── home/              # Modulo de home
│   │   │   ├── pages/
│   │   │   │   └── Home.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/            # Modulo de layout
│   │   │   ├── components/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── SideMenu.tsx
│   │   │   │   ├── AccessibilityBar.tsx
│   │   │   │   ├── ScrollToTop.tsx
│   │   │   │   └── SkipLinks.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useDataFetcher.ts
│   │
│   ├── pages/                 # Re-exports de paginas (legacy)
│   │   └── index.ts
│   │
│   ├── routes/                # Configuracion de rutas
│   │   ├── AppRoutes.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── services/              # Servicios y APIs
│   │   ├── api.ts
│   │   └── authService.ts
│   │
│   ├── shared/                # RECURSOS COMPARTIDOS
│   │   └── components/
│   │       └── ui/
│   │           ├── common/    # Componentes basicos
│   │           │   ├── Button.tsx
│   │           │   ├── Card.tsx
│   │           │   ├── LoadingSpinner.tsx
│   │           │   ├── LazyImage.tsx
│   │           │   └── ErrorBoundary.tsx
│   │           │
│   │           ├── forms/     # Componentes de formulario
│   │           │   ├── Input.tsx
│   │           │   ├── Checkbox.tsx
│   │           │   ├── Radio.tsx
│   │           │   ├── Select.tsx
│   │           │   └── Textarea.tsx
│   │           │
│   │           ├── alerts/    # Componentes de notificacion
│   │           │   └── Alert.tsx
│   │           │
│   │           └── index.ts
│   │
│   ├── styles/                # Estilos globales
│   │   └── main.scss          # Bootstrap + personalizaciones Gov.co
│   │
│   ├── test/                  # Utilidades de testing
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   │
│   ├── utils/                 # Funciones auxiliares
│   │   ├── securityLogger.ts
│   │   ├── validations.ts
│   │   ├── validations.test.ts
│   │   └── useFormId.ts
│   │
│   ├── App.tsx                # Componente raiz
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts
│
├── docs/                      # Documentacion
│
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts             # Configuracion de Vite con aliases
```

## Arquitectura Modular

### Organizacion por Features

El proyecto sigue una arquitectura modular donde cada feature contiene todo lo necesario para funcionar de forma autonoma:

```
feature/<nombre_modulo>/
├── components/          # Componentes especificos del modulo
├── pages/               # Paginas del modulo
├── interfaces/          # Types e interfaces del dominio
├── services/            # Servicios de acceso a datos
├── utils/               # Helpers y utilidades
└── index.ts             # Exportaciones publicas
```

### Capa Shared

Recursos transversales reutilizables en toda la aplicacion:

```
shared/
├── components/ui/       # Componentes UI reutilizables
│   ├── common/          # Button, Card, LoadingSpinner
│   ├── forms/           # Input, Select, Checkbox
│   └── alerts/          # Alert, Toast
├── constants/           # Constantes globales
├── enums/               # Enumeradores comunes
├── functions/           # Helpers y utilidades
├── guards/              # HOCs de proteccion de rutas
├── interceptors/        # Configuracion HTTP (axios)
├── interfaces/          # Types transversales
└── services/            # Servicios comunes
```

### Aliases de Importacion

Configurados en `vite.config.ts` y `tsconfig.json`:

```typescript
import { Button } from '@shared/components/ui'
import { Dashboard } from '@feature/dashboard/pages'
import { useAuth } from '@hooks/useAuth'
import { api } from '@services/api'
```

## Sistema de Estilos

### Bootstrap 5 con SCSS

El proyecto usa **Bootstrap 5.3.3** como sistema de estilos principal, personalizado con variables Gov.co:

```scss
// src/styles/main.scss

// Variables Gov.co
$govco-marino: #3366cc;
$govco-azul-oscuro: #004884;
$govco-verde: #068460;
$govco-rojo: #f42f63;

// Sobrescribir Bootstrap
$primary: $govco-marino;
$secondary: $govco-gris;
$success: $govco-verde;
$danger: $govco-rojo;

// Importar Bootstrap
@import "bootstrap/scss/bootstrap";
```

### CSS Variables

Disponibles globalmente para uso en componentes:

```css
:root {
  --govco-marino: #3366cc;
  --govco-azul-oscuro: #004884;
  --govco-verde: #068460;
  --govco-rojo: #f42f63;
}
```

### Clases Utilitarias Gov.co

```scss
// Colores de texto
.text-govco-marino { color: $govco-marino; }
.text-govco-azul-oscuro { color: $govco-azul-oscuro; }

// Backgrounds
.bg-govco-marino { background-color: $govco-marino; }

// Botones personalizados
.btn-govco-primary { ... }
.btn-govco-outline { ... }

// Container responsive
.container-govco { ... }
```

### Iconos SVG Inline

Los iconos usan SVG inline sin dependencias externas:

```tsx
// En lugar de react-icons
const FacebookIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
    <path d="M24 12.073c0-6.627..." />
  </svg>
)
```

## Patrones de Diseno

### 1. Component Composition Pattern

Componentes pequenos y reutilizables que se componen para crear UIs complejas.

```typescript
<Card>
  <CardHeader>
    <h2>Titulo</h2>
  </CardHeader>
  <CardContent>
    <p>Contenido</p>
  </CardContent>
</Card>
```

### 2. Custom Hooks Pattern

Encapsular logica reutilizable en hooks personalizados.

```typescript
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
```

### 3. Higher-Order Component Pattern

Componentes que envuelven otros componentes para agregar funcionalidad.

```typescript
<ProtectedRoute requiredRole="admin">
  <Dashboard />
</ProtectedRoute>
```

### 4. Provider Pattern

Context API para estado global.

```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

## Flujo de Datos

### Arquitectura Unidireccional

```
User Action → Event Handler → State Update → Re-render
```

### Estado Local vs Global

| Estado | Scope | Herramienta | Ejemplo |
|--------|-------|-------------|---------|
| Local | Componente | useState | Valor de input, modal abierto/cerrado |
| Global | Aplicacion | Context API | Usuario autenticado, configuracion |
| Servidor | Cache | React Query (futuro) | Datos de API |

## Sistema de Rutas

### Configuracion (React Router 7)

```typescript
// src/routes/AppRoutes.tsx
<Routes>
  <Route element={<MainLayout />}>
    {/* Rutas publicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/componentes" element={<ComponentsDemo />} />
    <Route path="/react-19" element={<React19Features />} />

    {/* Rutas protegidas */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
  </Route>
</Routes>
```

### Lazy Loading

Todas las rutas usan lazy loading para optimizar el bundle:

```typescript
const Dashboard = lazy(() =>
  import('@feature/dashboard/pages').then((m) => ({ default: m.Dashboard }))
)
```

## Gestion de Estado

### Context API

```typescript
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)
```

### React 19 Features

#### useOptimistic()

```typescript
const [optimisticUsers, updateOptimisticUsers] = useOptimistic(
  users,
  (state, newUser) => [...state, newUser]
)
```

#### use() Hook

```typescript
function UsersList() {
  const users = use(fetchUsers())
  return <div>{users.map(...)}</div>
}
```

## Autenticacion y Autorizacion

### Flujo de Autenticacion

```
Login → Validar (Zod) → authService.login() → localStorage → AuthContext → Navigate
```

### Proteccion de Rutas

```typescript
export function ProtectedRoute({ children, requiredRole }: Props) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
```

## Seguridad

### OWASP Top 10 Implementado

- **A01: Broken Access Control** - Rutas protegidas con verificacion de roles
- **A03: Injection** - Validacion con Zod, sanitizacion con DOMPurify
- **A07: Authentication Failures** - Rate limiting, passwords seguros

### Validaciones

```typescript
const passwordSchema = z.string()
  .min(8)
  .regex(/[A-Z]/)
  .regex(/[a-z]/)
  .regex(/[0-9]/)
  .regex(/[^A-Za-z0-9]/)
```

## Performance

### Code Splitting

```typescript
const Dashboard = lazy(() => import('@feature/dashboard/pages'))
```

### React.memo

```typescript
export const StatsCard = memo(function StatsCard(props) {
  return <div>...</div>
})
```

### Metricas

```
Bundle inicial: ~50KB
First Contentful Paint: ~0.8s
Time to Interactive: ~1.2s
```

## Testing

### Piramide de Testing

1. **Unit Tests** (60%) - Componentes, funciones, hooks
2. **Integration Tests** (30%) - Flows de autenticacion, formularios
3. **E2E Tests** (10%) - User journeys criticos

### Coverage Goals

```
Statements: 80%
Branches: 75%
Functions: 80%
Lines: 80%
```

## Decisiones Arquitectonicas

### Por que Bootstrap en lugar de Tailwind?

- Componentes pre-construidos para desarrollo rapido
- Integracion nativa con SCSS
- Sistema de grid robusto
- Compatibilidad con CDN Gov.co existente
- Menor curva de aprendizaje

### Por que React 19?

- useOptimistic() para mejor UX
- use() hook simplifica async
- Mejor performance y DX

### Por que Vite?

- 10x mas rapido que webpack
- HMR instantaneo
- ESM nativo

### Por que TypeScript?

- Type safety en compile time
- Mejor IntelliSense
- Refactoring mas seguro

### Por que Arquitectura Modular?

- Escalabilidad del proyecto
- Separacion clara de dominios
- Facilita trabajo en equipo
- Reutilizacion de codigo

## Referencias

- [React Architecture](https://react.dev/learn/thinking-in-react)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Ultima actualizacion**: 2025-11-20
**Version**: 2.0.1
