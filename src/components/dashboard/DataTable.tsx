/**
 * DataTable - Tabla de datos reutilizable
 * - Ordenamiento por columnas
 * - Filtrado y búsqueda
 * - Paginación
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co
 * - Optimizado con React.memo y useMemo
 * - Convertido a Bootstrap 5
 */

import { useState, useMemo, memo, useCallback } from 'react'
import { Button } from '@shared/components/ui'

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  itemsPerPage?: number
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  onRowClick?: (item: T) => void
}

function DataTableComponent<T extends Record<string, unknown>>({
  data,
  columns,
  itemsPerPage = 10,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No hay datos para mostrar',
  onRowClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string
    direction: 'asc' | 'desc'
  } | null>(null)

  // Filtrado
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  // Ordenamiento
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T]
      const bValue = b[sortConfig.key as keyof T]

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sortedData.slice(startIndex, endIndex)

  // Memoizar funciones para evitar recrearlas en cada render
  const handleSort = useCallback((key: keyof T | string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { key, direction: 'asc' }
    })
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const renderCell = useCallback((item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item)
    }
    return String(item[column.key as keyof T] ?? '')
  }, [])

  return (
    <div className="w-100">
      {/* Barra de búsqueda */}
      {searchable && (
        <div className="mb-4">
          <label htmlFor="table-search" className="visually-hidden">
            Buscar en la tabla
          </label>
          <input
            id="table-search"
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="form-control"
            style={{ maxWidth: '28rem' }}
            aria-label="Buscar en la tabla"
          />
        </div>
      )}

      {/* Tabla */}
      <div className="table-responsive shadow rounded-3">
        <table
          className="table table-hover mb-0"
          role="table"
          aria-label="Tabla de datos"
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--color-govco-marino)',
                color: 'white',
              }}
            >
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="text-uppercase small"
                  style={{
                    width: column.width,
                    cursor: column.sortable ? 'pointer' : 'default',
                    padding: '0.75rem 1rem',
                    transition: 'background-color 0.2s ease',
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  onMouseEnter={(e) => {
                    if (column.sortable) {
                      e.currentTarget.style.backgroundColor = 'var(--color-govco-azul-oscuro, #2c3175)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (column.sortable) {
                      e.currentTarget.style.backgroundColor = 'var(--color-govco-marino)'
                    }
                  }}
                  aria-sort={
                    sortConfig?.key === column.key
                      ? sortConfig.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <div className="d-flex align-items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <span
                        style={{
                          transition: 'opacity 0.2s ease',
                          opacity: sortConfig?.key === column.key ? 1 : 0.5,
                        }}
                        aria-hidden="true"
                      >
                        {sortConfig?.key === column.key &&
                        sortConfig.direction === 'asc'
                          ? '↑'
                          : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-muted py-5"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                  onClick={() => onRowClick?.(item)}
                  role={onRowClick ? 'button' : undefined}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      onRowClick(item)
                    }
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} style={{ padding: '0.75rem 1rem' }}>
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div
          className="mt-4 d-flex align-items-center justify-content-between"
          role="navigation"
          aria-label="Paginación de tabla"
        >
          <p className="small text-secondary mb-0">
            Mostrando {startIndex + 1} a {Math.min(endIndex, sortedData.length)}{' '}
            de {sortedData.length} resultados
          </p>

          <div className="d-flex gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="secondary"
              size="sm"
              aria-label="Página anterior"
            >
              Anterior
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Mostrar solo páginas cercanas a la actual
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                )
              })
              .map((page, index, array) => {
                // Agregar puntos suspensivos
                const showEllipsis =
                  index > 0 && array[index - 1] !== page - 1

                return (
                  <div key={page} className="d-flex gap-2">
                    {showEllipsis && (
                      <span className="px-2 py-1 text-muted">...</span>
                    )}
                    <Button
                      onClick={() => handlePageChange(page)}
                      variant={page === currentPage ? 'primary' : 'secondary'}
                      size="sm"
                      aria-label={`Página ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  </div>
                )
              })}

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="secondary"
              size="sm"
              aria-label="Página siguiente"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Exportar con memo para optimizar re-renders
// Nota: React.memo con genéricos requiere esta sintaxis
export const DataTable = memo(DataTableComponent) as typeof DataTableComponent
