export { AIChatWidget, AIChatWidgetProps, Attachment, ChatAction, ChatActions, ChatClassNames, ChatHeader, ChatHeaderProps, ChatInput, ChatInputProps, ChatMessage, ChatMessageList, ChatMessageListProps, ChatMessageProps, ChatSidebar, ChatSidebarProps, Conversation, Message, MessageAction, useAutoResize, useAutoScroll, useFileAttachments } from './chat.js';
import { ClassValue } from 'clsx';
import 'react/jsx-runtime';
import 'react';

/**
 * LTB Components - Utilities
 * @version 1.0.0
 */

declare function cn(...inputs: ClassValue[]): string;
declare function formatFileSize(bytes: number): string;
declare function formatDate(date: Date): string;
declare function truncateText(text: string, maxLength: number): string;
declare function generateId(): string;

export { cn, formatDate, formatFileSize, generateId, truncateText };
