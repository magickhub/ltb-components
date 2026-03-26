/**
 * LTB Components - ChatMessage
 * @version 1.0.0
 * 
 * Displays a single chat message with support for user, assistant, and system roles.
 * Includes attachment display capabilities.
 */

'use client'

import * as React from 'react'
import { FileText, Image as ImageIcon, File } from 'lucide-react'
import { cn, formatFileSize } from '../utils'
import type { ChatMessageProps, Attachment } from './types'

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.type.startsWith('image/')
  const isPdf = attachment.type === 'application/pdf'
  
  return (
    <div className="flex items-center gap-2 rounded-md border border-[var(--ltb-border)] bg-[var(--ltb-attachment-bg)] p-2 text-sm">
      {isImage ? (
        <ImageIcon className="h-4 w-4 text-[var(--ltb-muted-foreground)]" />
      ) : isPdf ? (
        <FileText className="h-4 w-4 text-[var(--ltb-muted-foreground)]" />
      ) : (
        <File className="h-4 w-4 text-[var(--ltb-muted-foreground)]" />
      )}
      <span className="flex-1 truncate text-[var(--ltb-foreground)]">{attachment.name}</span>
      <span className="text-xs text-[var(--ltb-muted-foreground)]">
        {formatFileSize(attachment.size)}
      </span>
    </div>
  )
}

export function ChatMessage({ message, className, classNames }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const isSystem = message.role === 'system'

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start',
        className,
        classNames?.message
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-4 py-3',
          isUser && [
            'bg-[var(--ltb-user-message-bg)] text-[var(--ltb-user-message-text)]',
            classNames?.userMessage
          ],
          isAssistant && [
            'bg-[var(--ltb-assistant-message-bg)] text-[var(--ltb-assistant-message-text)]',
            classNames?.assistantMessage
          ],
          isSystem && [
            'bg-[var(--ltb-system-message-bg)] text-[var(--ltb-system-message-text)] text-center text-sm italic',
            classNames?.systemMessage
          ]
        )}
      >
        {message.attachments && message.attachments.length > 0 && (
          <div
            className={cn(
              'mb-2 flex flex-col gap-2',
              classNames?.messageAttachments
            )}
          >
            {message.attachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}
        <div
          className={cn(
            'whitespace-pre-wrap break-words',
            classNames?.messageContent
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  )
}

ChatMessage.displayName = 'ChatMessage'
