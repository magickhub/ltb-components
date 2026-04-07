'use client'

import { ThreadListPrimitive, ThreadListItemPrimitive } from '@assistant-ui/react'
import { cn } from '@/lib/utils'
import { MessageSquare, Plus } from 'lucide-react'

interface ThreadListProps {
  className?: string
}

export function ThreadList({ className }: ThreadListProps) {
  return (
    <ThreadListPrimitive.Root className={cn('flex h-full flex-col', className)}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-sm font-semibold">Conversaciones</h2>
        <ThreadListPrimitive.New asChild>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Nueva conversacion"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ThreadListPrimitive.New>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <ThreadListPrimitive.Items>
          {() => <ThreadListItem />}
        </ThreadListPrimitive.Items>
      </div>
    </ThreadListPrimitive.Root>
  )
}

function ThreadListItem() {
  return (
    <ThreadListItemPrimitive.Root className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-sm transition-colors hover:bg-muted data-[active]:bg-muted">
      <ThreadListItemPrimitive.Trigger asChild>
        <button className="flex flex-1 items-center gap-3 text-left">
          <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="flex-1 truncate">
            <ThreadListItemPrimitive.Title className="truncate font-medium" />
          </div>
        </button>
      </ThreadListItemPrimitive.Trigger>
    </ThreadListItemPrimitive.Root>
  )
}
