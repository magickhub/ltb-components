/**
 * LTB Components
 * @version 1.0.0
 * 
 * A React component library built on shadcn/ui with customizable AI chat widgets.
 * 
 * @example
 * ```tsx
 * import { AIChatWidget } from 'ltb-components/chat'
 * import 'ltb-components/styles.css'
 * 
 * <AIChatWidget
 *   conversations={conversations}
 *   messages={messages}
 *   onSendMessage={handleSendMessage}
 *   onNewConversation={handleNewConversation}
 *   onSelectConversation={handleSelectConversation}
 * />
 * ```
 */

// Chat module
export * from './chat'

// Utilities
export { cn, formatFileSize, formatDate, truncateText, generateId } from './utils'
