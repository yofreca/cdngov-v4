import { useState, useRef, forwardRef } from 'react'
import { clsx } from 'clsx'
import { useFormId } from '@utils/useFormId'

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  helperText?: string
  maxSize?: number // en MB
  acceptedTypes?: string[]
  allowMultiple?: boolean
  showPreview?: boolean
  onFileSelect?: (files: File[]) => void
  fullWidth?: boolean
}

/**
 * Componente FileUpload siguiendo el sistema de diseño Gov.co
 * - Validación de tipo MIME y extensión
 * - Límite de tamaño configurable (default 5MB)
 * - Preview de archivos
 * - Drag & drop
 * - Seguridad OWASP (validación de archivos)
 * - Accesible WCAG 2.1 AA
 */
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      helperText,
      maxSize = 5, // 5MB por defecto
      acceptedTypes = ['image/jpeg', 'image/png', 'application/pdf'],
      allowMultiple = false,
      showPreview = true,
      onFileSelect,
      fullWidth = true,
      className,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const id = useFormId(props.id)
    const inputRef = useRef<HTMLInputElement>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false)
    const [validationError, setValidationError] = useState<string>('')

    // Tipos de archivo permitidos para mostrar al usuario
    const getAcceptString = () => {
      return acceptedTypes
        .map((type) => {
          if (type === 'image/jpeg') return '.jpg, .jpeg'
          if (type === 'image/png') return '.png'
          if (type === 'application/pdf') return '.pdf'
          if (type === 'application/msword') return '.doc'
          if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            return '.docx'
          return type
        })
        .join(', ')
    }

    // Validar archivo
    const validateFile = (file: File): { valid: boolean; error?: string } => {
      // Validar tamaño
      const maxSizeBytes = maxSize * 1024 * 1024
      if (file.size > maxSizeBytes) {
        return {
          valid: false,
          error: `El archivo ${file.name} excede el tamaño máximo de ${maxSize}MB`,
        }
      }

      // Validar tipo MIME
      if (!acceptedTypes.includes(file.type)) {
        return {
          valid: false,
          error: `El archivo ${file.name} no es un tipo permitido. Solo se aceptan: ${getAcceptString()}`,
        }
      }

      // Validar extensión (seguridad adicional)
      const extension = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = acceptedTypes.map((type) => {
        if (type === 'image/jpeg') return ['jpg', 'jpeg']
        if (type === 'image/png') return ['png']
        if (type === 'application/pdf') return ['pdf']
        if (type === 'application/msword') return ['doc']
        if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
          return ['docx']
        return []
      })
      const flatExtensions = allowedExtensions.flat()

      if (extension && !flatExtensions.includes(extension)) {
        return {
          valid: false,
          error: `La extensión del archivo ${file.name} no es válida`,
        }
      }

      // Validación de nombres de archivo peligrosos
      const dangerousPatterns = /[<>:"|?*]|^\.|^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i
      const hasControlChars = file.name.split('').some(char => {
        const code = char.charCodeAt(0)
        return code >= 0 && code <= 31 // Caracteres de control
      })

      if (dangerousPatterns.test(file.name) || hasControlChars) {
        return {
          valid: false,
          error: `El nombre del archivo ${file.name} contiene caracteres no permitidos`,
        }
      }

      return { valid: true }
    }

    // Manejar selección de archivos
    const handleFileSelect = (files: FileList | null) => {
      if (!files) return

      setValidationError('')
      const filesArray = Array.from(files)

      // Validar cada archivo
      for (const file of filesArray) {
        const validation = validateFile(file)
        if (!validation.valid) {
          setValidationError(validation.error || 'Error al validar archivo')
          return
        }
      }

      // Si es múltiple, agregar a los existentes, sino reemplazar
      const newFiles = allowMultiple
        ? [...selectedFiles, ...filesArray]
        : filesArray

      setSelectedFiles(newFiles)
      onFileSelect?.(newFiles)
    }

    // Manejar cambio en input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files)
    }

    // Manejar drag & drop
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      handleFileSelect(e.dataTransfer.files)
    }

    // Remover archivo
    const removeFile = (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index)
      setSelectedFiles(newFiles)
      onFileSelect?.(newFiles)
    }

    // Obtener preview de archivo
    const getFilePreview = (file: File) => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file)
      }
      return null
    }

    // Formatear tamaño de archivo
    const formatFileSize = (bytes: number): string => {
      if (bytes < 1024) return `${bytes} B`
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    }

    const displayError = error || validationError

    return (
      <div className={clsx('form-group', fullWidth && 'w-full', className)}>
        {label && (
          <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        {/* Área de drag & drop */}
        <div
          role="button"
          tabIndex={0}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              inputRef.current?.click()
            }
          }}
          className={clsx(
            'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400',
            displayError && 'border-red-500',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={ref || inputRef}
            type="file"
            id={id}
            className="hidden"
            accept={acceptedTypes.join(',')}
            multiple={allowMultiple}
            onChange={handleInputChange}
            disabled={disabled}
            aria-describedby={
              helperText || displayError
                ? `${id}-helper ${id}-error`
                : undefined
            }
            aria-invalid={!!displayError}
            aria-required={required}
            {...props}
          />

          <div className="space-y-2">
            <div
              className="text-4xl"
              style={{ color: 'var(--color-govco-marino)' }}
            >
              📁
            </div>
            <div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={disabled}
                className="btn-govco-primary inline-block px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--color-govco-marino)' }}
              >
                Seleccionar archivo{allowMultiple ? 's' : ''}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              o arrastra {allowMultiple ? 'los archivos' : 'el archivo'} aquí
            </p>
            <p className="text-xs text-gray-500">
              Tipos permitidos: {getAcceptString()}
            </p>
            <p className="text-xs text-gray-500">Tamaño máximo: {maxSize}MB</p>
          </div>
        </div>

        {/* Helper text */}
        {helperText && !displayError && (
          <p id={`${id}-helper`} className="mt-2 text-sm text-gray-600">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {displayError && (
          <p
            id={`${id}-error`}
            className="mt-2 text-sm text-red-600"
            role="alert"
          >
            {displayError}
          </p>
        )}

        {/* Preview de archivos seleccionados */}
        {showPreview && selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              {allowMultiple ? 'Archivos seleccionados:' : 'Archivo seleccionado:'}
            </p>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  {/* Preview de imagen */}
                  {file.type.startsWith('image/') ? (
                    <img
                      src={getFilePreview(file) || ''}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded">
                      <span className="text-2xl">📄</span>
                    </div>
                  )}

                  {/* Información del archivo */}
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    aria-label={`Eliminar ${file.name}`}
                  >
                    <span className="text-xl">✕</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'
