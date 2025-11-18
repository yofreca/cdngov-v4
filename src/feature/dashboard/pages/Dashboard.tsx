/**
 * Dashboard - Página principal de gestión de datos
 * - Estadísticas y métricas clave
 * - Tabla de datos con filtrado y paginación
 * - useOptimistic de React 19 para actualizaciones optimistas
 * - Diseño Gov.co con Bootstrap
 * - Accesibilidad WCAG 2.1 AA
 */

import { useState, useOptimistic, useTransition } from 'react'
import { StatsCard } from '@components/dashboard/StatsCard'
import { DataTable } from '@components/dashboard/DataTable'
import type { Column } from '@components/dashboard/DataTable'
import { Button } from '@shared/components/ui'

interface UserData {
  id: number
  nombre: string
  email: string
  rol: string
  estado: 'Activo' | 'Inactivo'
  ultimoAcceso: string
  [key: string]: unknown
}

// Datos de ejemplo
const mockUsers: UserData[] = [
  {
    id: 1,
    nombre: 'María González',
    email: 'maria.gonzalez@gov.co',
    rol: 'Administrador',
    estado: 'Activo',
    ultimoAcceso: '2025-01-14',
  },
  {
    id: 2,
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@gov.co',
    rol: 'Usuario',
    estado: 'Activo',
    ultimoAcceso: '2025-01-13',
  },
  {
    id: 3,
    nombre: 'Ana Martínez',
    email: 'ana.martinez@gov.co',
    rol: 'Editor',
    estado: 'Activo',
    ultimoAcceso: '2025-01-14',
  },
  {
    id: 4,
    nombre: 'Luis Fernández',
    email: 'luis.fernandez@gov.co',
    rol: 'Usuario',
    estado: 'Inactivo',
    ultimoAcceso: '2024-12-28',
  },
  {
    id: 5,
    nombre: 'Patricia López',
    email: 'patricia.lopez@gov.co',
    rol: 'Administrador',
    estado: 'Activo',
    ultimoAcceso: '2025-01-14',
  },
  {
    id: 6,
    nombre: 'Jorge Ramírez',
    email: 'jorge.ramirez@gov.co',
    rol: 'Editor',
    estado: 'Activo',
    ultimoAcceso: '2025-01-13',
  },
  {
    id: 7,
    nombre: 'Sandra Torres',
    email: 'sandra.torres@gov.co',
    rol: 'Usuario',
    estado: 'Activo',
    ultimoAcceso: '2025-01-12',
  },
  {
    id: 8,
    nombre: 'Miguel Ángel Pérez',
    email: 'miguel.perez@gov.co',
    rol: 'Usuario',
    estado: 'Inactivo',
    ultimoAcceso: '2024-12-20',
  },
]

// Simular API call para actualizar usuario
async function updateUserStatus(userId: number, newStatus: 'Activo' | 'Inactivo') {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { userId, newStatus }
}

export function Dashboard() {
  const [users, setUsers] = useState<UserData[]>(mockUsers)
  const [isPending, startTransition] = useTransition()

  // useOptimistic: actualiza la UI inmediatamente mientras espera la confirmación del servidor
  const [optimisticUsers, updateOptimisticUsers] = useOptimistic(
    users,
    (state, { userId, newStatus }: { userId: number; newStatus: 'Activo' | 'Inactivo' }) => {
      return state.map((user) =>
        user.id === userId ? { ...user, estado: newStatus } : user
      )
    }
  )

  // Función para cambiar el estado de un usuario
  const handleToggleUserStatus = async (user: UserData) => {
    const newStatus: 'Activo' | 'Inactivo' = user.estado === 'Activo' ? 'Inactivo' : 'Activo'

    // Actualización optimista - UI se actualiza inmediatamente
    updateOptimisticUsers({ userId: user.id, newStatus })

    // Transición para manejar la actualización real
    startTransition(async () => {
      try {
        await updateUserStatus(user.id, newStatus)

        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, estado: newStatus } : u))
        )

        console.log(`✅ Usuario ${user.nombre} ahora está ${newStatus}`)
      } catch (error) {
        console.error('❌ Error al actualizar usuario:', error)
      }
    })
  }

  // Definición de columnas para la tabla
  const columns: Column<UserData>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '80px',
    },
    {
      key: 'nombre',
      header: 'Nombre',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Correo Electrónico',
      sortable: true,
    },
    {
      key: 'rol',
      header: 'Rol',
      sortable: true,
      render: (user) => (
        <span
          className={`badge ${
            user.rol === 'Administrador'
              ? 'bg-danger'
              : user.rol === 'Editor'
                ? 'bg-warning text-dark'
                : 'bg-primary'
          }`}
        >
          {user.rol}
        </span>
      ),
    },
    {
      key: 'estado',
      header: 'Estado',
      sortable: true,
      render: (user) => (
        <div className="d-flex align-items-center gap-2">
          <span
            className={`badge ${
              user.estado === 'Activo' ? 'bg-success' : 'bg-secondary'
            }`}
          >
            {user.estado}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleToggleUserStatus(user)
            }}
            disabled={isPending}
            className={`btn btn-sm btn-light ${isPending ? 'opacity-50' : ''}`}
            title={`Cambiar a ${user.estado === 'Activo' ? 'Inactivo' : 'Activo'}`}
            aria-label={`Cambiar estado de ${user.nombre} a ${user.estado === 'Activo' ? 'Inactivo' : 'Activo'}`}
          >
            {isPending ? '⏳' : '🔄'}
          </button>
        </div>
      ),
    },
    {
      key: 'ultimoAcceso',
      header: 'Último Acceso',
      sortable: true,
      render: (user) => new Date(user.ultimoAcceso).toLocaleDateString('es-CO'),
    },
  ]

  const handleRowClick = (user: UserData) => {
    console.log('Usuario seleccionado:', user)
  }

  const handleExport = () => {
    const headers = columns.map((col) => col.header).join(',')
    const rows = optimisticUsers.map((user) =>
      columns
        .map((col) => {
          const value = user[col.key as keyof UserData]
          return typeof value === 'string' ? `"${value}"` : value
        })
        .join(',')
    )

    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  return (
    <div className="container-govco py-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="h3 fw-bold" style={{ color: 'var(--color-govco-marino)' }}>
          Dashboard
          {isPending && <span className="ms-3 small text-muted">⏳ Actualizando...</span>}
        </h1>
        <p className="text-muted">
          Panel de control y gestión de datos del sistema
        </p>
      </header>

      {/* Stats Cards */}
      <section className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3">
          <StatsCard
            title="Total Usuarios"
            value={optimisticUsers.length}
            icon="👥"
            color="blue"
            trend={{ value: 12, isPositive: true }}
            description="Usuarios registrados en el sistema"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatsCard
            title="Usuarios Activos"
            value={optimisticUsers.filter((u) => u.estado === 'Activo').length}
            icon="✓"
            color="green"
            trend={{ value: 8, isPositive: true }}
            description="Usuarios con sesión activa"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatsCard
            title="Administradores"
            value={optimisticUsers.filter((u) => u.rol === 'Administrador').length}
            icon="⚙️"
            color="yellow"
            description="Usuarios con rol de administrador"
          />
        </div>
        <div className="col-sm-6 col-lg-3">
          <StatsCard
            title="Usuarios Inactivos"
            value={optimisticUsers.filter((u) => u.estado === 'Inactivo').length}
            icon="⊗"
            color="red"
            trend={{ value: 5, isPositive: false }}
            description="Usuarios sin actividad reciente"
          />
        </div>
      </section>

      {/* Data Table */}
      <section className="bg-white rounded p-4 shadow-sm">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <div>
            <h2 className="h5 fw-bold mb-1" style={{ color: 'var(--color-govco-marino)' }}>
              Gestión de Usuarios
            </h2>
            <p className="small text-muted mb-0">
              Administra los usuarios del sistema. Click en 🔄 para cambiar el estado.
            </p>
          </div>

          <div className="d-flex gap-2">
            <Button
              onClick={handleExport}
              variant="secondary"
              size="sm"
              aria-label="Exportar datos a CSV"
            >
              📊 Exportar CSV
            </Button>
            <Button variant="primary" size="sm" aria-label="Agregar nuevo usuario">
              ➕ Nuevo Usuario
            </Button>
          </div>
        </div>

        <DataTable
          data={optimisticUsers}
          columns={columns}
          itemsPerPage={5}
          searchPlaceholder="Buscar por nombre, email, rol..."
          onRowClick={handleRowClick}
        />
      </section>

      {/* Additional Info */}
      <footer className="mt-4 small text-muted">
        <p className="mb-0">
          💡 <strong>Tip:</strong> Haz clic en 🔄 para cambiar el estado del usuario
          (React 19 useOptimistic). La UI se actualiza inmediatamente mientras se procesa
          en el servidor.
        </p>
      </footer>
    </div>
  )
}
