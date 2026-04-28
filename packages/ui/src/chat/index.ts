/**
 * LTB Components - Chat Module
 * @version 1.0.0
 * 
 * AI Chat components for building conversational interfaces.
 */

// Main widgets
export { AIChatWidget } from './ai-chat-widget'
export { ChatWindow } from './chat-window'

// Individual components for custom layouts
export { ChatMessage } from './chat-message'
export { ChatMessageList } from './chat-message-list'
export { ChatInput } from './chat-input'
export { ChatSidebar } from './chat-sidebar'
export { ChatHeader } from './chat-header'
export { ChatActions } from './chat-actions'
export { HtmlActionCard } from './html-action-card'

// Types
export type {
  Message,
  MessageType,
  Conversation,
  Attachment,
  ChatAction,
  MessageAction,
  HtmlMessageAction,
  ChatClassNames,
  AIChatWidgetProps,
  ChatMessageProps,
  ChatMessageListProps,
  ChatInputProps,
  ChatSidebarProps,
  ChatHeaderProps,
} from './types'

export type { ChatWindowProps } from './chat-window'

// Hooks
export { useAutoScroll, useFileAttachments, useAutoResize } from './hooks'
