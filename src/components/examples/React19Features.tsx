/**
 * Componente de demostración de Features React 19
 * - Hook use() para leer promises
 * - Suspense mejorado
 * - Integración perfecta con async
 */

import { Suspense } from 'react'
import { useDataFetcher, clearUsersCache } from '@hooks/useDataFetcher'
import { LoadingSpinner } from '@shared/components/ui'
import { Button } from '@shared/components/ui'
import { Card, CardHeader, CardContent } from '@shared/components/ui'

/**
 * Componente que usa el hook use() de React 19
 * Debe estar envuelto en Suspense porque use() puede suspender
 */
function UsersList() {
  // El hook use() lee la promise directamente
  // En React 18 esto requeriría useEffect + useState + loading states
  // En React 19 con use() es mucho más simple
  const users = useDataFetcher()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-govco-marino">
        Usuarios cargados con use() hook
      </h3>
      <div className="grid gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin'
                    ? 'bg-red-100 text-red-800'
                    : user.role === 'editor'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Componente principal que demuestra React 19 features
 */
export function React19Features() {
  const handleRefresh = () => {
    clearUsersCache()
    // Forzar re-render (en una app real usarías state management)
    window.location.reload()
  }

  return (
    <div className="container-govco py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-govco-marino mb-2">
          Features React 19
        </h1>
        <p className="text-gray-600">
          Demostración de las nuevas características de React 19
        </p>
      </header>

      <div className="grid gap-6">
        {/* Hook use() Example */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-govco-marino">
              Hook use() - Lectura de Promises
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              El hook use() permite leer promises directamente, simplificando el código async
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                ✨ Ventajas del hook use():
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Puede ser llamado condicionalmente (rompe reglas tradicionales de hooks)</li>
                <li>Lee promises directamente sin useEffect</li>
                <li>Se integra perfectamente con Suspense</li>
                <li>Código más limpio y fácil de mantener</li>
                <li>Manejo automático de estados de carga con Suspense</li>
              </ul>
            </div>

            {/* Suspense boundary - maneja automáticamente el loading state */}
            <Suspense
              fallback={
                <LoadingSpinner size="medium" message="Cargando usuarios con use() hook..." />
              }
            >
              <UsersList />
            </Suspense>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                🔄 Refrescar datos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-govco-marino">Ejemplo de Código</h2>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                <code>{`// ❌ React 18 - Código complejo
function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => setError(err))
  }, [])

  if (loading) return <Loading />
  if (error) return <Error />
  return <UserList users={users} />
}

// ✅ React 19 - Código simple con use()
function UsersList() {
  const users = use(fetchUsers()) // ¡Así de simple!
  return <UserList users={users} />
}

// Envolver en Suspense para manejar loading
<Suspense fallback={<Loading />}>
  <UsersList />
</Suspense>`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* useOptimistic Example Link */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-govco-marino">
              useOptimistic - Ya implementado
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              El hook useOptimistic() ya está implementado en el Dashboard. Ve al Dashboard
              y prueba el botón 🔄 para cambiar el estado de los usuarios de forma
              optimista.
            </p>
            <Button variant="primary" size="sm" onClick={() => (window.location.href = '/dashboard')}>
              Ver Dashboard con useOptimistic
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
