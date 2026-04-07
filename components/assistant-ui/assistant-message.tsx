'use client'

import { MessagePrimitive, ActionBarPrimitive, AuiIf } from '@assistant-ui/react'
import { cn } from '@/lib/utils'
import { Bot, Copy, Check, RefreshCw } from 'lucide-react'

interface AssistantMessageProps {
  className?: string
}

export function AssistantMessage({ className }: AssistantMessageProps) {
  return (
    <MessagePrimitive.Root
      className={cn(
        'group relative mb-4 flex w-full max-w-2xl gap-3 px-4',
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex max-w-[85%] flex-col">
        <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-2 text-foreground">
          <MessagePrimitive.Content />
        </div>
        
        <AuiIf condition={(s) => !s.thread.isRunning}>
          <ActionBarPrimitive.Root className="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <ActionBarPrimitive.Copy className="group/copy flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Copy className="h-3.5 w-3.5 group-data-[copied]/copy:hidden" />
              <Check className="hidden h-3.5 w-3.5 group-data-[copied]/copy:block" />
            </ActionBarPrimitive.Copy>
            
            <ActionBarPrimitive.Reload className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <RefreshCw className="h-3.5 w-3.5" />
            </ActionBarPrimitive.Reload>
          </ActionBarPrimitive.Root>
        </AuiIf>
      </div>
    </MessagePrimitive.Root>
  )
}
