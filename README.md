# Gov.co React App

Aplicación React 19 con diseño y componentes del estilo Gov.co (Gobierno de Colombia).

## 🚀 Tecnologías

- **React 19.2.0** - Última versión con nuevas características
- **TypeScript** - Type safety y mejor DX
- **Vite 7** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos con paleta Gov.co
- **React Router 7** - Navegación y rutas
- **React Hook Form + Zod** - Formularios con validación
- **Axios** - Cliente HTTP
- **DOMPurify** - Sanitización XSS
- **ESLint 9 + Prettier** - Linting y formateo

## 📋 Requisitos

⚠️ **Importante:** Este proyecto requiere Node.js 20.19+ o 22.12+ para el build de producción.

- Node.js: v20.19+ (recomendado) o v22.12+
- npm: v9.0.0+

Para desarrollo con Node 18, el servidor de desarrollo (`npm run dev`) debería funcionar, pero el build puede fallar.

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/yofreca/cdngov-v4.git
cd cdngov-v4

# Instalar dependencias (IMPORTANTE: ejecutar siempre después de clonar)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor se abrirá automáticamente en http://localhost:5173

⚠️ **Solución de Problemas:**

Si recibes el error `Failed to resolve import "@axe-core/react"`:
```bash
# Ejecuta npm install para instalar todas las dependencias
npm install

# Si el problema persiste, borra node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

## 📜 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (puerto 3000)
npm run build        # Build de producción (requiere Node 20+)
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formateo
```

## 📁 Estructura del Proyecto

```
govco-react-app/
├── src/
│   ├── assets/          # Imágenes, fuentes, iconos
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/      # Componentes reutilizables
│   │   ├── common/      # Botones, inputs, cards
│   │   ├── forms/       # Componentes de formularios
│   │   └── layout/      # Header, Footer, Sidebar
│   ├── context/         # Context API providers
│   ├── hooks/           # Custom hooks
│   ├── pages/           # Páginas de la aplicación
│   ├── routes/          # Configuración de rutas
│   ├── services/        # APIs y servicios
│   ├── styles/          # Estilos globales
│   ├── utils/           # Funciones auxiliares
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point
│   └── index.css        # Estilos base + Tailwind
├── .env                 # Variables de entorno
├── .env.example         # Ejemplo de variables
├── .prettierrc          # Configuración Prettier
├── eslint.config.js     # Configuración ESLint
├── tailwind.config.js   # Configuración Tailwind
├── tsconfig.json        # Configuración TypeScript
└── vite.config.ts       # Configuración Vite
```

## 🎨 Sistema de Diseño Gov.co

### Paleta de Colores

```css
/* Colores principales */
govco-marino: #3366CC
govco-azul-oscuro: #004884
govco-verde: #068460
govco-rojo: #F42F63
govco-naranja: #F3561F
govco-amarillo: #F7C924

/* Grises */
govco-gris-oscuro: #2c2c2c
govco-gris: #4b4b4b
govco-gris-claro: #d2d2d2
govco-gris-muy-claro: #f2f2f2
```

### Tipografía

- **Headings:** Montserrat (SemiBold)
- **Body:** Work Sans (Regular)

### Clases de Utilidad

```html
<!-- Contenedor -->
<div class="container-govco">...</div>

<!-- Botones -->
<button class="btn-govco-primary">Primario</button>
<button class="btn-govco-secondary">Secundario</button>
<button class="btn-govco-outline">Outline</button>
```

## 🔒 Seguridad

El proyecto implementa prácticas de seguridad OWASP:

- ✅ Validación de inputs con Zod
- ✅ Sanitización XSS con DOMPurify
- ✅ TypeScript para type safety
- ✅ ESLint con reglas de seguridad
- ✅ Variables de entorno para configuración

## ♿ Accesibilidad

- WCAG 2.1 AA compliance
- ESLint plugin jsx-a11y activado
- Focus visible personalizado
- Navegación por teclado
- ARIA labels y roles

## 🌐 Variables de Entorno

Copia `.env.example` a `.env` y configura:

```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gov.co React App
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## 🚧 Estado de las Fases

- ✅ Fase 1: Configuración Inicial (COMPLETADA)
- ✅ Fase 2: Sistema de Diseño y Componentes (COMPLETADA)
- ✅ Fase 3: Arquitectura y Rutas (COMPLETADA)
- ✅ Fase 4: Seguridad OWASP y Componentes Avanzados (COMPLETADA)
  - FileUpload con validación completa
  - DatePicker accesible
  - Servicio de API con interceptors de seguridad
  - Sistema de logging de seguridad
  - Validaciones avanzadas con Zod
- ✅ Fase 5: Barra de Accesibilidad y WCAG 2.1 AA (COMPLETADA)
  - AccessibilityBar con diseño Gov.co (azul con iconos blancos)
  - Modos de alto contraste y tamaño de fuente
  - Modos de daltonismo (protanopia, deuteranopia, tritanopia)
  - SkipLinks para navegación por teclado
  - Integración de @axe-core/react para testing
  - Cumplimiento completo WCAG 2.1 AA
- ✅ Fase 6: Sistema de Autenticación Completo (COMPLETADA)
  - Página de Login con validación y protección contra fuerza bruta
  - Página de Registro con validación completa de datos colombianos
  - Recuperación de contraseña con rate limiting
  - Servicio de autenticación con JWT (mock para desarrollo)
  - AuthContext mejorado con persistencia y renovación automática
  - ProtectedRoute para rutas privadas con verificación de roles
  - Manejo seguro de sesiones (localStorage/sessionStorage)
- ⏳ Fase 7: Dashboard y Gestión de Datos (PENDIENTE)
- ⏳ Fase 8: Reportes y Visualización (PENDIENTE)
- ⏳ Fase 9: Testing Completo (PENDIENTE)
- ⏳ Fase 10: Deploy y CI/CD (PENDIENTE)

**Progreso Total: 60% (6 de 10 fases)**

## 📝 Licencia

Proyecto para el Gobierno de Colombia

## 👨‍💻 Desarrollo

Generado con Claude Code siguiendo las mejores prácticas de React 19
