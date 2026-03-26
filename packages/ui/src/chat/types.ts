/**
 * LTB Components - Chat Types
 * @version 1.0.0
 */

export interface Attachment {
  id: string
  name: string
  type: string
  url?: string
  size: number
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  attachments?: Attachment[]
  createdAt: Date
}

export interface Conversation {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  preview?: string
}

export interface ChatClassNames {
  container?: string
  sidebar?: string
  sidebarHeader?: string
  sidebarContent?: string
  sidebarItem?: string
  sidebarItemActive?: string
  main?: string
  header?: string
  messageList?: string
  message?: string
  userMessage?: string
  assistantMessage?: string
  systemMessage?: string
  messageContent?: string
  messageAttachments?: string
  inputContainer?: string
  input?: string
  inputActions?: string
  sendButton?: string
  attachButton?: string
}

export interface AIChatWidgetProps {
  /** List of all conversations */
  conversations: Conversation[]
  /** Currently selected conversation ID */
  currentConversationId?: string
  /** Messages for the current conversation */
  messages: Message[]
  
  /** Placeholder text for the input */
  placeholder?: string
  /** Maximum file size in MB (default: 10) */
  maxFileSize?: number
  /** Allowed file types (default: all) */
  allowedFileTypes?: string[]
  /** Show/hide sidebar (default: true) */
  showSidebar?: boolean
  /** Show/hide header (default: true) */
  showHeader?: boolean
  /** Header title */
  headerTitle?: string
  /** Empty state message when no messages */
  emptyStateMessage?: string
  /** Empty state for no conversations */
  emptyConversationsMessage?: string
  
  /** Custom class names for styling */
  className?: string
  classNames?: ChatClassNames
  
  /** Called when user sends a message */
  onSendMessage: (content: string, attachments?: File[]) => void | Promise<void>
  /** Called when user creates a new conversation */
  onNewConversation: () => void | Promise<void>
  /** Called when user selects a conversation */
  onSelectConversation: (id: string) => void | Promise<void>
  /** Called when user deletes a conversation */
  onDeleteConversation?: (id: string) => void | Promise<void>
  /** Called when user renames a conversation */
  onRenameConversation?: (id: string, newTitle: string) => void | Promise<void>
  
  /** Loading state while waiting for response */
  isLoading?: boolean
  /** Streaming state while receiving response */
  isStreaming?: boolean
  /** Disabled state */
  disabled?: boolean
}

export interface ChatMessageProps {
  message: Message
  className?: string
  classNames?: Pick<ChatClassNames, 'message' | 'userMessage' | 'assistantMessage' | 'systemMessage' | 'messageContent' | 'messageAttachments'>
}

export interface ChatInputProps {
  placeholder?: string
  maxFileSize?: number
  allowedFileTypes?: string[]
  onSendMessage: (content: string, attachments?: File[]) => void | Promise<void>
  isLoading?: boolean
  disabled?: boolean
  className?: string
  classNames?: Pick<ChatClassNames, 'inputContainer' | 'input' | 'inputActions' | 'sendButton' | 'attachButton'>
}

export interface ChatSidebarProps {
  conversations: Conversation[]
  currentConversationId?: string
  onNewConversation: () => void | Promise<void>
  onSelectConversation: (id: string) => void | Promise<void>
  onDeleteConversation?: (id: string) => void | Promise<void>
  onRenameConversation?: (id: string, newTitle: string) => void | Promise<void>
  emptyMessage?: string
  className?: string
  classNames?: Pick<ChatClassNames, 'sidebar' | 'sidebarHeader' | 'sidebarContent' | 'sidebarItem' | 'sidebarItemActive'>
}

export interface ChatHeaderProps {
  title?: string
  onToggleSidebar?: () => void
  showSidebarToggle?: boolean
  className?: string
  classNames?: Pick<ChatClassNames, 'header'>
}

export interface ChatMessageListProps {
  messages: Message[]
  isLoading?: boolean
  isStreaming?: boolean
  emptyMessage?: string
  className?: string
  classNames?: Pick<ChatClassNames, 'messageList' | 'message' | 'userMessage' | 'assistantMessage' | 'systemMessage' | 'messageContent' | 'messageAttachments'>
}
