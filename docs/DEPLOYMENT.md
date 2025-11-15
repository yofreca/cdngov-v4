# Guía de Deployment - Gov.co React App

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Build de Producción](#build-de-producción)
- [Variables de Entorno](#variables-de-entorno)
- [Deployment en Netlify](#deployment-en-netlify)
- [Deployment en Vercel](#deployment-en-vercel)
- [Deployment en AWS S3 + CloudFront](#deployment-en-aws-s3--cloudfront)
- [Deployment en Nginx](#deployment-en-nginx)
- [CI/CD con GitHub Actions](#cicd-con-github-actions)
- [Monitoreo y Logging](#monitoreo-y-logging)
- [Optimizaciones](#optimizaciones)
- [Troubleshooting](#troubleshooting)

## 📦 Requisitos Previos

### Herramientas Necesarias

```bash
# Node.js (versión LTS)
node --version  # v20.19+ o v22.12+

# npm
npm --version   # v9.0.0+

# Git
git --version
```

### Verificar que la Aplicación Funciona

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar tests
npm run test:run

# 3. Verificar linting
npm run lint

# 4. Build local
npm run build

# 5. Preview del build
npm run preview
```

## 🏗️ Build de Producción

### Crear Build

```bash
# Build optimizado
npm run build

# Output en carpeta dist/
# ├── assets/
# │   ├── index-[hash].js
# │   └── index-[hash].css
# └── index.html
```

### Estructura del Build

```
dist/
├── assets/
│   ├── index-abc123.js       # ~50KB (código principal)
│   ├── vendor-def456.js      # ~150KB (React, ReactDOM)
│   ├── router-ghi789.js      # ~80KB (React Router)
│   └── index-jkl012.css      # ~20KB (estilos)
├── index.html                # HTML principal
└── vite.svg                  # Favicon
```

### Métricas del Build

```
Bundle Size:
- Initial: ~50KB (JavaScript)
- Vendor: ~150KB (React + deps)
- Total: ~250KB (gzipped: ~80KB)

Performance:
- First Contentful Paint: ~0.8s
- Time to Interactive: ~1.2s
- Lighthouse Score: 95+
```

## 🔐 Variables de Entorno

### Crear Archivos .env

```bash
# .env.production (producción)
VITE_API_URL=https://api.gov.co/v1
VITE_APP_NAME=Gov.co React App
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

```bash
# .env.development (desarrollo)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gov.co React App (Dev)
VITE_APP_VERSION=1.0.0-dev
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### Usar Variables

```typescript
// En código TypeScript
const apiUrl = import.meta.env.VITE_API_URL
const isProduction = import.meta.env.PROD
const isDevelopment = import.meta.env.DEV
```

### ⚠️ Seguridad

```bash
# ✅ Variables públicas (prefijo VITE_)
VITE_API_URL=https://api.example.com

# ❌ NO exponer secretos
# API_SECRET_KEY=abc123  # NO!
# DATABASE_PASSWORD=xyz  # NO!
```

## 🚀 Deployment en Netlify

### Opción 1: Deploy desde UI

1. Ir a [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Conectar repositorio de GitHub
4. Configurar build:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
5. Agregar variables de entorno
6. Deploy

### Opción 2: Netlify CLI

```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Inicializar
netlify init

# Deploy
netlify deploy --prod
```

### netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Variables de Entorno en Netlify

```bash
# En netlify.toml
[context.production.environment]
  VITE_API_URL = "https://api.gov.co/v1"
  VITE_ENABLE_ANALYTICS = "true"

# O en UI: Site settings → Environment variables
```

## ▲ Deployment en Vercel

### Opción 1: Deploy desde UI

1. Ir a [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import repositorio
4. Framework Preset: Vite
5. Override commands:
   ```
   Build: npm run build
   Output: dist
   ```
6. Deploy

### Opción 2: Vercel CLI

```bash
# Instalar CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## ☁️ Deployment en AWS S3 + CloudFront

### 1. Crear Bucket S3

```bash
# AWS CLI
aws s3 mb s3://govco-react-app --region us-east-1

# Configurar como sitio web estático
aws s3 website s3://govco-react-app \
  --index-document index.html \
  --error-document index.html
```

### 2. Upload de Archivos

```bash
# Build
npm run build

# Sync a S3
aws s3 sync dist/ s3://govco-react-app \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "index.html"

# index.html sin cache
aws s3 cp dist/index.html s3://govco-react-app/index.html \
  --cache-control "no-cache, no-store, must-revalidate"
```

### 3. Crear CloudFront Distribution

```bash
# Crear distribution
aws cloudfront create-distribution \
  --origin-domain-name govco-react-app.s3.amazonaws.com \
  --default-root-object index.html
```

### CloudFront Configuration

```json
{
  "DefaultCacheBehavior": {
    "Compress": true,
    "ViewerProtocolPolicy": "redirect-to-https"
  },
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html"
    }
  ]
}
```

### Script de Deploy

```bash
#!/bin/bash
# deploy-aws.sh

# Build
echo "Building..."
npm run build

# Upload assets con cache largo
aws s3 sync dist/assets s3://govco-react-app/assets \
  --delete \
  --cache-control "public, max-age=31536000, immutable"

# Upload index.html sin cache
aws s3 cp dist/index.html s3://govco-react-app/index.html \
  --cache-control "no-cache"

# Invalidar CloudFront
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*"

echo "Deploy completado!"
```

## 🔧 Deployment en Nginx

### 1. Build

```bash
npm run build
```

### 2. Configuración Nginx

```nginx
# /etc/nginx/sites-available/govco-react-app

server {
    listen 80;
    listen [::]:80;
    server_name govco.example.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name govco.example.com;

    # SSL
    ssl_certificate /etc/letsencrypt/live/govco.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/govco.example.com/privkey.pem;

    # Root directory
    root /var/www/govco-react-app/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Assets caching
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache";
    }
}
```

### 3. Deploy

```bash
# Copiar build
sudo cp -r dist/* /var/www/govco-react-app/

# Reiniciar Nginx
sudo systemctl reload nginx
```

### Script de Deploy

```bash
#!/bin/bash
# deploy-nginx.sh

SERVER="user@govco-server.com"
BUILD_DIR="dist"
REMOTE_DIR="/var/www/govco-react-app"

# Build
echo "Building..."
npm run build

# Upload
echo "Uploading..."
rsync -avz --delete $BUILD_DIR/ $SERVER:$REMOTE_DIR/

# Reload Nginx
echo "Reloading Nginx..."
ssh $SERVER "sudo systemctl reload nginx"

echo "Deploy completado!"
```

## 🔄 CI/CD con GitHub Actions

### .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Run linter
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_ENABLE_ANALYTICS: true

      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

### PR Preview

```yaml
name: PR Preview

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      - run: npm ci
      - run: npm run build

      - name: Deploy Preview
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --dir=dist
```

## 📊 Monitoreo y Logging

### Google Analytics

```typescript
// src/utils/analytics.ts
export function initAnalytics() {
  if (import.meta.env.VITE_ENABLE_ANALYTICS) {
    // Inicializar GA4
    window.gtag('config', 'G-XXXXXXXXXX')
  }
}
```

### Sentry (Error Tracking)

```typescript
import * as Sentry from '@sentry/react'

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://xxx@sentry.io/xxx',
    environment: 'production',
    tracesSampleRate: 1.0,
  })
}
```

### Performance Monitoring

```typescript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

## ⚡ Optimizaciones

### Cache Headers

```nginx
# Assets (JS, CSS, fonts, images)
location ~* \.(js|css|woff2|woff|ttf|eot|svg|png|jpg|jpeg|gif|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML (sin cache)
location ~* \.html$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### Compression

```nginx
# Gzip
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
    text/plain
    text/css
    text/javascript
    application/javascript
    application/json
    application/xml;

# Brotli (requiere módulo)
brotli on;
brotli_types
    text/plain
    text/css
    text/javascript
    application/javascript;
```

### CDN

```bash
# Configurar CloudFlare
# 1. Agregar sitio a CloudFlare
# 2. Configurar DNS
# 3. Habilitar cache y minificación
# 4. Configurar Page Rules

# Cache everything
Cache Level: Cache Everything
Edge Cache TTL: 1 month
Browser Cache TTL: 4 hours
```

## 🐛 Troubleshooting

### Error: "Cannot find module"

```bash
# Limpiar cache
rm -rf node_modules package-lock.json
npm install
```

### Error: 404 en rutas

```nginx
# Nginx: Agregar try_files
location / {
    try_files $uri $uri/ /index.html;
}
```

```json
// Netlify: _redirects
/* /index.html 200
```

### Error: Variables de entorno no funcionan

```bash
# Verificar prefijo VITE_
VITE_API_URL=https://api.example.com  # ✅ Correcto
API_URL=https://api.example.com       # ❌ No funciona

# Rebuild después de cambiar .env
npm run build
```

### Error: Build falla por falta de memoria

```json
// package.json
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

### Error: CORS en producción

```typescript
// Configurar en backend
app.use(cors({
  origin: 'https://govco.example.com',
  credentials: true
}))
```

## ✅ Checklist de Deployment

- [ ] Tests pasan (`npm run test:run`)
- [ ] Linter pasa (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] HTTPS habilitado
- [ ] Headers de seguridad configurados
- [ ] Compression habilitada (gzip/brotli)
- [ ] Cache configurado correctamente
- [ ] Redirects/Rewrites para SPA
- [ ] Analytics configurado
- [ ] Error tracking configurado
- [ ] Monitoreo de performance
- [ ] Backup configurado
- [ ] CI/CD pipeline funcionando
- [ ] Documentación actualizada

## 📚 Recursos

- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [AWS S3 Static Website](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Última actualización**: 2025-01-15
**Versión**: 1.0.0
