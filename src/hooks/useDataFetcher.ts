/**
 * Hook personalizado que demuestra el uso del hook use() de React 19
 * El hook use() permite leer promises de forma más elegante
 */

import { use } from 'react'

// Tipo para los datos de usuario
export interface ApiUser {
  id: number
  name: string
  email: string
  role: string
}

// Simular una llamada a API que retorna una promise
function fetchUsers(): Promise<ApiUser[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Admin User', email: 'admin@gov.co', role: 'admin' },
        { id: 2, name: 'Regular User', email: 'user@gov.co', role: 'user' },
        { id: 3, name: 'Editor User', email: 'editor@gov.co', role: 'editor' },
      ])
    }, 1500)
  })
}

// Cache simple para evitar llamadas múltiples
let usersCache: Promise<ApiUser[]> | null = null

/**
 * Hook que usa el nuevo hook use() de React 19 para leer una promise
 *
 * Características del hook use():
 * - Puede ser llamado condicionalmente (a diferencia de otros hooks)
 * - Lee promises directamente
 * - Se integra perfectamente con Suspense
 * - Simplifica el código async
 *
 * @returns Array de usuarios desde la API
 *
 * @example
 * function MyComponent() {
 *   const users = useDataFetcher()
 *   return <div>{users.map(u => <div key={u.id}>{u.name}</div>)}</div>
 * }
 */
export function useDataFetcher(): ApiUser[] {
  // Usar cache o crear nueva promise
  if (!usersCache) {
    usersCache = fetchUsers()
  }

  // El hook use() de React 19 lee la promise directamente
  // Esto es NUEVO en React 19 y reemplaza patrones complejos de useEffect + useState
  const users = use(usersCache)

  return users
}

/**
 * Función para limpiar el cache (útil para refrescar datos)
 */
export function clearUsersCache() {
  usersCache = null
}
