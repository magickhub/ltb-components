/**
 * LTB Components - Chat Hooks
 * @version 1.0.0
 */

import { useCallback, useRef, useEffect, useState } from 'react'

/**
 * Hook for auto-scrolling to the bottom of a container
 */
export function useAutoScroll<T extends HTMLElement>(deps: unknown[]) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, deps)

  return ref
}

/**
 * Hook para manejar archivos adjuntos
 */
export function useFileAttachments(options?: {
  maxFileSize?: number
  maxAttachments?: number
  allowedFileTypes?: string[]
}) {
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const maxSize = (options?.maxFileSize ?? 10) * 1024 * 1024 // Convertir MB a bytes
  const maxAttachments = options?.maxAttachments ?? 1

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSize) {
      return `El archivo "${file.name}" excede el tamano maximo de ${options?.maxFileSize ?? 10}MB`
    }
    if (options?.allowedFileTypes && options.allowedFileTypes.length > 0) {
      const isAllowed = options.allowedFileTypes.some(type => {
        if (type.startsWith('.')) {
          return file.name.toLowerCase().endsWith(type.toLowerCase())
        }
        return file.type.startsWith(type.replace('*', ''))
      })
      if (!isAllowed) {
        return `Tipo de archivo no permitido: ${file.type || 'desconocido'}`
      }
    }
    return null
  }, [maxSize, options?.allowedFileTypes, options?.maxFileSize])

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles)
    const validFiles: File[] = []
    
    setFiles(prev => {
      const remainingSlots = maxAttachments - prev.length
      if (remainingSlots <= 0) {
        setError(`Solo puedes adjuntar un maximo de ${maxAttachments} archivo(s) por mensaje`)
        return prev
      }
      
      const filesToAdd = fileArray.slice(0, remainingSlots)
      
      for (const file of filesToAdd) {
        const validationError = validateFile(file)
        if (validationError) {
          setError(validationError)
          return prev
        }
        validFiles.push(file)
      }
      
      if (fileArray.length > remainingSlots) {
        setError(`Solo puedes adjuntar un maximo de ${maxAttachments} archivo(s) por mensaje`)
      } else {
        setError(null)
      }
      
      return [...prev, ...validFiles]
    })
  }, [validateFile, maxAttachments])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearFiles = useCallback(() => {
    setFiles([])
    setError(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [])

  const openFilePicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return {
    files,
    error,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    openFilePicker,
  }
}

/**
 * Hook for handling textarea auto-resize
 */
export function useAutoResize<T extends HTMLTextAreaElement>() {
  const ref = useRef<T>(null)

  const resize = useCallback(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 200)}px`
    }
  }, [])

  useEffect(() => {
    const element = ref.current
    if (element) {
      element.addEventListener('input', resize)
      return () => element.removeEventListener('input', resize)
    }
  }, [resize])

  return { ref, resize }
}
