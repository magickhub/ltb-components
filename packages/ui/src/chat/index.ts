/**
 * LTB Components - Chat Module
 * @version 1.0.0
 * 
 * AI Chat components for building conversational interfaces.
 */

// Main widget
export { AIChatWidget } from './ai-chat-widget'

// Individual components for custom layouts
export { ChatMessage } from './chat-message'
export { ChatMessageList } from './chat-message-list'
export { ChatInput } from './chat-input'
export { ChatSidebar } from './chat-sidebar'
export { ChatHeader } from './chat-header'

// Types
export type {
  Message,
  Conversation,
  Attachment,
  ChatClassNames,
  AIChatWidgetProps,
  ChatMessageProps,
  ChatMessageListProps,
  ChatInputProps,
  ChatSidebarProps,
  ChatHeaderProps,
} from './types'

// Hooks
export { useAutoScroll, useFileAttachments, useAutoResize } from './hooks'
