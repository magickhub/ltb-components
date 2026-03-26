/**
 * LTB Components - ChatSidebar
 * @version 1.0.0
 * 
 * Sidebar component displaying conversation history with actions.
 */

'use client'

import * as React from 'react'
import { Plus, MessageSquare, Trash2, Pencil, Check, X } from 'lucide-react'
import { cn, formatDate, truncateText } from '../utils'
import type { ChatSidebarProps, Conversation } from './types'

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onSelect: () => void
  onDelete?: () => void
  onRename?: (newTitle: string) => void
  classNames?: ChatSidebarProps['classNames']
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onRename,
  classNames,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [editTitle, setEditTitle] = React.useState(conversation.title)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSaveTitle = () => {
    if (editTitle.trim() && editTitle !== conversation.title) {
      onRename?.(editTitle.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(conversation.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-lg px-3 py-2 transition-colors',
        isActive
          ? 'bg-[var(--ltb-sidebar-active)] text-[var(--ltb-sidebar-active-text)]'
          : 'text-[var(--ltb-sidebar-text)] hover:bg-[var(--ltb-sidebar-hover)]',
        classNames?.sidebarItem,
        isActive && classNames?.sidebarItemActive
      )}
    >
      <MessageSquare className="h-4 w-4 flex-shrink-0" />
      
      {isEditing ? (
        <div className="flex flex-1 items-center gap-1">
          <input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm outline-none"
            aria-label="Edit conversation title"
          />
          <button
            onClick={handleSaveTitle}
            className="rounded p-0.5 hover:bg-[var(--ltb-border)]"
            aria-label="Save title"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={handleCancelEdit}
            className="rounded p-0.5 hover:bg-[var(--ltb-border)]"
            aria-label="Cancel editing"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={onSelect}
            className="flex flex-1 flex-col items-start overflow-hidden text-left"
          >
            <span className="w-full truncate text-sm font-medium">
              {truncateText(conversation.title, 25)}
            </span>
            {conversation.preview && (
              <span className="w-full truncate text-xs opacity-70">
                {truncateText(conversation.preview, 30)}
              </span>
            )}
          </button>
          
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {onRename && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded p-1 text-[var(--ltb-muted-foreground)] hover:bg-[var(--ltb-border)] hover:text-[var(--ltb-foreground)]"
                aria-label="Rename conversation"
              >
                <Pencil className="h-3 w-3" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="rounded p-1 text-[var(--ltb-muted-foreground)] hover:bg-[var(--ltb-error-bg)] hover:text-[var(--ltb-error)]"
                aria-label="Delete conversation"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export function ChatSidebar({
  conversations,
  currentConversationId,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  emptyMessage = 'No conversations yet',
  className,
  classNames,
}: ChatSidebarProps) {
  // Group conversations by date
  const groupedConversations = React.useMemo(() => {
    const groups: { label: string; conversations: Conversation[] }[] = []
    const today: Conversation[] = []
    const yesterday: Conversation[] = []
    const thisWeek: Conversation[] = []
    const older: Conversation[] = []

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterdayStart = new Date(todayStart.getTime() - 24 * 60 * 60 * 1000)
    const weekStart = new Date(todayStart.getTime() - 7 * 24 * 60 * 60 * 1000)

    conversations.forEach((conv) => {
      const convDate = new Date(conv.updatedAt)
      if (convDate >= todayStart) {
        today.push(conv)
      } else if (convDate >= yesterdayStart) {
        yesterday.push(conv)
      } else if (convDate >= weekStart) {
        thisWeek.push(conv)
      } else {
        older.push(conv)
      }
    })

    if (today.length > 0) groups.push({ label: 'Today', conversations: today })
    if (yesterday.length > 0) groups.push({ label: 'Yesterday', conversations: yesterday })
    if (thisWeek.length > 0) groups.push({ label: 'This Week', conversations: thisWeek })
    if (older.length > 0) groups.push({ label: 'Older', conversations: older })

    return groups
  }, [conversations])

  return (
    <aside
      className={cn(
        'flex h-full w-64 flex-col border-r border-[var(--ltb-border)] bg-[var(--ltb-sidebar-bg)]',
        className,
        classNames?.sidebar
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between border-b border-[var(--ltb-border)] p-4',
          classNames?.sidebarHeader
        )}
      >
        <h2 className="text-sm font-semibold text-[var(--ltb-foreground)]">
          Conversations
        </h2>
        <button
          onClick={() => onNewConversation()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--ltb-primary)] text-[var(--ltb-primary-foreground)] transition-colors hover:bg-[var(--ltb-primary-hover)]"
          aria-label="New conversation"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Conversation list */}
      <div
        className={cn(
          'flex-1 overflow-y-auto p-2',
          classNames?.sidebarContent
        )}
      >
        {conversations.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-sm text-[var(--ltb-muted-foreground)]">
            {emptyMessage}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {groupedConversations.map((group) => (
              <div key={group.label}>
                <div className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-[var(--ltb-muted-foreground)]">
                  {group.label}
                </div>
                <div className="flex flex-col gap-1">
                  {group.conversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isActive={conversation.id === currentConversationId}
                      onSelect={() => onSelectConversation(conversation.id)}
                      onDelete={onDeleteConversation ? () => onDeleteConversation(conversation.id) : undefined}
                      onRename={onRenameConversation ? (title) => onRenameConversation(conversation.id, title) : undefined}
                      classNames={classNames}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

ChatSidebar.displayName = 'ChatSidebar'
