import { useId } from 'react'

/**
 * Hook personalizado para generar IDs únicos para elementos de formulario
 * Usa el hook useId() de React 19 que es puro y estable
 */
export function useFormId(prefix: string, providedId?: string): string {
  const reactId = useId()
  return providedId || `${prefix}-${reactId}`
}
