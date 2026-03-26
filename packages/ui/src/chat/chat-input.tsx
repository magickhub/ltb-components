/**
 * LTB Components - ChatInput
 * @version 1.0.0
 * 
 * Componente de entrada para enviar mensajes con soporte de archivos adjuntos.
 */

'use client'

import * as React from 'react'
import { Send, Paperclip, X, Loader2 } from 'lucide-react'
import { cn, formatFileSize } from '../utils'
import { useFileAttachments, useAutoResize } from './hooks'
import type { ChatInputProps } from './types'

export function ChatInput({
  placeholder = 'Escribe un mensaje...',
  maxFileSize = 10,
  maxAttachments = 1,
  allowedFileTypes,
  onSendMessage,
  isLoading = false,
  disabled = false,
  className,
  classNames,
}: ChatInputProps) {
  const [message, setMessage] = React.useState('')
  const { ref: textareaRef, resize } = useAutoResize<HTMLTextAreaElement>()
  
  const {
    files,
    error,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    openFilePicker,
  } = useFileAttachments({ maxFileSize, maxAttachments, allowedFileTypes })

  const canSend = (message.trim() || files.length > 0) && !isLoading && !disabled

  const handleSubmit = React.useCallback(async () => {
    if (!canSend) return
    
    await onSendMessage(message.trim(), files.length > 0 ? files : undefined)
    setMessage('')
    clearFiles()
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [canSend, message, files, onSendMessage, clearFiles, textareaRef])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }, [handleSubmit])

  const handleFileChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files)
    }
  }, [addFiles])

  return (
    <div className={cn('border-t border-[var(--ltb-border)] bg-[var(--ltb-input-bg)] p-4', className, classNames?.inputContainer)}>
      {/* Vista previa de archivos */}
      {files.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md bg-[var(--ltb-attachment-bg)] px-3 py-1.5 text-sm"
            >
              <span className="max-w-[150px] truncate text-[var(--ltb-foreground)]">{file.name}</span>
              <span className="text-xs text-[var(--ltb-muted-foreground)]">
                {formatFileSize(file.size)}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="rounded-full p-0.5 text-[var(--ltb-muted-foreground)] hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)]"
                aria-label={`Eliminar ${file.name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-3 text-sm text-[var(--ltb-error)]">
          {error}
        </div>
      )}

      {/* Area de entrada */}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          multiple={maxAttachments > 1}
          onChange={handleFileChange}
          accept={allowedFileTypes?.join(',')}
          className="hidden"
          aria-label="Adjuntar archivos"
        />
        
        <button
          type="button"
          onClick={openFilePicker}
          disabled={disabled || isLoading || files.length >= maxAttachments}
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--ltb-input-border)] bg-transparent text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)] disabled:cursor-not-allowed disabled:opacity-50',
            classNames?.attachButton
          )}
          aria-label="Adjuntar archivo"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <div className="relative flex-1 flex">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              resize()
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              'w-full resize-none rounded-lg border border-[var(--ltb-input-border)] bg-[var(--ltb-input-bg)] px-4 py-2 text-[var(--ltb-foreground)] placeholder:text-[var(--ltb-muted-foreground)] focus:border-[var(--ltb-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--ltb-primary)] disabled:cursor-not-allowed disabled:opacity-50',
              classNames?.input
            )}
            style={{ maxHeight: '200px', minHeight: '40px' }}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSend}
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--ltb-primary)] text-[var(--ltb-primary-foreground)] transition-colors hover:bg-[var(--ltb-primary-hover)] disabled:cursor-not-allowed disabled:opacity-50',
            classNames?.sendButton
          )}
          aria-label="Enviar mensaje"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  )
}

ChatInput.displayName = 'ChatInput'
