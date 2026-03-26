/**
 * LTB Components - AIChatWidget
 * @version 1.0.0
 * 
 * Complete AI chat interface with sidebar, message list, and input.
 * Fully customizable via props and CSS variables.
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
  // Data
  conversations,
  currentConversationId,
  messages,
  
  // Configuration
  placeholder = 'Type a message...',
  maxFileSize = 10,
  allowedFileTypes,
  showSidebar = true,
  showHeader = true,
  headerTitle = 'Chat',
  emptyStateMessage = 'Start a conversation',
  emptyConversationsMessage = 'No conversations yet',
  
  // Styling
  className,
  classNames,
  
  // Callbacks
  onSendMessage,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  
  // States
  isLoading = false,
  isStreaming = false,
  disabled = false,
}: AIChatWidgetProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(showSidebar)

  // Sync sidebar visibility with prop
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
          classNames={classNames}
        />
      )}

      {/* Main content */}
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

        {/* Message list */}
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          isStreaming={isStreaming}
          emptyMessage={emptyStateMessage}
          classNames={classNames}
        />

        {/* Input */}
        <ChatInput
          placeholder={placeholder}
          maxFileSize={maxFileSize}
          allowedFileTypes={allowedFileTypes}
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          disabled={disabled}
          classNames={classNames}
        />
      </div>
    </div>
  )
}

AIChatWidget.displayName = 'AIChatWidget'
