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
    <div className="d-flex flex-column gap-4">
      <h3 className="fs-5 fw-semibold" style={{ color: 'var(--color-govco-marino)' }}>
        Usuarios cargados con use() hook
      </h3>
      <div className="d-flex flex-column gap-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-3 border rounded-3"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h4 className="fw-medium text-dark mb-1">{user.name}</h4>
                <p className="small text-secondary mb-0">{user.email}</p>
              </div>
              <span
                className={`badge ${
                  user.role === 'admin'
                    ? 'bg-danger'
                    : user.role === 'editor'
                      ? 'bg-warning text-dark'
                      : 'bg-primary'
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
    <div className="container-govco py-5">
      <header className="mb-5">
        <h1 className="fs-2 fw-bold mb-2" style={{ color: 'var(--color-govco-marino)' }}>
          Features React 19
        </h1>
        <p className="text-secondary">
          Demostración de las nuevas características de React 19
        </p>
      </header>

      <div className="d-flex flex-column gap-4">
        {/* Hook use() Example */}
        <Card>
          <CardHeader>
            <h2 className="fs-4 fw-bold" style={{ color: 'var(--color-govco-marino)' }}>
              Hook use() - Lectura de Promises
            </h2>
            <p className="small text-secondary mt-1 mb-0">
              El hook use() permite leer promises directamente, simplificando el código async
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-3 rounded-3" style={{ backgroundColor: 'rgba(51, 102, 204, 0.1)', border: '1px solid rgba(51, 102, 204, 0.3)' }}>
              <h4 className="fw-semibold mb-2" style={{ color: 'var(--color-govco-azul-oscuro)' }}>
                Ventajas del hook use():
              </h4>
              <ul className="small mb-0 ps-3" style={{ color: 'var(--color-govco-marino)' }}>
                <li className="mb-1">Puede ser llamado condicionalmente (rompe reglas tradicionales de hooks)</li>
                <li className="mb-1">Lee promises directamente sin useEffect</li>
                <li className="mb-1">Se integra perfectamente con Suspense</li>
                <li className="mb-1">Código más limpio y fácil de mantener</li>
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

            <div className="mt-4 pt-4 border-top">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                Refrescar datos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <h2 className="fs-4 fw-bold" style={{ color: 'var(--color-govco-marino)' }}>Ejemplo de Código</h2>
          </CardHeader>
          <CardContent>
            <div className="bg-dark text-light p-3 rounded-3 overflow-auto">
              <pre className="small mb-0">
                <code>{`// React 18 - Código complejo
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

// React 19 - Código simple con use()
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
            <h2 className="fs-4 fw-bold" style={{ color: 'var(--color-govco-marino)' }}>
              useOptimistic - Ya implementado
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-secondary mb-4">
              El hook useOptimistic() ya está implementado en el Dashboard. Ve al Dashboard
              y prueba el botón para cambiar el estado de los usuarios de forma
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
