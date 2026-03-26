/**
 * LTB Components - ChatMessageList
 * @version 1.0.0
 * 
 * Contenedor scrollable para mensajes con soporte de auto-scroll.
 */

'use client'

import * as React from 'react'
import { MessageSquare, Loader2 } from 'lucide-react'
import { cn } from '../utils'
import { useAutoScroll } from './hooks'
import { ChatMessage } from './chat-message'
import type { ChatMessageListProps } from './types'

export function ChatMessageList({
  messages,
  isLoading = false,
  isStreaming = false,
  emptyMessage = 'Inicia una conversacion',
  emptyHint = 'Envia un mensaje para comenzar',
  loadingText = 'Pensando...',
  className,
  classNames,
}: ChatMessageListProps) {
  const scrollRef = useAutoScroll<HTMLDivElement>([messages, isLoading, isStreaming])

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex-1 overflow-y-auto p-4',
        className,
        classNames?.messageList
      )}
    >
      {messages.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--ltb-muted)]">
            <MessageSquare className="h-8 w-8 text-[var(--ltb-muted-foreground)]" />
          </div>
          <p className="text-lg font-medium text-[var(--ltb-foreground)]">
            {emptyMessage}
          </p>
          <p className="mt-1 text-sm text-[var(--ltb-muted-foreground)]">
            {emptyHint}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              classNames={classNames}
            />
          ))}
          
          {/* Indicador de carga */}
          {isLoading && !isStreaming && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-[var(--ltb-assistant-message-bg)] px-4 py-3 text-[var(--ltb-assistant-message-text)]">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">{loadingText}</span>
              </div>
            </div>
          )}
          
          {/* Indicador de streaming */}
          {isStreaming && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-lg bg-[var(--ltb-assistant-message-bg)] px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--ltb-muted-foreground)] [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--ltb-muted-foreground)] [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--ltb-muted-foreground)]" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

ChatMessageList.displayName = 'ChatMessageList'
