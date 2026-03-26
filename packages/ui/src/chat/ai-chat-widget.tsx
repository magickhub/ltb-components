/**
 * LTB Components - AIChatWidget
 * @version 1.0.0
 * 
 * Interfaz completa de chat con IA incluyendo sidebar, lista de mensajes e input.
 * Totalmente personalizable via props y variables CSS.
 * Soporta acciones para inyectar contexto predefinido.
 */

'use client'

import * as React from 'react'
import { cn } from '../utils'
import { ChatSidebar } from './chat-sidebar'
import { ChatHeader } from './chat-header'
import { ChatMessageList } from './chat-message-list'
import { ChatInput } from './chat-input'
import type { AIChatWidgetProps } from './types'

export function AIChatWidget({
  // Datos
  conversations,
  currentConversationId,
  messages,
  
  // Configuracion
  placeholder = 'Escribe un mensaje...',
  maxFileSize = 10,
  maxAttachments = 1,
  allowedFileTypes,
  showSidebar = true,
  showHeader = true,
  headerTitle = 'Chat',
  emptyStateMessage = 'Inicia una conversacion',
  emptyStateHint = 'Envia un mensaje para comenzar',
  emptyConversationsMessage = 'No hay conversaciones',
  deleteConfirmMessage = '¿Estas seguro de que deseas eliminar esta conversacion? Esta accion no se puede deshacer.',
  sidebarTitle = 'Conversaciones',
  loadingText = 'Pensando...',
  actionsButtonText = 'Acciones',
  
  // Acciones
  actions,
  executingAction,
  
  // Estilos
  className,
  classNames,
  
  // Callbacks
  onSendMessage,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onExecuteAction,
  
  // Estados
  isLoading = false,
  isStreaming = false,
  disabled = false,
}: AIChatWidgetProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(showSidebar)

  // Sincronizar visibilidad del sidebar con la prop
  React.useEffect(() => {
    setSidebarOpen(showSidebar)
  }, [showSidebar])

  const handleToggleSidebar = React.useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  return (
    <div
      className={cn(
        'ltb-chat-widget flex h-full w-full overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)]',
        className,
        classNames?.container
      )}
    >
      {/* Sidebar */}
      {sidebarOpen && (
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewConversation={onNewConversation}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
          onRenameConversation={onRenameConversation}
          emptyMessage={emptyConversationsMessage}
          deleteConfirmMessage={deleteConfirmMessage}
          title={sidebarTitle}
          classNames={classNames}
        />
      )}

      {/* Contenido principal */}
      <div
        className={cn(
          'flex flex-1 flex-col',
          classNames?.main
        )}
      >
        {/* Header */}
        {showHeader && (
          <ChatHeader
            title={headerTitle}
            onToggleSidebar={handleToggleSidebar}
            showSidebarToggle={showSidebar}
            classNames={classNames}
          />
        )}

        {/* Lista de mensajes */}
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
          emptyMessage={emptyStateMessage}
          emptyHint={emptyStateHint}
          loadingText={loadingText}
          classNames={classNames}
        />

        {/* Input */}
        <ChatInput
          placeholder={placeholder}
          maxFileSize={maxFileSize}
          maxAttachments={maxAttachments}
          allowedFileTypes={allowedFileTypes}
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          disabled={disabled}
          classNames={classNames}
          actions={actions}
          executingAction={executingAction}
          onExecuteAction={onExecuteAction}
          actionsButtonText={actionsButtonText}
        />
      </div>
    </div>
  )
}

AIChatWidget.displayName = 'AIChatWidget'
