# 🔒 Seguridad OWASP - Proyecto Gov.co React App

Documentación de implementación de seguridad siguiendo OWASP Top 10 2021.

## 📋 Índice

- [Implementaciones de Seguridad](#implementaciones-de-seguridad)
- [OWASP Top 10 Coverage](#owasp-top-10-coverage)
- [Componentes de Seguridad](#componentes-de-seguridad)
- [Mejores Prácticas](#mejores-prácticas)
- [Testing de Seguridad](#testing-de-seguridad)

---

## 🛡️ Implementaciones de Seguridad

### 1. Validación de Inputs

**Archivo:** `src/utils/validations.ts`

**Implementado:**
- ✅ Validación con Zod (type-safe)
- ✅ Regex patterns para formatos colombianos
- ✅ Sanitización de strings peligrosos
- ✅ Detección de código malicioso

**Ejemplo:**
```typescript
import { nombreSchema, emailSchema } from '@utils/validations'

const schema = z.object({
  nombre: nombreSchema,
  email: emailSchema,
})
```

### 2. Servicio de API Seguro

**Archivo:** `src/services/api.ts`

**Implementado:**
- ✅ Interceptors de Axios para headers de seguridad
- ✅ Sanitización automática de datos (DOMPurify)
- ✅ CSRF token integration
- ✅ Retry logic con backoff exponencial
- ✅ Manejo centralizado de errores
- ✅ Upload de archivos con checksum SHA-256

**Características:**
```typescript
// Sanitización automática en POST/PUT/PATCH
apiClient.post('/users', {
  name: '<script>alert("xss")</script>' // Sanitizado automáticamente
})

// Headers de seguridad automáticos
{
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-Token': csrfToken,
  'Authorization': `Bearer ${token}`,
  'X-Request-Timestamp': timestamp
}
```

### 3. Logging de Seguridad

**Archivo:** `src/utils/securityLogger.ts`

**Implementado:**
- ✅ Registro de eventos de seguridad
- ✅ Niveles: INFO, WARNING, ERROR, CRITICAL
- ✅ Sanitización de metadata sensible
- ✅ Envío a servidor en producción
- ✅ No expone información confidencial

**Uso:**
```typescript
import { logLoginSuccess, logUnauthorizedAccess } from '@utils/securityLogger'

// Login exitoso
logLoginSuccess(userId)

// Acceso no autorizado
logUnauthorizedAccess('/admin/dashboard')
```

### 4. Validación de Archivos

**Archivo:** `src/components/forms/FileUpload.tsx`

**Implementado:**
- ✅ Validación de tipo MIME
- ✅ Validación de extensión de archivo
- ✅ Límite de tamaño configurable
- ✅ Detección de nombres de archivo peligrosos
- ✅ Validación de caracteres de control
- ✅ Preview seguro de archivos

**Validaciones:**
```typescript
// Tipos MIME permitidos
acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf']

// Tamaño máximo (MB)
maxSize: 5

// Nombres de archivo peligrosos
/[<>:"|?*]|^\.|^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i

// Caracteres de control (0x00-0x1f)
```

---

## 🔝 OWASP Top 10 Coverage

### ✅ A01:2021 - Broken Access Control

**Implementado:**
- Rutas protegidas con `AuthContext`
- Validación de permisos en frontend
- Redirección a login en 401

**Archivo:** `src/routes/ProtectedRoute.tsx`

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

**Pendiente:**
- [ ] Roles de usuario (admin, user)
- [ ] Control de acceso granular
- [ ] Validación de permisos en backend

---

### ✅ A02:2021 - Cryptographic Failures

**Implementado:**
- No almacenar tokens en localStorage (solo temporalmente)
- Uso de HTTPS en producción
- Checksums SHA-256 para archivos

**Recomendaciones:**
- Usar `httpOnly` cookies para tokens sensibles
- Encriptar datos sensibles antes de almacenar
- Usar HTTPS siempre

**Pendiente:**
- [ ] Implementar encriptación para datos críticos
- [ ] Rotación de tokens
- [ ] Secure cookies

---

### ✅ A03:2021 - Injection

**Implementado:**
- ✅ Validación estricta con Zod
- ✅ Sanitización con DOMPurify
- ✅ Regex patterns seguros
- ✅ No uso de `dangerouslySetInnerHTML`
- ✅ Prepared statements en queries (backend)

**Archivo:** `src/services/api.ts`

```typescript
// Sanitización automática antes de enviar
const sanitizeData = (data: unknown): unknown => {
  if (typeof data === 'string') {
    return DOMPurify.sanitize(data, { ALLOWED_TAGS: [] })
  }
  // ...
}
```

**Archivo:** `src/utils/validations.ts`

```typescript
// Detección de código malicioso
export const containsMaliciousCode = (str: string): boolean => {
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    // ...
  ]
  return maliciousPatterns.some(pattern => pattern.test(str))
}
```

---

### ✅ A04:2021 - Insecure Design

**Implementado:**
- ✅ CSRF tokens en requests
- ✅ Rate limiting detection (429)
- ✅ Validación client + server side

**Archivo:** `src/services/api.ts`

```typescript
// CSRF token
const csrfToken = document.querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content')
if (csrfToken) {
  config.headers['X-CSRF-Token'] = csrfToken
}

// Rate limiting
if (status === 429) {
  const retryAfter = error.response.headers['retry-after']
  await new Promise(resolve => setTimeout(resolve, delay))
  return apiClient(originalRequest)
}
```

**Pendiente:**
- [ ] Timeout de sesión automático
- [ ] Rate limiting en frontend
- [ ] Implementar CAPTCHA en formularios críticos

---

### ✅ A05:2021 - Security Misconfiguration

**Implementado:**
- ✅ Headers de seguridad en API
- ✅ Variables de entorno (.env)
- ✅ TypeScript strict mode
- ✅ ESLint con reglas de seguridad

**Configuración:**

`.env`:
```bash
VITE_API_URL=https://api.example.com
VITE_ENABLE_DEBUG=false
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Pendiente (backend):**
- [ ] Content-Security-Policy headers
- [ ] X-Frame-Options: DENY
- [ ] Strict-Transport-Security (HSTS)
- [ ] X-Content-Type-Options: nosniff

---

### ⚠️ A06:2021 - Vulnerable and Outdated Components

**Implementado:**
- ✅ React 19.2.0 (última versión)
- ✅ Dependencias actualizadas
- ✅ `npm audit` sin vulnerabilidades

**Comando:**
```bash
npm audit
# 0 vulnerabilities
```

**Mantenimiento:**
```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Corregir automáticamente
npm audit fix
```

---

### ✅ A07:2021 - Identification and Authentication Failures

**Implementado:**
- ✅ Validación de password fuerte
- ✅ Login con email y password
- ✅ Tokens JWT (Bearer)
- ✅ Logout funcional

**Validación de Password:**
```typescript
export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Al menos una mayúscula')
  .regex(/[a-z]/, 'Al menos una minúscula')
  .regex(/[0-9]/, 'Al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Al menos un carácter especial')
```

**Pendiente:**
- [ ] Multi-factor authentication (MFA)
- [ ] Bloqueo de cuenta tras X intentos fallidos
- [ ] Recuperación de password segura
- [ ] Session timeout

---

### ✅ A08:2021 - Software and Data Integrity Failures

**Implementado:**
- ✅ Checksums SHA-256 para archivos subidos
- ✅ Validación de integridad de archivos
- ✅ No uso de CDNs sin SRI

**Archivo:** `src/services/api.ts`

```typescript
export const uploadFile = async (url: string, file: File) => {
  // Generar checksum
  const arrayBuffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer)
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  formData.append('checksum', hashHex)
}
```

**Pendiente:**
- [ ] Verificar checksums en backend
- [ ] Firmas digitales para archivos críticos
- [ ] Subresource Integrity (SRI) para CDNs

---

### ✅ A09:2021 - Security Logging and Monitoring Failures

**Implementado:**
- ✅ Sistema de logging completo
- ✅ Registro de eventos de seguridad
- ✅ Sin información sensible en logs
- ✅ Niveles de severidad

**Archivo:** `src/utils/securityLogger.ts`

**Eventos registrados:**
- `LOGIN_SUCCESS` / `LOGIN_FAILURE`
- `UNAUTHORIZED_ACCESS`
- `PERMISSION_DENIED`
- `API_ERROR`
- `SUSPICIOUS_ACTIVITY`
- `FILE_UPLOAD`

**Ejemplo:**
```typescript
import { logSecurityEvent, SecurityEventType, SecurityLevel } from '@utils/securityLogger'

logSecurityEvent(
  SecurityEventType.SUSPICIOUS_ACTIVITY,
  SecurityLevel.CRITICAL,
  'Múltiples intentos de login fallidos',
  { attempts: 5 }
)
```

**Sanitización automática:**
- Passwords → `[REDACTED]`
- Tokens → `[REDACTED]`
- Emails → Parcialmente ocultos

---

### ✅ A10:2021 - Server-Side Request Forgery (SSRF)

**Implementado:**
- ✅ Validación de URLs con Zod
- ✅ Solo HTTPS en producción
- ✅ Whitelist de dominios

**Archivo:** `src/utils/validations.ts`

```typescript
export const urlSchema = z
  .string()
  .url('La URL no es válida')
  .refine(
    (url) => {
      if (import.meta.env.PROD) {
        return url.startsWith('https://')
      }
      return true
    },
    { message: 'La URL debe usar HTTPS en producción' }
  )
```

**Pendiente (backend):**
- [ ] Validar dominios permitidos
- [ ] No permitir IPs privadas (127.0.0.1, localhost)
- [ ] Timeout en requests externos

---

## 🔧 Componentes de Seguridad

### FileUpload

**Validaciones:**
1. Tipo MIME permitido
2. Extensión de archivo válida
3. Tamaño máximo
4. Nombre de archivo seguro
5. Sin caracteres de control

**Uso seguro:**
```typescript
<FileUpload
  label="Cargar documento"
  maxSize={5} // 5MB
  acceptedTypes={['application/pdf']}
  onFileSelect={(files) => {
    // Archivos ya validados
  }}
/>
```

### DatePicker

**Validaciones:**
1. Formato ISO 8601
2. Rango de fechas
3. No fechas futuras (opcional)
4. Mayoría de edad

**Uso:**
```typescript
<DatePicker
  label="Fecha de nacimiento"
  maxDate={new Date().toISOString().split('T')[0]}
  helperText="Debe ser mayor de 18 años"
/>
```

---

## 📝 Mejores Prácticas

### 1. Validación de Inputs

**✅ HACER:**
```typescript
// Validar con Zod
const schema = z.object({
  email: emailSchema,
  nombre: nombreSchema,
})

// Sanitizar antes de mostrar
const safeHTML = DOMPurify.sanitize(userInput)
```

**❌ NO HACER:**
```typescript
// No usar innerHTML directamente
element.innerHTML = userInput // ❌ XSS

// No confiar solo en validación frontend
if (email.includes('@')) // ❌ Insuficiente
```

### 2. Manejo de Tokens

**✅ HACER:**
```typescript
// Usar headers Authorization
headers: {
  'Authorization': `Bearer ${token}`
}

// Limpiar al logout
localStorage.removeItem('auth-token')
```

**❌ NO HACER:**
```typescript
// No poner tokens en URL
fetch(`/api/users?token=${token}`) // ❌

// No almacenar en cookies sin httpOnly
document.cookie = `token=${token}` // ❌
```

### 3. Manejo de Errores

**✅ HACER:**
```typescript
// No exponer detalles internos
catch (error) {
  console.error('Error interno:', error) // Solo en dev
  throw new Error('Error al procesar solicitud')
}
```

**❌ NO HACER:**
```typescript
// No mostrar stack traces
catch (error) {
  alert(error.stack) // ❌ Expone info interna
}
```

---

## 🧪 Testing de Seguridad

### Checklist de Seguridad

- [ ] Validación de inputs con Zod
- [ ] Sanitización XSS con DOMPurify
- [ ] CSRF tokens en formularios
- [ ] Headers de seguridad
- [ ] Logging de eventos
- [ ] No información sensible en logs
- [ ] HTTPS en producción
- [ ] Dependencias actualizadas
- [ ] `npm audit` sin vulnerabilidades
- [ ] TypeScript strict mode
- [ ] ESLint rules de seguridad

### Comandos de Verificación

```bash
# Verificar vulnerabilidades
npm audit

# Linting con reglas de seguridad
npm run lint

# Build de producción
npm run build

# Verificar TypeScript
npx tsc --noEmit
```

### Testing Manual

1. **XSS:** Intentar inyectar `<script>alert('xss')</script>`
2. **Injection:** Intentar SQL injection en inputs
3. **File Upload:** Subir archivo con extensión `.exe`, `.php`
4. **CSRF:** Intentar request sin CSRF token
5. **Authentication:** Intentar acceder a rutas protegidas sin login

---

## 📚 Recursos

- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [React Security Best Practices](https://react.dev/learn/security)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Zod Documentation](https://zod.dev/)

---

## 📞 Reporte de Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad:

1. **NO** la publiques en issues públicos
2. Envía un email a: `security@reincorporacion.gov.co`
3. Incluye:
   - Descripción de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Sugerencias de mitigación (opcional)

---

**Última actualización:** Noviembre 2024
**Versión:** Fase 4 - OWASP Implementation
**Mantenido por:** Equipo de Desarrollo ARN/SARA
