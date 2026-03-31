/**
 * LTB Components - ChatActions
 * @version 1.0.0
 *
 * Menu de agentes con soporte multinivel por grupos/etapas.
 * Las acciones sin grupo aparecen en la raiz. Las que tienen grupo
 * se agrupan en secciones desplegables.
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
  ChevronRight,
  Loader2,
  Bot,
  type LucideIcon,
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
  bot: Bot,
}

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return Zap
  return iconMap[iconName.toLowerCase()] || Zap
}

interface ChatActionsProps {
  actions: ChatAction[]
  executingAction?: ChatAction | null
  onExecuteAction: (action: ChatAction, conversationId?: string) => void | Promise<void>
  conversationId?: string
  buttonText?: string
  disabled?: boolean
  className?: string
}

interface GroupedActions {
  /** Acciones sin grupo, van directamente en la raiz */
  root: ChatAction[]
  /** Mapa de nombre de grupo → acciones */
  groups: Map<string, ChatAction[]>
  /** Orden de aparicion de los grupos (preserva el orden del array original) */
  groupOrder: string[]
}

function groupActions(actions: ChatAction[]): GroupedActions {
  const root: ChatAction[] = []
  const groups = new Map<string, ChatAction[]>()
  const groupOrder: string[] = []

  for (const action of actions) {
    if (!action.group) {
      root.push(action)
    } else {
      if (!groups.has(action.group)) {
        groups.set(action.group, [])
        groupOrder.push(action.group)
      }
      groups.get(action.group)!.push(action)
    }
  }

  return { root, groups, groupOrder }
}

function ActionItem({
  action,
  onClick,
}: {
  action: ChatAction
  onClick: (action: ChatAction) => void
}) {
  const Icon = getIcon(action.icon)
  return (
    <button
      type="button"
      onClick={() => onClick(action)}
      className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-sm text-[var(--ltb-foreground)] transition-colors hover:bg-[var(--ltb-muted)]"
    >
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--ltb-muted-foreground)]" />
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
}

function GroupSection({
  name,
  actions,
  onActionClick,
}: {
  name: string
  actions: ChatAction[]
  onActionClick: (action: ChatAction) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-muted)] hover:text-[var(--ltb-foreground)]"
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={cn('h-3 w-3 flex-shrink-0 transition-transform', isOpen && 'rotate-90')}
        />
        <span className="flex-1 truncate">{name}</span>
        <span className="ml-auto text-[10px] font-normal normal-case tracking-normal opacity-60">
          {actions.length}
        </span>
      </button>

      {isOpen && (
        <div className="ml-3 border-l border-[var(--ltb-border)] pl-1">
          {actions.map((action) => (
            <ActionItem key={action.id} action={action} onClick={onActionClick} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ChatActions({
  actions,
  executingAction,
  onExecuteAction,
  conversationId,
  buttonText = 'Agentes',
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

  const handleActionClick = React.useCallback(
    async (action: ChatAction) => {
      setIsOpen(false)
      await onExecuteAction(action, conversationId)
    },
    [onExecuteAction, conversationId],
  )

  if (actions.length === 0) return null

  const isExecuting = !!executingAction
  const { root, groups, groupOrder } = groupActions(actions)
  const hasGroups = groupOrder.length > 0

  return (
    <div className={cn('relative', className)}>
      {/* Boton principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isExecuting}
        className={cn(
          'flex h-10 items-center gap-1.5 rounded-lg border border-[var(--ltb-input-border)] bg-transparent px-3 text-sm text-[var(--ltb-muted-foreground)] transition-colors hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)] disabled:cursor-not-allowed disabled:opacity-50',
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu de agentes"
      >
        {isExecuting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">{executingAction?.label}</span>
          </>
        ) : (
          <>
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">{buttonText}</span>
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--ltb-muted)] px-1 text-[10px] font-medium text-[var(--ltb-muted-foreground)]">
              {actions.length}
            </span>
            <ChevronDown className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-180')} />
          </>
        )}
      </button>

      {/* Menu dropdown */}
      {isOpen && !isExecuting && (
        <div
          ref={menuRef}
          className="absolute bottom-full left-0 z-50 mb-2 w-64 overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)] shadow-lg"
        >
          <div className="p-1 max-h-80 overflow-y-auto">
            {/* Acciones sin grupo en la raiz */}
            {root.map((action) => (
              <ActionItem key={action.id} action={action} onClick={handleActionClick} />
            ))}

            {/* Separador si hay tanto acciones raiz como grupos */}
            {root.length > 0 && hasGroups && (
              <div className="my-1 border-t border-[var(--ltb-border)]" />
            )}

            {/* Grupos desplegables */}
            {groupOrder.map((groupName) => (
              <GroupSection
                key={groupName}
                name={groupName}
                actions={groups.get(groupName)!}
                onActionClick={handleActionClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

ChatActions.displayName = 'ChatActions'
