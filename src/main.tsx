import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// Estilos personalizados con Bootstrap
import './styles/main.scss'
import App from './App.tsx'

// Configurar axe-core para pruebas de accesibilidad en desarrollo
if (import.meta.env.DEV) {
  import('react')
    .then((React) => {
      return import('react-dom').then((ReactDOM) => {
        return import('@axe-core/react')
          .then((axe) => {
            axe.default(React, ReactDOM, 1000, {
              rules: [
                {
                  id: 'color-contrast',
                  enabled: true,
                },
                {
                  id: 'aria-roles',
                  enabled: true,
                },
                {
                  id: 'label',
                  enabled: true,
                },
              ],
            })
          })
          .catch((err) => {
            console.warn(
              'axe-core no está instalado. Ejecuta: npm install --save-dev @axe-core/react',
              err
            )
          })
      })
    })
    .catch((err) => {
      console.error('Error al cargar módulos de React:', err)
    })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
