/**
 * LTB Components - ChatHeader
 * @version 1.0.0
 * 
 * Header component for the chat widget.
 */

'use client'

import * as React from 'react'
import { PanelLeft } from 'lucide-react'
import { cn } from '../utils'
import type { ChatHeaderProps } from './types'

export function ChatHeader({
  title = 'Chat',
  onToggleSidebar,
  showSidebarToggle = false,
  className,
  classNames,
}: ChatHeaderProps) {
  return (
    <header
      className={cn(
        'flex h-14 items-center gap-3 border-b border-[var(--ltb-border)] bg-[var(--ltb-header-bg)] px-4',
        className,
        classNames?.header
      )}
    >
      {showSidebarToggle && onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)]"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      )}
      <h1 className="text-lg font-semibold text-[var(--ltb-foreground)]">
        {title}
      </h1>
    </header>
  )
}

ChatHeader.displayName = 'ChatHeader'
