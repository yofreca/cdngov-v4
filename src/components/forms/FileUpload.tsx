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
    const id = useFormId('fileupload', props.id)
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
      <div className={clsx('mb-3', fullWidth && 'w-100', className)}>
        {label && (
          <label htmlFor={id} className="form-label fw-medium">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
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
            'border border-2 border-dashed rounded-3 p-4 text-center transition',
            isDragging && 'border-primary bg-primary bg-opacity-10',
            !isDragging && 'border-secondary',
            displayError && 'border-danger',
            disabled && 'opacity-50'
          )}
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <input
            ref={ref || inputRef}
            type="file"
            id={id}
            className="d-none"
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

          <div className="d-flex flex-column gap-2 align-items-center">
            <div
              className="fs-1"
              style={{ color: 'var(--color-govco-marino)' }}
            >
              <i className="bi bi-folder2-open"></i>
            </div>
            <div>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={disabled}
                className="btn btn-primary"
              >
                Seleccionar archivo{allowMultiple ? 's' : ''}
              </button>
            </div>
            <p className="small text-secondary mb-0">
              o arrastra {allowMultiple ? 'los archivos' : 'el archivo'} aquí
            </p>
            <p className="small text-muted mb-0">
              Tipos permitidos: {getAcceptString()}
            </p>
            <p className="small text-muted mb-0">Tamaño máximo: {maxSize}MB</p>
          </div>
        </div>

        {/* Helper text */}
        {helperText && !displayError && (
          <p id={`${id}-helper`} className="form-text text-muted mt-2">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {displayError && (
          <p
            id={`${id}-error`}
            className="form-text text-danger mt-2"
            role="alert"
          >
            {displayError}
          </p>
        )}

        {/* Preview de archivos seleccionados */}
        {showPreview && selectedFiles.length > 0 && (
          <div className="mt-4">
            <p className="small fw-medium text-secondary mb-2">
              {allowMultiple ? 'Archivos seleccionados:' : 'Archivo seleccionado:'}
            </p>
            <div className="d-flex flex-column gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border"
                >
                  {/* Preview de imagen */}
                  {file.type.startsWith('image/') ? (
                    <img
                      src={getFilePreview(file) || ''}
                      alt={file.name}
                      className="rounded object-fit-cover"
                      style={{ width: '3rem', height: '3rem' }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 rounded"
                      style={{ width: '3rem', height: '3rem' }}
                    >
                      <span className="fs-4">📄</span>
                    </div>
                  )}

                  {/* Información del archivo */}
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="small fw-medium text-dark mb-0 text-truncate">
                      {file.name}
                    </p>
                    <p className="small text-muted mb-0">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="btn btn-sm btn-outline-danger flex-shrink-0"
                    aria-label={`Eliminar ${file.name}`}
                  >
                    <span aria-hidden="true">&times;</span>
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
