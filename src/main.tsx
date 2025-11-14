import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Configurar axe-core para pruebas de accesibilidad en desarrollo
if (import.meta.env.DEV) {
  import('react').then((React) => {
    import('react-dom').then((ReactDOM) => {
      import('@axe-core/react').then((axe) => {
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
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
