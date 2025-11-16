# Ajustes de Menú y Footer - Basado en SARA

Fecha: 2025-11-16
Sitio de referencia: https://sara.reincorporacion.gov.co/

---

## 🔴 PROBLEMA PRINCIPAL: DOS MENÚS

El proyecto actualmente tiene **DOS menús** cuando debe tener **SOLO UNO**:

1. ✅ **Header correcto** (banner azul + banner blanco + barra gris)
2. ❌ **Navbar azul adicional** (este debe eliminarse)

### Estructura del Sitio SARA (Referencia)

El sitio SARA tiene UN solo menú con 3 secciones:

1. **Banner azul oscuro superior** - GOV.CO con link
2. **Banner blanco** - Logo ARN + Título "Sistema de Apoyo para la Reincorporación (SARA)"
3. **Barra gris clara** - Contiene:
   - `☰ Menú` (botón hamburguesa)
   - `👤 Welcome ▼` (dropdown de usuario)
   - `🌐 Language ▼` (dropdown de idioma)

---

## 📋 CAMBIOS REQUERIDOS EN EL MENÚ

### 1. Eliminar el Navbar duplicado (PRIORIDAD ALTA)

**Archivo:** `src/components/layout/MainLayout.tsx`

**Línea:** 27

**Cambio:**
```tsx
// ANTES (INCORRECTO - 2 menús)
<Header />
<Navbar />

// DESPUÉS (CORRECTO - 1 solo menú)
<Header />
{/* <Navbar /> */}  // Comentar o eliminar esta línea
```

**Razón:** El sitio SARA no tiene este menú azul adicional. Solo tiene el Header con sus 3 secciones.

---

### 2. Implementar menú lateral (PRIORIDAD MEDIA)

El botón "☰ Menú" del Header debe abrir un menú lateral con las opciones de navegación.

**Archivo a crear:** `src/components/layout/SideMenu.tsx`

**Funcionalidad:**
- Se abre al hacer clic en "☰ Menú" del Header
- Menú lateral deslizante (side drawer)
- Contiene los links de navegación:
  - Inicio
  - Componentes
  - React 19
  - Formulario
  - Dashboard (si está autenticado)
  - Iniciar Sesión / Cerrar Sesión

**Archivo a modificar:** `src/components/layout/Header.tsx`

**Líneas a modificar:** 50-60, 106-112

**Cambios:**
1. Importar y agregar estado para controlar el SideMenu
2. Conectar botón "☰ Menú" para abrir/cerrar el SideMenu
3. Pasar las opciones de navegación al SideMenu

**Ejemplo de implementación:**

```tsx
// Header.tsx
import { SideMenu } from './SideMenu'

export function Header() {
  const [showSideMenu, setShowSideMenu] = useState(false)

  return (
    <>
      <header>
        {/* ... código existente ... */}

        {/* Botón Menú - Agregar onClick */}
        <button
          onClick={() => setShowSideMenu(true)}
          className="md:inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-white/50 rounded transition-colors"
          aria-label="Mostrar menú"
        >
          <span className="mr-2">☰</span>
          Menú
        </button>
      </header>

      {/* SideMenu component */}
      <SideMenu
        isOpen={showSideMenu}
        onClose={() => setShowSideMenu(false)}
      />
    </>
  )
}
```

---

### 3. Header - Mantener sin cambios ✅

El componente Header está correcto y sigue la estructura del sitio SARA:
- ✅ Banner GOV.CO azul oscuro
- ✅ Banner blanco con logo ARN y título
- ✅ Barra gris con botones Menú, Bienvenido e Idioma
- ✅ Dropdowns funcionales

**No se requieren cambios en el Header.**

---

## 🎨 CAMBIOS REQUERIDOS EN EL FOOTER

El footer está **95% correcto**. Solo requiere ajustes menores de estilos.

### 1. Iconos de redes sociales (PRIORIDAD BAJA)

**Archivo:** `src/components/layout/Footer.tsx`

**Líneas:** 198-246

**Cambio:**

```tsx
// ANTES - Usando emojis
<a href="https://www.facebook.com/ARNColombia/">
  <span>📘</span>
  <span>@ARNColombia</span>
</a>

// DESPUÉS - Usando círculos azules con iconos
<a
  href="https://www.facebook.com/ARNColombia/"
  className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
  style={{ backgroundColor: 'var(--color-govco-marino)' }}
  title="Facebook ARN Colombia"
>
  <FaFacebook className="w-5 h-5 text-white" />
</a>
```

**Dependencia:** `react-icons/fa` (ya instalada en el proyecto v5.5.0)

**Importaciones necesarias:**
```tsx
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
```

---

### 2. Footer - Estructura y contenido ✅

**No se requieren cambios:**
- ✅ Logo y título ARN
- ✅ Sede Principal con toda la información de contacto
- ✅ Servicios a la Ciudadanía con enlaces correctos
- ✅ Enlaces de interés en el orden correcto
- ✅ Banner inferior azul con logos Colombia.co y GOV.CO

---

## ✅ RESUMEN DE CAMBIOS

| Prioridad | Componente | Archivo | Línea | Acción |
|-----------|------------|---------|-------|--------|
| **ALTA** | Navbar duplicado | `MainLayout.tsx` | 27 | ❌ Eliminar `<Navbar />` |
| **MEDIA** | Menú lateral | Crear `SideMenu.tsx` | - | ➕ Crear nuevo componente |
| **MEDIA** | Header - Botón menú | `Header.tsx` | 50-60, 106-112 | 🔧 Conectar con SideMenu |
| **BAJA** | Footer - Iconos sociales | `Footer.tsx` | 198-246 | 🎨 Cambiar emojis por círculos |

---

## 📝 NOTAS ADICIONALES

### Estilos existentes a utilizar

El proyecto ya tiene todos los estilos necesarios en `src/index.css`:

```css
/* Colores Gov.co disponibles */
--color-govco-marino: #3366CC
--color-govco-azul-oscuro: #004884
--color-govco-gris-muy-claro: #f2f2f2
--color-govco-gris-claro: #d2d2d2
--color-govco-gris: #4b4b4b

/* Clases de utilidad disponibles */
.container-govco
.btn-govco-primary
.btn-govco-secondary
.btn-govco-outline
```

### Dependencias instaladas

- `react-icons` v5.5.0 - Para iconos de redes sociales
- `clsx` v2.1.1 - Para manejo de clases condicionales
- Tailwind CSS v4 - Para utilidades de diseño

---

## 🎯 ORDEN DE IMPLEMENTACIÓN RECOMENDADO

1. **Paso 1 (5 min):** Eliminar `<Navbar />` de MainLayout.tsx
2. **Paso 2 (10 min):** Verificar que el sitio se ve como SARA
3. **Paso 3 (30 min):** Crear componente SideMenu.tsx
4. **Paso 4 (15 min):** Conectar SideMenu con Header
5. **Paso 5 (20 min):** Actualizar iconos de redes sociales (opcional)

**Tiempo total estimado:** 1.5 horas

---

## 📸 Referencias Visuales

### Sitio SARA
- URL: https://sara.reincorporacion.gov.co/
- Capturas guardadas en: `.playwright-mcp/sara-homepage.png`

### Proyecto Actual
- URL: http://localhost:3000/
- Capturas guardadas en: `.playwright-mcp/proyecto-homepage.png`

---

## ✨ Resultado Final Esperado

Después de implementar estos cambios:

1. ✅ Un solo menú (Header) como en el sitio SARA
2. ✅ Menú lateral funcional al hacer clic en "☰ Menú"
3. ✅ Footer con iconos circulares de redes sociales
4. ✅ Diseño 100% alineado con el sitio oficial SARA

---

**Documento generado:** 2025-11-16
**Autor:** Claude Code
**Proyecto:** govco-react-app v0.0.0
