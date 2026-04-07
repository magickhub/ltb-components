'use client'

import { MessagePrimitive } from '@assistant-ui/react'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

interface UserMessageProps {
  className?: string
}

export function UserMessage({ className }: UserMessageProps) {
  return (
    <MessagePrimitive.Root
      className={cn(
        'relative mb-4 flex w-full max-w-2xl flex-row-reverse gap-3 self-end px-4',
        className
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <User className="h-4 w-4" />
      </div>
      <div className="flex max-w-[85%] flex-col items-end">
        <div className="rounded-2xl rounded-br-sm bg-primary px-4 py-2 text-primary-foreground">
          <MessagePrimitive.Content />
        </div>
      </div>
    </MessagePrimitive.Root>
  )
}
