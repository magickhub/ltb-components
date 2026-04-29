/**
 * LTB Components - ChatWindow
 * @version 1.0.0
 * 
 * Componente simplificado de chat para casos donde no se necesita sidebar.
 * Es un wrapper sobre ChatMessageList y ChatInput.
 */

'use client'

import { cn } from '../utils'
import { ChatMessageList } from './chat-message-list'
import { ChatInput } from './chat-input'
import type { Message, MessageAction, ChatAction, HtmlMessageAction } from './types'

export interface ChatWindowProps {
  /** Mensajes a mostrar */
  messages: Message[]
  /** Placeholder del input */
  placeholder?: string
  /** Callback cuando el usuario envía un mensaje */
  onSendMessage: (content: string, attachments?: File[], action?: MessageAction) => void | Promise<void>
  /** Callback cuando se hace clic en una acción HTML */
  onMessageActionClicked?: (message: Message, action: HtmlMessageAction) => void | Promise<void>
  /** Estado de carga */
  isLoading?: boolean
  /** Estado deshabilitado */
  disabled?: boolean
  /** Acciones disponibles */
  actions?: ChatAction[]
  /** Acción en ejecución */
  executingAction?: ChatAction | null
  /** Callback cuando se ejecuta una acción */
  onExecuteAction?: (action: ChatAction, conversationId?: string) => void | Promise<void>
  /** ID de la conversación actual */
  conversationId?: string
  /** Mensaje cuando no hay mensajes */
  emptyMessage?: string
  /** Hint en estado vacío */
  emptyHint?: string
  /** Texto de carga */
  loadingText?: string
  /** Texto del botón de acciones */
  actionsButtonText?: string
  /** Tamaño máximo de archivo en MB */
  maxFileSize?: number
  /** Número máximo de adjuntos */
  maxAttachments?: number
  /** Tipos de archivo permitidos */
  allowedFileTypes?: string[]
  /** Clases adicionales */
  className?: string
}

export function ChatWindow({
  messages,
  placeholder = 'Escribe un mensaje...',
  onSendMessage,
  onMessageActionClicked,
  isLoading = false,
  disabled = false,
  actions,
  executingAction,
  onExecuteAction,
  conversationId,
  emptyMessage,
  emptyHint,
  loadingText,
  actionsButtonText,
  maxFileSize,
  maxAttachments,
  allowedFileTypes,
  className,
}: ChatWindowProps) {
  return (
    <div className={cn('flex flex-col h-full bg-[var(--ltb-bg)]', className)}>
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        emptyHint={emptyHint}
        loadingText={loadingText}
        onMessageActionClicked={onMessageActionClicked}
      />
      <ChatInput
        placeholder={placeholder}
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        disabled={disabled}
        actions={actions}
        executingAction={executingAction}
        onExecuteAction={onExecuteAction}
        conversationId={conversationId}
        actionsButtonText={actionsButtonText}
        maxFileSize={maxFileSize}
        maxAttachments={maxAttachments}
        allowedFileTypes={allowedFileTypes}
      />
    </div>
  )
}

ChatWindow.displayName = 'ChatWindow'
