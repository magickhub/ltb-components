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

/**
 * Accion que puede inyectarse al chat como contexto.
 * El badge se muestra visualmente pero el contenido completo se envia internamente.
 */
export interface ChatAction {
  /** Identificador unico de la accion */
  id: string
  /** Nombre corto que se muestra en el badge (ej: "Buyer Persona") */
  label: string
  /** Descripcion de la accion para el menu */
  description?: string
  /** Icono de la accion (nombre de Lucide icon) */
  icon?: string
  /** Grupo o etapa al que pertenece la accion (ej: "Analisis", "Estrategia"). Si no se define, aparece en la raiz */
  group?: string
}

/**
 * Referencia a una accion ejecutada en un mensaje.
 * Se muestra como badge pero contiene el contexto completo.
 */
export interface MessageAction {
  /** ID de la accion ejecutada */
  actionId: string
  /** Label que se muestra en el badge */
  label: string
  /** Contenido completo inyectado (no visible, enviado a la IA) */
  content: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  attachments?: Attachment[]
  /** Accion ejecutada con este mensaje (muestra badge, inyecta contexto) */
  action?: MessageAction
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
  
  /** Texto placeholder para el input (por defecto: 'Escribe un mensaje...') */
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
  /** Titulo del header (por defecto: 'Chat') */
  headerTitle?: string
  /** Mensaje cuando no hay mensajes (por defecto: 'Inicia una conversacion') */
  emptyStateMessage?: string
  /** Texto secundario en estado vacio (por defecto: 'Envia un mensaje para comenzar') */
  emptyStateHint?: string
  /** Mensaje cuando no hay conversaciones (por defecto: 'No hay conversaciones') */
  emptyConversationsMessage?: string
  /** Mensaje de confirmacion al eliminar conversacion */
  deleteConfirmMessage?: string
  /** Titulo del sidebar (por defecto: 'Conversaciones') */
  sidebarTitle?: string
  /** Texto de carga mientras espera respuesta (por defecto: 'Pensando...') */
  loadingText?: string
  /** Texto del boton de acciones (por defecto: 'Acciones') */
  actionsButtonText?: string
  
  /** Acciones disponibles para inyectar contexto */
  actions?: ChatAction[]
  /** Accion actualmente en ejecucion (genera loading en el boton) */
  executingAction?: ChatAction | null
  
  /** Custom class names for styling */
  className?: string
  classNames?: ChatClassNames
  
  /** Called when user sends a message (con accion opcional) */
  onSendMessage: (content: string, attachments?: File[], action?: MessageAction) => void | Promise<void>
  /** Called when user triggers an action. Recibe la accion y el ID de la conversacion activa */
  onExecuteAction?: (action: ChatAction, conversationId: string | undefined) => void | Promise<void>
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
  onSendMessage: (content: string, attachments?: File[], action?: MessageAction) => void | Promise<void>
  isLoading?: boolean
  disabled?: boolean
  className?: string
  classNames?: Pick<ChatClassNames, 'inputContainer' | 'input' | 'inputActions' | 'sendButton' | 'attachButton'>
  /** Acciones disponibles */
  actions?: ChatAction[]
  /** Accion en ejecucion */
  executingAction?: ChatAction | null
  /** Callback cuando se selecciona una accion */
  onExecuteAction?: (action: ChatAction, conversationId?: string) => void | Promise<void>
  /** ID de la conversacion actual (para pasarlo a las acciones) */
  conversationId?: string
  /** Texto del boton de acciones */
  actionsButtonText?: string
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
  title?: string
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
  emptyMessage?: string
  emptyHint?: string
  loadingText?: string
  className?: string
  classNames?: Pick<ChatClassNames, 'messageList' | 'message' | 'userMessage' | 'assistantMessage' | 'systemMessage' | 'messageContent' | 'messageAttachments'>
}
