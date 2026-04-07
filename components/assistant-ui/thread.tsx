'use client'

import { ThreadPrimitive, AuiIf } from '@assistant-ui/react'
import { cn } from '@/lib/utils'
import { ArrowDown } from 'lucide-react'
import { Composer } from './composer'
import { UserMessage } from './user-message'
import { AssistantMessage } from './assistant-message'
import { ThreadWelcome } from './thread-welcome'

interface ThreadProps {
  className?: string
}

export function Thread({ className }: ThreadProps) {
  return (
    <ThreadPrimitive.Root className={cn('relative flex h-full min-h-0 flex-col', className)}>
      <ThreadPrimitive.Viewport className="absolute inset-0 flex flex-col overflow-y-auto scroll-smooth">
        <AuiIf condition={(s) => s.thread.isEmpty}>
          <ThreadWelcome />
        </AuiIf>

        <AuiIf condition={(s) => !s.thread.isEmpty}>
          <div className="min-h-8 flex-1" />
        </AuiIf>

        <ThreadPrimitive.Messages>
          {({ message }) => {
            if (message.role === 'user') return <UserMessage />
            return <AssistantMessage />
          }}
        </ThreadPrimitive.Messages>

        <ThreadPrimitive.ViewportFooter className="sticky bottom-0 mt-4 flex w-full flex-col items-center justify-end bg-gradient-to-t from-background via-background pt-8 pb-4">
          <ThreadPrimitive.ScrollToBottom asChild>
            <button
              className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-opacity hover:bg-muted disabled:invisible"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </ThreadPrimitive.ScrollToBottom>
          <Composer />
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  )
}
