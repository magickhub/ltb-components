import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';

/**
 * LTB Components - Chat Types
 * @version 1.0.0
 */
interface Attachment {
    id: string;
    name: string;
    type: string;
    url?: string;
    size: number;
}
/**
 * Accion que puede inyectarse al chat como contexto.
 * El badge se muestra visualmente pero el contenido completo se envia internamente.
 */
interface ChatAction {
    /** Identificador unico de la accion */
    id: string;
    /** Nombre corto que se muestra en el badge (ej: "Buyer Persona") */
    label: string;
    /** Descripcion de la accion para el menu */
    description?: string;
    /** Icono de la accion (nombre de Lucide icon) */
    icon?: string;
    /** Grupo o etapa al que pertenece la accion (ej: "Analisis", "Estrategia"). Si no se define, aparece en la raiz */
    group?: string;
}
/**
 * Referencia a una accion ejecutada en un mensaje.
 * Se muestra como badge pero contiene el contexto completo.
 */
interface MessageAction {
    /** ID de la accion ejecutada */
    actionId: string;
    /** Label que se muestra en el badge */
    label: string;
    /** Contenido completo inyectado (no visible, enviado a la IA) */
    content: string;
}
interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    attachments?: Attachment[];
    /** Accion ejecutada con este mensaje (muestra badge, inyecta contexto) */
    action?: MessageAction;
    createdAt: Date;
}
interface Conversation {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    preview?: string;
}
interface ChatClassNames {
    container?: string;
    sidebar?: string;
    sidebarHeader?: string;
    sidebarContent?: string;
    sidebarItem?: string;
    sidebarItemActive?: string;
    main?: string;
    header?: string;
    messageList?: string;
    message?: string;
    userMessage?: string;
    assistantMessage?: string;
    systemMessage?: string;
    messageContent?: string;
    messageAttachments?: string;
    inputContainer?: string;
    input?: string;
    inputActions?: string;
    sendButton?: string;
    attachButton?: string;
}
interface AIChatWidgetProps {
    /** Lista de todas las conversaciones */
    conversations: Conversation[];
    /** ID de la conversacion actualmente seleccionada */
    currentConversationId?: string;
    /** Mensajes de la conversacion actual */
    messages: Message[];
    /** Texto placeholder para el input (por defecto: 'Escribe un mensaje...') */
    placeholder?: string;
    /** Tamano maximo de archivo en MB (por defecto: 10) */
    maxFileSize?: number;
    /** Numero maximo de archivos adjuntos por mensaje (por defecto: 1) */
    maxAttachments?: number;
    /** Tipos de archivo permitidos (por defecto: todos) */
    allowedFileTypes?: string[];
    /** Mostrar/ocultar sidebar (por defecto: true) */
    showSidebar?: boolean;
    /** Mostrar/ocultar header (por defecto: true) */
    showHeader?: boolean;
    /** Titulo del header (por defecto: 'Chat') */
    headerTitle?: string;
    /** Mensaje cuando no hay mensajes (por defecto: 'Inicia una conversacion') */
    emptyStateMessage?: string;
    /** Texto secundario en estado vacio (por defecto: 'Envia un mensaje para comenzar') */
    emptyStateHint?: string;
    /** Mensaje cuando no hay conversaciones (por defecto: 'No hay conversaciones') */
    emptyConversationsMessage?: string;
    /** Mensaje de confirmacion al eliminar conversacion */
    deleteConfirmMessage?: string;
    /** Titulo del sidebar (por defecto: 'Conversaciones') */
    sidebarTitle?: string;
    /** Texto de carga mientras espera respuesta (por defecto: 'Pensando...') */
    loadingText?: string;
    /** Texto del boton de acciones (por defecto: 'Acciones') */
    actionsButtonText?: string;
    /** Acciones disponibles para inyectar contexto */
    actions?: ChatAction[];
    /** Accion actualmente en ejecucion (genera loading en el boton) */
    executingAction?: ChatAction | null;
    /** Custom class names for styling */
    className?: string;
    classNames?: ChatClassNames;
    /** Called when user sends a message (con accion opcional) */
    onSendMessage: (content: string, attachments?: File[], action?: MessageAction) => void | Promise<void>;
    /** Called when user triggers an action. Recibe la accion y el ID de la conversacion activa */
    onExecuteAction?: (action: ChatAction, conversationId: string | undefined) => void | Promise<void>;
    /** Called when user creates a new conversation */
    onNewConversation: () => void | Promise<void>;
    /** Called when user selects a conversation */
    onSelectConversation: (id: string) => void | Promise<void>;
    /** Called when user deletes a conversation */
    onDeleteConversation?: (id: string) => void | Promise<void>;
    /** Called when user renames a conversation */
    onRenameConversation?: (id: string, newTitle: string) => void | Promise<void>;
    /** Loading state while waiting for response */
    isLoading?: boolean;
    /** Disabled state */
    disabled?: boolean;
}
interface ChatMessageProps {
    message: Message;
    className?: string;
    classNames?: Pick<ChatClassNames, 'message' | 'userMessage' | 'assistantMessage' | 'systemMessage' | 'messageContent' | 'messageAttachments'>;
}
interface ChatInputProps {
    placeholder?: string;
    maxFileSize?: number;
    maxAttachments?: number;
    allowedFileTypes?: string[];
    onSendMessage: (content: string, attachments?: File[], action?: MessageAction) => void | Promise<void>;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    classNames?: Pick<ChatClassNames, 'inputContainer' | 'input' | 'inputActions' | 'sendButton' | 'attachButton'>;
    /** Acciones disponibles */
    actions?: ChatAction[];
    /** Accion en ejecucion */
    executingAction?: ChatAction | null;
    /** Callback cuando se selecciona una accion */
    onExecuteAction?: (action: ChatAction, conversationId?: string) => void | Promise<void>;
    /** ID de la conversacion actual (para pasarlo a las acciones) */
    conversationId?: string;
    /** Texto del boton de acciones */
    actionsButtonText?: string;
}
interface ChatSidebarProps {
    conversations: Conversation[];
    currentConversationId?: string;
    onNewConversation: () => void | Promise<void>;
    onSelectConversation: (id: string) => void | Promise<void>;
    onDeleteConversation?: (id: string) => void | Promise<void>;
    onRenameConversation?: (id: string, newTitle: string) => void | Promise<void>;
    emptyMessage?: string;
    deleteConfirmMessage?: string;
    title?: string;
    className?: string;
    classNames?: Pick<ChatClassNames, 'sidebar' | 'sidebarHeader' | 'sidebarContent' | 'sidebarItem' | 'sidebarItemActive'>;
}
interface ChatHeaderProps {
    title?: string;
    onToggleSidebar?: () => void;
    showSidebarToggle?: boolean;
    className?: string;
    classNames?: Pick<ChatClassNames, 'header'>;
}
interface ChatMessageListProps {
    messages: Message[];
    isLoading?: boolean;
    emptyMessage?: string;
    emptyHint?: string;
    loadingText?: string;
    className?: string;
    classNames?: Pick<ChatClassNames, 'messageList' | 'message' | 'userMessage' | 'assistantMessage' | 'systemMessage' | 'messageContent' | 'messageAttachments'>;
}

declare function AIChatWidget({ conversations, currentConversationId, messages, placeholder, maxFileSize, maxAttachments, allowedFileTypes, showSidebar, showHeader, headerTitle, emptyStateMessage, emptyStateHint, emptyConversationsMessage, deleteConfirmMessage, sidebarTitle, loadingText, actionsButtonText, actions, executingAction, className, classNames, onSendMessage, onNewConversation, onSelectConversation, onDeleteConversation, onRenameConversation, onExecuteAction, isLoading, disabled, }: AIChatWidgetProps): react_jsx_runtime.JSX.Element;
declare namespace AIChatWidget {
    var displayName: string;
}

declare function ChatMessage({ message, className, classNames }: ChatMessageProps): react_jsx_runtime.JSX.Element;
declare namespace ChatMessage {
    var displayName: string;
}

declare function ChatMessageList({ messages, isLoading, emptyMessage, emptyHint, loadingText, className, classNames, }: ChatMessageListProps): react_jsx_runtime.JSX.Element;
declare namespace ChatMessageList {
    var displayName: string;
}

declare function ChatInput({ placeholder, maxFileSize, maxAttachments, allowedFileTypes, onSendMessage, isLoading, disabled, className, classNames, actions, executingAction, onExecuteAction, conversationId, actionsButtonText, }: ChatInputProps): react_jsx_runtime.JSX.Element;
declare namespace ChatInput {
    var displayName: string;
}

declare function ChatSidebar({ conversations, currentConversationId, onNewConversation, onSelectConversation, onDeleteConversation, onRenameConversation, emptyMessage, deleteConfirmMessage, title, className, classNames, }: ChatSidebarProps): react_jsx_runtime.JSX.Element;
declare namespace ChatSidebar {
    var displayName: string;
}

declare function ChatHeader({ title, onToggleSidebar, showSidebarToggle, className, classNames, }: ChatHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace ChatHeader {
    var displayName: string;
}

interface ChatActionsProps {
    actions: ChatAction[];
    executingAction?: ChatAction | null;
    onExecuteAction: (action: ChatAction, conversationId?: string) => void | Promise<void>;
    conversationId?: string;
    buttonText?: string;
    disabled?: boolean;
    className?: string;
}
declare function ChatActions({ actions, executingAction, onExecuteAction, conversationId, buttonText, disabled, className, }: ChatActionsProps): react_jsx_runtime.JSX.Element | null;
declare namespace ChatActions {
    var displayName: string;
}

/**
 * LTB Components - Chat Hooks
 * @version 1.0.0
 */
/**
 * Hook for auto-scrolling to the bottom of a container
 */
declare function useAutoScroll<T extends HTMLElement>(deps: any[]): react.RefObject<T | null>;
/**
 * Hook para manejar archivos adjuntos
 */
declare function useFileAttachments(options?: {
    maxFileSize?: number;
    maxAttachments?: number;
    allowedFileTypes?: string[];
}): {
    files: File[];
    error: string | null;
    inputRef: react.RefObject<HTMLInputElement | null>;
    addFiles: (newFiles: FileList | File[]) => void;
    removeFile: (index: number) => void;
    clearFiles: () => void;
    openFilePicker: () => void;
};
/**
 * Hook for handling textarea auto-resize
 */
declare function useAutoResize<T extends HTMLTextAreaElement>(): {
    ref: react.RefObject<T | null>;
    resize: () => void;
};

export { AIChatWidget, type AIChatWidgetProps, type Attachment, type ChatAction, ChatActions, type ChatClassNames, ChatHeader, type ChatHeaderProps, ChatInput, type ChatInputProps, ChatMessage, ChatMessageList, type ChatMessageListProps, type ChatMessageProps, ChatSidebar, type ChatSidebarProps, type Conversation, type Message, type MessageAction, useAutoResize, useAutoScroll, useFileAttachments };
