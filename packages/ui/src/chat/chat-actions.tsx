/**
 * LTB Components - ChatActions
 * @version 1.0.0
 * 
 * Menu de acciones para inyectar contexto predefinido al chat.
 */

'use client'

import * as React from 'react'
import { 
  Zap, 
  Users, 
  BarChart3, 
  Target, 
  FileText, 
  Lightbulb,
  ChevronDown,
  Loader2,
  type LucideIcon
} from 'lucide-react'
import { cn } from '../utils'
import type { ChatAction } from './types'

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  users: Users,
  'bar-chart': BarChart3,
  target: Target,
  'file-text': FileText,
  lightbulb: Lightbulb,
}

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return Zap
  return iconMap[iconName.toLowerCase()] || Zap
}

interface ChatActionsProps {
  actions: ChatAction[]
  executingAction?: ChatAction | null
  onExecuteAction: (action: ChatAction) => void | Promise<void>
  buttonText?: string
  disabled?: boolean
  className?: string
}

export function ChatActions({
  actions,
  executingAction,
  onExecuteAction,
  buttonText = 'Acciones',
  disabled = false,
  className,
}: ChatActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Cerrar menu al hacer clic fuera
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleActionClick = React.useCallback(async (action: ChatAction) => {
    setIsOpen(false)
    await onExecuteAction(action)
  }, [onExecuteAction])

  if (actions.length === 0) return null

  const isExecuting = !!executingAction

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExecuting}
        className={cn(
          'flex h-10 items-center gap-1.5 rounded-lg border border-[var(--ltb-input-border)] bg-transparent px-3 text-sm text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)] disabled:cursor-not-allowed disabled:opacity-50'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu de acciones"
      >
        {isExecuting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">{executingAction?.label}</span>
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">{buttonText}</span>
            <ChevronDown className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
          </>
        )}
      </button>

      {/* Menu dropdown */}
      {isOpen && !isExecuting && (
        <div className="absolute bottom-full left-0 z-50 mb-2 min-w-[200px] overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)] shadow-lg">
          <div className="p-1">
            {actions.map((action) => {
              const Icon = getIcon(action.icon)
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleActionClick(action)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-[var(--ltb-foreground)] transition-colors hover:bg-[var(--ltb-muted)]"
                >
                  <Icon className="h-4 w-4 flex-shrink-0 text-[var(--ltb-muted-foreground)]" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{action.label}</div>
                    {action.description && (
                      <div className="text-xs text-[var(--ltb-muted-foreground)] truncate">
                        {action.description}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

ChatActions.displayName = 'ChatActions'
