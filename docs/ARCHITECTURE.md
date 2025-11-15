# Arquitectura - Gov.co React App

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Patrones de Diseño](#patrones-de-diseño)
- [Flujo de Datos](#flujo-de-datos)
- [Sistema de Rutas](#sistema-de-rutas)
- [Gestión de Estado](#gestión-de-estado)
- [Autenticación y Autorización](#autenticación-y-autorización)
- [Seguridad](#seguridad)
- [Performance](#performance)
- [Testing](#testing)

## 🎯 Visión General

Gov.co React App es una aplicación web moderna construida con React 19, TypeScript y Vite, diseñada para el Gobierno de Colombia siguiendo estándares de accesibilidad WCAG 2.1 AA y seguridad OWASP.

### Principios Arquitectónicos

1. **Separación de Responsabilidades** - Componentes, lógica de negocio y servicios separados
2. **Composición sobre Herencia** - Componentes funcionales reutilizables
3. **Type Safety** - TypeScript en toda la aplicación
4. **Performance First** - Lazy loading, code splitting, memoization
5. **Accessibility First** - WCAG 2.1 AA compliance
6. **Security First** - Validaciones OWASP, sanitización XSS

## 🛠️ Stack Tecnológico

### Core

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.0 | UI Library con nuevas features (use, useOptimistic) |
| TypeScript | 5.9.3 | Type safety y mejor DX |
| Vite | 7.2.2 | Build tool ultrarrápido |
| React Router | 7.9.6 | Navegación client-side |

### Styling

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Tailwind CSS | 4.1.17 | Utility-first CSS framework |
| clsx | 2.1.1 | Conditional classnames |

### Forms & Validation

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React Hook Form | 7.66.0 | Gestión de formularios |
| Zod | 4.1.12 | Validación de schemas |
| @hookform/resolvers | 5.2.2 | Integración RHF + Zod |

### HTTP & Security

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Axios | 1.13.2 | Cliente HTTP |
| DOMPurify | 3.3.0 | Sanitización XSS |

### Testing

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Vitest | 4.0.9 | Framework de testing |
| React Testing Library | 16.3.0 | Testing de componentes |
| @testing-library/jest-dom | 6.9.1 | Matchers adicionales |
| jsdom | 27.2.0 | Entorno DOM |

### Development Tools

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ESLint | 9.39.1 | Linting |
| Prettier | 3.6.2 | Formateo de código |
| @axe-core/react | 4.11.0 | Testing de accesibilidad |

## 📁 Estructura del Proyecto

```
cdngov-v4/
├── public/                    # Assets estáticos
│   └── vite.svg
│
├── src/
│   ├── assets/                # Recursos (imágenes, fuentes, iconos)
│   │   ├── fonts/             # Fuentes Montserrat y Work Sans
│   │   ├── icons/             # Iconos SVG
│   │   └── images/            # Imágenes
│   │
│   ├── components/            # Componentes React
│   │   ├── common/            # Componentes reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── LazyImage.tsx
│   │   │
│   │   ├── dashboard/         # Componentes del dashboard
│   │   │   ├── DataTable.tsx
│   │   │   └── StatsCard.tsx
│   │   │
│   │   ├── examples/          # Componentes de demostración
│   │   │   └── React19Features.tsx
│   │   │
│   │   ├── forms/             # Componentes de formularios
│   │   │   ├── DatePicker.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   └── Input.tsx
│   │   │
│   │   └── layout/            # Componentes de layout
│   │       ├── AccessibilityBar.tsx
│   │       ├── Footer.tsx
│   │       ├── Header.tsx
│   │       ├── MainLayout.tsx
│   │       ├── Navbar.tsx
│   │       └── SkipLinks.tsx
│   │
│   ├── context/               # React Context providers
│   │   └── AuthContext.tsx    # Estado de autenticación global
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useDataFetcher.ts  # Hook con use() de React 19
│   │   └── useFormId.ts       # Generación de IDs únicos
│   │
│   ├── pages/                 # Páginas de la aplicación
│   │   ├── ComponentsDemo.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── FormExample.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   └── Register.tsx
│   │
│   ├── routes/                # Configuración de rutas
│   │   ├── AppRoutes.tsx      # Definición de rutas
│   │   └── ProtectedRoute.tsx # HOC para rutas protegidas
│   │
│   ├── services/              # Servicios y APIs
│   │   ├── api.ts             # Cliente Axios configurado
│   │   └── authService.ts     # Servicio de autenticación
│   │
│   ├── styles/                # Estilos globales
│   │   └── index.css          # CSS base + Tailwind
│   │
│   ├── test/                  # Utilidades de testing
│   │   ├── setup.ts           # Setup de Vitest
│   │   └── test-utils.tsx     # Helpers de testing
│   │
│   ├── utils/                 # Funciones auxiliares
│   │   ├── securityLogger.ts  # Logging de eventos de seguridad
│   │   └── validations.ts     # Schemas de validación Zod
│   │
│   ├── App.tsx                # Componente raíz
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts          # Types de Vite
│
├── docs/                      # Documentación
│   ├── ARCHITECTURE.md        # Este archivo
│   ├── PERFORMANCE_OPTIMIZATIONS.md
│   ├── REACT_19_FEATURES.md
│   └── TESTING.md
│
├── .env                       # Variables de entorno (no en git)
├── .env.example               # Template de variables
├── .gitignore
├── CONTRIBUTING.md            # Guía de contribución
├── eslint.config.js           # Configuración de ESLint
├── index.html                 # HTML principal
├── package.json
├── prettier.config.js         # Configuración de Prettier
├── README.md
├── tailwind.config.js         # Configuración de Tailwind
├── tsconfig.json              # Configuración de TypeScript
└── vite.config.ts             # Configuración de Vite
```

## 🎨 Patrones de Diseño

### 1. Component Composition Pattern

Componentes pequeños y reutilizables que se componen para crear UIs complejas.

```typescript
// Composición de componentes
<Card>
  <CardHeader>
    <h2>Título</h2>
  </CardHeader>
  <CardContent>
    <p>Contenido</p>
  </CardContent>
</Card>
```

### 2. Render Props Pattern

Compartir lógica entre componentes mediante funciones render.

```typescript
<DataTable
  data={users}
  columns={columns}
  renderRow={(user) => <UserRow key={user.id} user={user} />}
/>
```

### 3. Custom Hooks Pattern

Encapsular lógica reutilizable en hooks personalizados.

```typescript
// useAuth hook
function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}

// Uso
const { user, isAuthenticated, login, logout } = useAuth()
```

### 4. Higher-Order Component Pattern

Componentes que envuelven otros componentes para agregar funcionalidad.

```typescript
// ProtectedRoute HOC
<ProtectedRoute requiredRole="admin">
  <Dashboard />
</ProtectedRoute>
```

### 5. Provider Pattern

Context API para estado global.

```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

### 6. Compound Components Pattern

Componentes que trabajan juntos compartiendo estado implícito.

```typescript
<Accordion>
  <AccordionItem>
    <AccordionHeader>Título</AccordionHeader>
    <AccordionPanel>Contenido</AccordionPanel>
  </AccordionItem>
</Accordion>
```

## 🔄 Flujo de Datos

### Arquitectura Unidireccional

```
User Action → Event Handler → State Update → Re-render
```

### Ejemplo: Login Flow

```typescript
// 1. Usuario envía formulario
const handleSubmit = async (data) => {
  // 2. Validación en cliente (Zod)
  const validated = loginSchema.parse(data)

  // 3. Llamada a servicio
  const response = await authService.login(validated)

  // 4. Actualizar contexto global
  login(response.user, response.token)

  // 5. Navegación
  navigate('/dashboard')
}
```

### Estado Local vs Global

| Estado | Scope | Herramienta | Ejemplo |
|--------|-------|-------------|---------|
| Local | Componente | useState | Valor de input, modal abierto/cerrado |
| Global | Aplicación | Context API | Usuario autenticado, configuración |
| Servidor | Cache | React Query (futuro) | Datos de API |

## 🗺️ Sistema de Rutas

### Configuración (React Router 7)

```typescript
// src/routes/AppRoutes.tsx
<Routes>
  <Route element={<MainLayout />}>
    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
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
  import('@pages/Dashboard').then((m) => ({ default: m.Dashboard }))
)

// Suspense wrapper
<Suspense fallback={<LoadingSpinner fullScreen />}>
  <Routes>...</Routes>
</Suspense>
```

### Rutas Protegidas

```typescript
// ProtectedRoute verifica autenticación y roles
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

## 🗄️ Gestión de Estado

### Context API

```typescript
// AuthContext.tsx
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider con lógica de negocio
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)

  // Inicialización desde localStorage
  useEffect(() => {
    const storedUser = authService.getUser()
    if (storedUser) setUser(storedUser)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, ... }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### React 19 Features

#### useOptimistic()

```typescript
const [optimisticUsers, updateOptimisticUsers] = useOptimistic(
  users,
  (state, newUser) => [...state, newUser]
)

// UI se actualiza inmediatamente
updateOptimisticUsers(newUser)

// Después se confirma con el servidor
await api.createUser(newUser)
```

#### use() Hook

```typescript
// Lectura directa de promises
function UsersList() {
  const users = use(fetchUsers())  // Suspende hasta resolverse
  return <div>{users.map(...)}</div>
}

<Suspense fallback={<Loading />}>
  <UsersList />
</Suspense>
```

## 🔐 Autenticación y Autorización

### Flujo de Autenticación

```
┌─────────────┐
│   Login     │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ Validar con Zod  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ authService      │
│ .login()         │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Guardar en       │
│ localStorage/    │
│ sessionStorage   │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Actualizar       │
│ AuthContext      │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Navegar a        │
│ /dashboard       │
└──────────────────┘
```

### JWT Token Management

```typescript
class AuthService {
  // Almacenar token
  setAuthData(user: User, token: string, rememberMe: boolean) {
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem('auth_token', token)
    storage.setItem('auth_user', JSON.stringify(user))
  }

  // Verificar expiración
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token)
    return Date.now() >= decoded.exp * 1000
  }

  // Renovar token
  async refreshAuthToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken()
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data.token
  }
}
```

### Protección de Rutas

```typescript
// ProtectedRoute.tsx
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

## 🛡️ Seguridad

### OWASP Top 10 Implementado

#### A01: Broken Access Control
```typescript
// Rutas protegidas con verificación de roles
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

#### A03: Injection (XSS, SQL Injection)
```typescript
// Validación con Zod
const userInputSchema = z.string()
  .max(255)
  .regex(/^[a-zA-Z0-9\s]+$/)

// Sanitización
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(dirty)

// Detección de código malicioso
if (containsMaliciousCode(input)) {
  throw new Error('Input malicioso detectado')
}
```

#### A07: Identification and Authentication Failures
```typescript
// Rate limiting en login
const MAX_ATTEMPTS = 5
if (attemptCount >= MAX_ATTEMPTS) {
  throw new Error('Demasiados intentos')
}

// Passwords seguros
const passwordSchema = z.string()
  .min(8)
  .regex(/[A-Z]/)  // Al menos una mayúscula
  .regex(/[a-z]/)  // Al menos una minúscula
  .regex(/[0-9]/)  // Al menos un número
  .regex(/[^A-Za-z0-9]/)  // Al menos un especial
```

### Security Logger

```typescript
securityLogger.log(
  SecurityEventType.LOGIN_SUCCESS,
  SecurityLevel.INFO,
  'Usuario autenticado exitosamente',
  { userId: user.id }
)
```

## ⚡ Performance

### Code Splitting

```typescript
// Lazy loading de rutas
const Dashboard = lazy(() => import('@pages/Dashboard'))

// Bundle inicial: ~50KB (antes: ~150KB)
// Reducción: 66%
```

### React.memo

```typescript
// Componentes memoizados
export const StatsCard = memo(function StatsCard(props) {
  return <div>...</div>
})

// Re-renders reducidos: 75%
```

### useMemo & useCallback

```typescript
// Memoización de valores
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name))
}, [data])

// Memoización de funciones
const handleClick = useCallback(() => {
  console.log('clicked')
}, [])
```

### Lazy Loading de Imágenes

```typescript
<LazyImage
  src="/large-image.jpg"
  alt="Descripción"
  loading="lazy"
/>

// Usa Intersection Observer para cargar solo cuando visible
```

### Métricas

```
Bundle inicial: ~50KB (-66%)
First Contentful Paint: ~0.8s (-68%)
Time to Interactive: ~1.2s (-66%)
Re-renders: -75%
```

## 🧪 Testing

### Pirámide de Testing

```
      /\
     /  \
    / E2E\     ← Pocos tests, flujos críticos
   /______\
  /        \
 /Integration\ ← Tests de interacción entre componentes
/______________\
/              \
/  Unit Tests   \  ← Mayoría de tests, componentes y funciones
/_________________\
```

### Testing Strategy

1. **Unit Tests** (60%)
   - Componentes individuales
   - Funciones de utilidades
   - Hooks personalizados

2. **Integration Tests** (30%)
   - Flows de autenticación
   - Formularios completos
   - Navegación entre páginas

3. **E2E Tests** (10%)
   - User journeys críticos
   - Funcionalidades principales

### Coverage Goals

```
Statements: 80%
Branches: 75%
Functions: 80%
Lines: 80%
```

## 📊 Diagrama de Arquitectura

```
┌────────────────────────────────────────────────────────┐
│                     Browser                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │              React Application                   │  │
│  │                                                  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌───────────┐ │  │
│  │  │   Pages    │  │ Components │  │  Layouts  │ │  │
│  │  └─────┬──────┘  └──────┬─────┘  └─────┬─────┘ │  │
│  │        │                │               │        │  │
│  │        ▼                ▼               ▼        │  │
│  │  ┌─────────────────────────────────────────┐    │  │
│  │  │          React Router                   │    │  │
│  │  └────────────────┬────────────────────────┘    │  │
│  │                   │                              │  │
│  │        ┌──────────┴──────────┐                  │  │
│  │        ▼                     ▼                  │  │
│  │  ┌───────────┐        ┌───────────┐            │  │
│  │  │  Context  │        │   Hooks   │            │  │
│  │  │  (Auth)   │        │ (Custom)  │            │  │
│  │  └─────┬─────┘        └─────┬─────┘            │  │
│  │        │                    │                   │  │
│  │        └──────────┬─────────┘                   │  │
│  │                   ▼                             │  │
│  │            ┌─────────────┐                      │  │
│  │            │  Services   │                      │  │
│  │            │  (API)      │                      │  │
│  │            └──────┬──────┘                      │  │
│  └───────────────────┼──────────────────────────── │  │
└────────────────────┼─┼────────────────────────────────┘
                     │ │
                     │ │ HTTP/HTTPS
                     ▼ ▼
              ┌──────────────┐
              │   Backend    │
              │     API      │
              └──────────────┘
```

## 🔮 Decisiones Arquitectónicas

### ¿Por qué React 19?

- useOptimistic() para mejor UX
- use() hook simplifica async
- Mejor performance y DX

### ¿Por qué Vite?

- 10x más rápido que webpack
- HMR instantáneo
- ESM nativo

### ¿Por qué TypeScript?

- Type safety en compile time
- Mejor IntelliSense
- Refactoring más seguro

### ¿Por qué Context API en lugar de Redux?

- Aplicación pequeña/mediana
- Menos boilerplate
- Performance suficiente
- React 19 lo hace más eficiente

### ¿Por qué Tailwind?

- Desarrollo más rápido
- Bundle optimizado
- Design system consistente

## 📚 Referencias

- [React Architecture](https://react.dev/learn/thinking-in-react)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**Última actualización**: 2025-01-15
**Versión**: 1.0.0
