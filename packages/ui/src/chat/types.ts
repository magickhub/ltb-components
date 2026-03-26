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
  /** Lista de todas las conversaciones */
  conversations: Conversation[]
  /** ID de la conversacion actualmente seleccionada */
  currentConversationId?: string
  /** Mensajes de la conversacion actual */
  messages: Message[]
  
  /** Texto placeholder para el input */
  placeholder?: string
  /** Tamano maximo de archivo en MB (por defecto: 10) */
  maxFileSize?: number
  /** Numero maximo de archivos adjuntos por mensaje (por defecto: 1) */
  maxAttachments?: number
  /** Tipos de archivo permitidos (por defecto: todos) */
  allowedFileTypes?: string[]
  /** Mostrar/ocultar sidebar (por defecto: true) */
  showSidebar?: boolean
  /** Mostrar/ocultar header (por defecto: true) */
  showHeader?: boolean
  /** Titulo del header */
  headerTitle?: string
  /** Mensaje cuando no hay mensajes */
  emptyStateMessage?: string
  /** Mensaje cuando no hay conversaciones */
  emptyConversationsMessage?: string
  /** Mensaje de confirmacion al eliminar conversacion */
  deleteConfirmMessage?: string
  
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
  maxAttachments?: number
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
  deleteConfirmMessage?: string
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
