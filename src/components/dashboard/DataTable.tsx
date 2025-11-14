/**
 * DataTable - Tabla de datos reutilizable
 * - Ordenamiento por columnas
 * - Filtrado y búsqueda
 * - Paginación
 * - Accesibilidad WCAG 2.1 AA
 * - Diseño Gov.co
 */

import { useState, useMemo } from 'react'
import { Button } from '@components/common/Button'

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

export function DataTable<T extends Record<string, unknown>>({
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

  const handleSort = (key: keyof T | string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        }
      }
      return { key, direction: 'asc' }
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item)
    }
    return String(item[column.key as keyof T] ?? '')
  }

  return (
    <div className="w-full">
      {/* Barra de búsqueda */}
      {searchable && (
        <div className="mb-4">
          <label htmlFor="table-search" className="sr-only">
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
            className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-govco-marino transition-colors"
            aria-label="Buscar en la tabla"
          />
        </div>
      )}

      {/* Tabla */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table
          className="w-full text-sm text-left text-gray-700"
          role="table"
          aria-label="Tabla de datos"
        >
          <thead className="text-xs uppercase bg-govco-marino text-white">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 ${column.sortable ? 'cursor-pointer hover:bg-govco-azul-oscuro transition-colors' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  aria-sort={
                    sortConfig?.key === column.key
                      ? sortConfig.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <span
                        className={`transition-opacity ${
                          sortConfig?.key === column.key
                            ? 'opacity-100'
                            : 'opacity-50'
                        }`}
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
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`border-b hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
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
                    <td key={colIndex} className="px-6 py-4">
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
          className="mt-4 flex items-center justify-between"
          role="navigation"
          aria-label="Paginación de tabla"
        >
          <p className="text-sm text-gray-600">
            Mostrando {startIndex + 1} a {Math.min(endIndex, sortedData.length)}{' '}
            de {sortedData.length} resultados
          </p>

          <div className="flex gap-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="secondary"
              size="small"
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
                  <div key={page} className="flex gap-2">
                    {showEllipsis && (
                      <span className="px-3 py-1 text-gray-500">...</span>
                    )}
                    <Button
                      onClick={() => handlePageChange(page)}
                      variant={page === currentPage ? 'primary' : 'secondary'}
                      size="small"
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
              size="small"
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
