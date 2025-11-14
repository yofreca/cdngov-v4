/**
 * Dashboard - Página principal de gestión de datos
 * - Estadísticas y métricas clave
 * - Tabla de datos con filtrado y paginación
 * - Diseño Gov.co
 * - Accesibilidad WCAG 2.1 AA
 */

import { useState } from 'react'
import { StatsCard } from '@components/dashboard/StatsCard'
import { DataTable } from '@components/dashboard/DataTable'
import type { Column } from '@components/dashboard/DataTable'
import { Button } from '@components/common/Button'

interface UserData {
  id: number
  nombre: string
  email: string
  rol: string
  estado: 'Activo' | 'Inactivo'
  ultimoAcceso: string
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

export function Dashboard() {
  const [users] = useState<UserData[]>(mockUsers)

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
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.rol === 'Administrador'
              ? 'bg-red-100 text-red-800'
              : user.rol === 'Editor'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
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
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            user.estado === 'Activo'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {user.estado}
        </span>
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
    // Aquí podrías abrir un modal o navegar a una página de detalles
  }

  const handleExport = () => {
    // Generar CSV
    const headers = columns.map((col) => col.header).join(',')
    const rows = users.map((user) =>
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
    <div className="container-govco py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-govco-marino mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Panel de control y gestión de datos del sistema
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Usuarios"
          value={users.length}
          icon="👥"
          color="blue"
          trend={{ value: 12, isPositive: true }}
          description="Usuarios registrados en el sistema"
        />
        <StatsCard
          title="Usuarios Activos"
          value={users.filter((u) => u.estado === 'Activo').length}
          icon="✓"
          color="green"
          trend={{ value: 8, isPositive: true }}
          description="Usuarios con sesión activa"
        />
        <StatsCard
          title="Administradores"
          value={users.filter((u) => u.rol === 'Administrador').length}
          icon="⚙️"
          color="yellow"
          description="Usuarios con rol de administrador"
        />
        <StatsCard
          title="Usuarios Inactivos"
          value={users.filter((u) => u.estado === 'Inactivo').length}
          icon="⊗"
          color="red"
          trend={{ value: 5, isPositive: false }}
          description="Usuarios sin actividad reciente"
        />
      </section>

      {/* Data Table */}
      <section className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-govco-marino mb-1">
              Gestión de Usuarios
            </h2>
            <p className="text-sm text-gray-600">
              Administra los usuarios del sistema
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleExport}
              variant="secondary"
              size="small"
              aria-label="Exportar datos a CSV"
            >
              📊 Exportar CSV
            </Button>
            <Button variant="primary" size="small" aria-label="Agregar nuevo usuario">
              ➕ Nuevo Usuario
            </Button>
          </div>
        </div>

        <DataTable
          data={users}
          columns={columns}
          itemsPerPage={5}
          searchPlaceholder="Buscar por nombre, email, rol..."
          onRowClick={handleRowClick}
        />
      </section>

      {/* Additional Info */}
      <footer className="mt-8 text-sm text-gray-500">
        <p>
          💡 <strong>Tip:</strong> Haz clic en las cabeceras de columna para ordenar
          los datos. Haz clic en una fila para ver los detalles del usuario.
        </p>
      </footer>
    </div>
  )
}
