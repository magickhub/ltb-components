'use client'

import { ComposerPrimitive, AuiIf } from '@assistant-ui/react'
import { cn } from '@/lib/utils'
import { SendHorizontal, Square } from 'lucide-react'

interface ComposerProps {
  className?: string
}

export function Composer({ className }: ComposerProps) {
  return (
    <ComposerPrimitive.Root
      className={cn(
        'relative flex w-full max-w-2xl items-end rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow focus-within:shadow-md',
        className
      )}
    >
      <ComposerPrimitive.Input
        autoFocus
        placeholder="Escribe tu mensaje..."
        rows={1}
        className="flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
      
      <AuiIf condition={(s) => !s.thread.isRunning}>
        <ComposerPrimitive.Send asChild>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Enviar mensaje"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </ComposerPrimitive.Send>
      </AuiIf>
      
      <AuiIf condition={(s) => s.thread.isRunning}>
        <ComposerPrimitive.Cancel asChild>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive text-destructive-foreground transition-colors hover:bg-destructive/90"
            aria-label="Cancelar"
          >
            <Square className="h-4 w-4" />
          </button>
        </ComposerPrimitive.Cancel>
      </AuiIf>
    </ComposerPrimitive.Root>
  )
}
