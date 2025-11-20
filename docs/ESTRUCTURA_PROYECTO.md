# Estructura del Proyecto - Gov.co React App

**Última actualización**: 2025-11-20
**Versión**: 1.0.0

## Resumen Ejecutivo

Este documento detalla la estructura completa del proyecto cdngov-v4, incluyendo todos los directorios, archivos principales, y su organización modular.

## Estructura Completa de Directorios

```
cdngov-v4/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── CO.svg                    # Escudo de Colombia
│   │   │   ├── header_govco.png          # Header Gov.co
│   │   │   ├── logo-arn.png              # Logo ARN
│   │   │   └── sara_icon_square.png      # Icono SARA
│   │   └── react.svg                     # Logo React
│   │
│   ├── components/                       # Componentes legacy (en proceso de migración)
│   │   ├── dashboard/
│   │   │   ├── DataTable.tsx             # Tabla de datos con paginación
│   │   │   └── StatsCard.tsx             # Tarjetas de estadísticas
│   │   ├── forms/
│   │   │   ├── DatePicker.tsx            # Selector de fechas
│   │   │   ├── FileUpload.tsx            # Carga de archivos
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── context/                          # React Context providers
│   │   ├── AuthContext.tsx               # Contexto de autenticación
│   │   └── index.ts
│   │
│   ├── feature/                          # ARQUITECTURA MODULAR POR FEATURES
│   │   │
│   │   ├── auth/                         # Módulo de autenticación
│   │   │   ├── pages/
│   │   │   │   ├── Login.tsx             # Página de inicio de sesión
│   │   │   │   ├── Register.tsx          # Página de registro
│   │   │   │   ├── ForgotPassword.tsx    # Recuperación de contraseña
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── dashboard/                    # Módulo de dashboard
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard.tsx         # Panel principal
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── demo/                         # Módulo de demostraciones
│   │   │   ├── pages/
│   │   │   │   ├── ComponentsDemo.tsx    # Demo de componentes
│   │   │   │   ├── FormExample.tsx       # Ejemplos de formularios
│   │   │   │   ├── React19Features.tsx   # Features de React 19
│   │   │   │   ├── NotFound.tsx          # Página 404
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── home/                         # Módulo home
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx              # Página principal
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                       # Módulo de layout
│   │   │   ├── components/
│   │   │   │   ├── MainLayout.tsx        # Layout principal
│   │   │   │   ├── Header.tsx            # Cabecera
│   │   │   │   ├── Footer.tsx            # Pie de página
│   │   │   │   ├── SideMenu.tsx          # Menú lateral
│   │   │   │   ├── AccessibilityBar.tsx  # Barra de accesibilidad
│   │   │   │   ├── ScrollToTop.tsx       # Botón scroll to top
│   │   │   │   ├── SkipLinks.tsx         # Enlaces de salto
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── hooks/                            # Custom React hooks
│   │   └── useDataFetcher.ts             # Hook para fetching de datos
│   │
│   ├── pages/                            # Re-exports de páginas (legacy)
│   │   └── index.ts
│   │
│   ├── routes/                           # Configuración de rutas
│   │   ├── AppRoutes.tsx                 # Rutas principales
│   │   ├── ProtectedRoute.tsx            # HOC para rutas protegidas
│   │   └── index.ts
│   │
│   ├── services/                         # Servicios y APIs
│   │   ├── api.ts                        # Cliente Axios configurado
│   │   └── authService.ts                # Servicio de autenticación
│   │
│   ├── shared/                           # RECURSOS COMPARTIDOS
│   │   ├── components/
│   │   │   └── ui/
│   │   │       ├── common/               # Componentes básicos
│   │   │       │   ├── Button.tsx        # Botón reutilizable
│   │   │       │   ├── Card.tsx          # Tarjeta reutilizable
│   │   │       │   ├── LoadingSpinner.tsx # Spinner de carga
│   │   │       │   ├── LazyImage.tsx     # Imagen lazy-loaded
│   │   │       │   ├── ErrorBoundary.tsx # Boundary de errores
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       ├── forms/                # Componentes de formulario
│   │   │       │   ├── Input.tsx         # Input de texto
│   │   │       │   ├── Checkbox.tsx      # Checkbox
│   │   │       │   ├── Radio.tsx         # Radio button
│   │   │       │   ├── Select.tsx        # Select dropdown
│   │   │       │   ├── Textarea.tsx      # Área de texto
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       ├── alerts/               # Componentes de notificación
│   │   │       │   ├── Alert.tsx         # Alerta reutilizable
│   │   │       │   └── index.ts
│   │   │       │
│   │   │       └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── styles/                           # Estilos globales
│   │   └── main.scss                     # Bootstrap + personalizaciones Gov.co
│   │
│   ├── test/                             # Utilidades de testing
│   │   ├── setup.ts                      # Configuración de Vitest
│   │   └── test-utils.tsx                # Utilidades para tests
│   │
│   ├── utils/                            # Funciones auxiliares
│   │   ├── securityLogger.ts             # Logger de seguridad
│   │   ├── validations.ts                # Esquemas de validación Zod
│   │   ├── validations.test.ts           # Tests de validaciones
│   │   └── useFormId.ts                  # Hook para IDs de formularios
│   │
│   ├── App.tsx                           # Componente raíz
│   ├── main.tsx                          # Entry point
│   ├── index.css                         # Estilos CSS globales
│   └── vite-env.d.ts                     # Tipos de TypeScript para Vite
│
├── docs/                                 # Documentación
│   ├── ARCHITECTURE.md                   # Arquitectura del proyecto
│   ├── COMPONENTS.md                     # Catálogo de componentes
│   ├── STRUCTURE_PROJECT.md              # Este documento
│   ├── SEGURIDAD_OWASP.md                # Seguridad OWASP
│   ├── PERFORMANCE_OPTIMIZATIONS.md      # Optimizaciones
│   ├── REACT_19_FEATURES.md              # Features de React 19
│   ├── DEPLOYMENT.md                     # Guía de deployment
│   ├── TESTING.md                        # Estrategia de testing
│   ├── CONTRIBUTING.md                   # Guía para contribuidores
│   ├── PLAN_COMPLETO_PROYECTO.md         # Plan del proyecto
│   ├── CHANGELOG.md                      # Historial de cambios
│   ├── AJUSTES_MENU_FOOTER.md            # Ajustes de UI
│   ├── FASE_2_COMPLETADA.md              # Documentación de fase
│   ├── FASE_3_COMPLETADA.md
│   ├── FASE_4_COMPLETADA.md
│   ├── FASE_5_COMPLETADA.md
│   ├── FASE_6_COMPLETADA.md
│   └── FASE_7_COMPLETADA.md
│
├── .env.example                          # Variables de entorno ejemplo
├── .eslintrc.config.js                   # Configuración ESLint
├── .prettierrc                           # Configuración Prettier
├── index.html                            # HTML principal
├── package.json                          # Dependencias y scripts
├── tsconfig.json                         # Configuración TypeScript base
├── tsconfig.app.json                     # Configuración TS para app
├── tsconfig.node.json                    # Configuración TS para Node
├── vite.config.ts                        # Configuración Vite
└── vitest.config.ts                      # Configuración Vitest
```

## Módulos Principales

### 1. Feature Modules (`src/feature/`)

Cada módulo funcional contiene su propia lógica encapsulada:

| Módulo | Propósito | Componentes Principales |
|--------|-----------|------------------------|
| **auth** | Autenticación de usuarios | Login, Register, ForgotPassword |
| **dashboard** | Panel de control | Dashboard |
| **demo** | Demostraciones | ComponentsDemo, FormExample, React19Features, NotFound |
| **home** | Página principal | Home |
| **layout** | Componentes de layout | MainLayout, Header, Footer, SideMenu, AccessibilityBar |

### 2. Shared Components (`src/shared/`)

Componentes reutilizables organizados por categoría:

**Common** (5 componentes):
- Button - Botón reutilizable
- Card - Tarjeta contenedora
- LoadingSpinner - Indicador de carga
- LazyImage - Imagen con carga perezosa
- ErrorBoundary - Manejo de errores

**Forms** (5 componentes):
- Input - Campo de texto
- Checkbox - Casilla de verificación
- Radio - Botón de radio
- Select - Lista desplegable
- Textarea - Área de texto

**Alerts** (1 componente):
- Alert - Notificaciones

### 3. Legacy Components (`src/components/`)

Componentes en proceso de migración a la arquitectura modular:

**Dashboard**:
- DataTable - Tabla de datos paginada
- StatsCard - Tarjetas de estadísticas

**Forms**:
- DatePicker - Selector de fechas
- FileUpload - Carga de archivos

### 4. Core Infrastructure

**Context** (`src/context/`):
- AuthContext - Gestión de estado de autenticación

**Routes** (`src/routes/`):
- AppRoutes - Configuración de rutas
- ProtectedRoute - HOC para rutas protegidas

**Services** (`src/services/`):
- api - Cliente HTTP Axios
- authService - Lógica de autenticación

**Hooks** (`src/hooks/`):
- useDataFetcher - Hook para fetching de datos

**Utils** (`src/utils/`):
- securityLogger - Logger de eventos de seguridad
- validations - Esquemas de validación Zod
- useFormId - Generación de IDs únicos

## Aliases de Importación

Configurados en `vite.config.ts` y `tsconfig.app.json`:

```typescript
@              → src/
@shared        → src/shared/
@feature       → src/feature/
@components    → src/components/
@pages         → src/pages/
@hooks         → src/hooks/
@utils         → src/utils/
@services      → src/services/
@assets        → src/assets/
@context       → src/context/
@styles        → src/styles/
@routes        → src/routes/
@test          → src/test/
```

## Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Archivos TypeScript/React** | 66 |
| **Módulos Features** | 5 |
| **Componentes Shared** | 11 |
| **Componentes Legacy** | 4 |
| **Páginas Totales** | 9 |
| **Servicios** | 2 |
| **Hooks Personalizados** | 2 |
| **Archivos de Documentación** | 17 |
| **Líneas de Documentación** | ~8,800 |

## Assets del Proyecto

### Imágenes

| Archivo | Tipo | Propósito |
|---------|------|-----------|
| CO.svg | Vector | Escudo de Colombia |
| header_govco.png | Raster | Header oficial Gov.co |
| logo-arn.png | Raster | Logo ARN |
| sara_icon_square.png | Raster | Icono SARA |
| react.svg | Vector | Logo React |

## Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `vite.config.ts` | Configuración de Vite con 14 aliases, dev server en puerto 3000 |
| `tsconfig.app.json` | TypeScript strict mode, target ES2022, JSX react-jsx |
| `tsconfig.node.json` | Configuración TypeScript para scripts Node |
| `eslint.config.js` | ESLint 9 Flat Config con React, a11y, Prettier |
| `vitest.config.ts` | Configuración de testing con Vitest |
| `.prettierrc` | Formateo de código |
| `.env.example` | Template de variables de entorno |
| `package.json` | Dependencias y scripts NPM |

## Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor dev (puerto 3000, auto-open)
npm run build            # Build producción (Node 20+)
npm run preview          # Preview del build

# Linting y Formateo
npm run lint             # ESLint
npm run lint:fix         # Corregir automáticamente
npm run format           # Prettier
npm run format:check     # Verificar sin cambios

# Testing
npm run test             # Tests modo watch
npm run test:ui          # UI interactiva
npm run test:run         # Ejecutar una vez
npm run test:coverage    # Reporte de cobertura
```

## Estado de Migración

### Completado ✓

- Arquitectura modular por features
- Migración a Bootstrap 5.3.3
- Componentes shared reutilizables
- Sistema de routing lazy-loaded
- Context API para autenticación
- Testing con Vitest
- Documentación exhaustiva

### En Progreso

- Migración de componentes legacy a feature modules
- Incremento de cobertura de tests (objetivo: 80%)
- Optimizaciones de performance

## Referencias

- **ARCHITECTURE.md** - Arquitectura detallada y patrones
- **COMPONENTS.md** - Catálogo de componentes con ejemplos
- **README.md** - Guía de inicio rápido

---

**Última actualización**: 2025-11-20
**Versión**: 1.0.0
**Mantenedor**: Equipo Gov.co
