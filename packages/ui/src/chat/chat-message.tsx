/**
 * LTB Components - ChatMessage
 * @version 1.0.0
 * 
 * Muestra un mensaje de chat individual con soporte para usuario, asistente y sistema.
 * Incluye renderizado de markdown, bloques de codigo y tablas.
 */

'use client'

import * as React from 'react'
import { FileText, Image as ImageIcon, File, Copy, Check } from 'lucide-react'
import { cn, formatFileSize } from '../utils'
import type { ChatMessageProps, Attachment } from './types'

function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.type.startsWith('image/')
  const isPdf = attachment.type === 'application/pdf'
  
  return (
    <div className="flex items-center gap-2 rounded-md border border-[var(--ltb-border)] bg-[var(--ltb-attachment-bg)] p-2 text-sm">
      {isImage ? (
        <ImageIcon className="h-4 w-4 text-[var(--ltb-muted-foreground)]" />
      ) : isPdf ? (
        <FileText className="h-4 w-4 text-[var(--ltb-muted-foreground)]" />
      ) : (
        <File className="h-4 w-4 text-[var(--ltb-muted-foreground)]" />
      )}
      <span className="flex-1 truncate text-[var(--ltb-foreground)]">{attachment.name}</span>
      <span className="text-xs text-[var(--ltb-muted-foreground)]">
        {formatFileSize(attachment.size)}
      </span>
    </div>
  )
}

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-3 overflow-hidden rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-code-bg,#1e293b)]">
      {language && (
        <div className="flex items-center justify-between border-b border-[var(--ltb-border)] bg-[var(--ltb-code-header-bg,#0f172a)] px-4 py-2">
          <span className="text-xs font-medium text-[var(--ltb-code-language-text,#94a3b8)]">
            {language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-[var(--ltb-code-button-text,#94a3b8)] transition-colors hover:bg-[var(--ltb-code-button-hover,#334155)] hover:text-[var(--ltb-code-button-hover-text,#f8fafc)]"
            aria-label="Copiar codigo"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4">
        <code className="text-sm text-[var(--ltb-code-text,#e2e8f0)]">
          {code}
        </code>
      </pre>
      {!language && (
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 flex items-center gap-1 rounded bg-[var(--ltb-code-button-bg,#334155)] px-2 py-1 text-xs text-[var(--ltb-code-button-text,#94a3b8)] opacity-0 transition-all hover:bg-[var(--ltb-code-button-hover,#475569)] hover:text-[var(--ltb-code-button-hover-text,#f8fafc)] group-hover:opacity-100"
          aria-label="Copiar codigo"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </button>
      )}
    </div>
  )
}

function parseMessageContent(content: string): React.ReactNode[] {
  const elements: React.ReactNode[] = []
  let lastIndex = 0
  
  // Regex para detectar bloques de codigo con o sin lenguaje
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g
  let match
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Agregar texto antes del bloque de codigo
    if (match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index)
      elements.push(
        <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {parseInlineElements(textBefore)}
        </span>
      )
    }
    
    // Agregar bloque de codigo
    const language = match[1]
    const code = match[2].trim()
    elements.push(
      <CodeBlock key={`code-${match.index}`} code={code} language={language} />
    )
    
    lastIndex = match.index + match[0].length
  }
  
  // Agregar texto restante
  if (lastIndex < content.length) {
    const remainingText = content.slice(lastIndex)
    elements.push(
      <span key={`text-${lastIndex}`} className="whitespace-pre-wrap">
        {parseInlineElements(remainingText)}
      </span>
    )
  }
  
  return elements.length > 0 ? elements : [<span key="content" className="whitespace-pre-wrap">{content}</span>]
}

function parseInlineElements(text: string): React.ReactNode {
  // Parsear tablas markdown simples
  const lines = text.split('\n')
  const tableStartIndex = lines.findIndex(line => line.trim().startsWith('|') && line.trim().endsWith('|'))
  
  if (tableStartIndex !== -1) {
    const tableLines: string[] = []
    let i = tableStartIndex
    
    while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
      tableLines.push(lines[i])
      i++
    }
    
    if (tableLines.length >= 2) {
      const beforeTable = lines.slice(0, tableStartIndex).join('\n')
      const afterTable = lines.slice(i).join('\n')
      
      // Parsear tabla
      const headerCells = tableLines[0].split('|').filter(cell => cell.trim()).map(cell => cell.trim())
      const bodyRows = tableLines.slice(2).map(row => 
        row.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
      )
      
      return (
        <>
          {beforeTable && <span>{beforeTable}</span>}
          <div className="my-3 overflow-x-auto">
            <table className="min-w-full border-collapse border border-[var(--ltb-border)]">
              <thead>
                <tr className="bg-[var(--ltb-muted)]">
                  {headerCells.map((cell, idx) => (
                    <th key={idx} className="border border-[var(--ltb-border)] px-4 py-2 text-left text-sm font-semibold text-[var(--ltb-foreground)]">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-[var(--ltb-bg)]' : 'bg-[var(--ltb-muted)]'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="border border-[var(--ltb-border)] px-4 py-2 text-sm text-[var(--ltb-foreground)]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {afterTable && <span>{parseInlineElements(afterTable)}</span>}
        </>
      )
    }
  }
  
  // Parsear codigo inline (backticks simples)
  const parts = text.split(/(`[^`]+`)/)
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const code = part.slice(1, -1)
      return (
        <code key={index} className="rounded bg-[var(--ltb-code-inline-bg,#e2e8f0)] px-1.5 py-0.5 text-sm font-mono text-[var(--ltb-code-inline-text,#0f172a)]">
          {code}
        </code>
      )
    }
    return part
  })
}

export function ChatMessage({ message, className, classNames }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'
  const isSystem = message.role === 'system'

  const parsedContent = React.useMemo(() => {
    if (isAssistant) {
      return parseMessageContent(message.content)
    }
    return message.content
  }, [message.content, isAssistant])

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start',
        className,
        classNames?.message
      )}
    >
      <div
        className={cn(
          isUser && [
            'max-w-[80%] rounded-lg px-4 py-3 bg-[var(--ltb-user-message-bg)] text-[var(--ltb-user-message-text)]',
            classNames?.userMessage
          ],
          isAssistant && [
            'w-full text-[var(--ltb-assistant-message-text)]',
            classNames?.assistantMessage
          ],
          isSystem && [
            'w-full text-center text-sm italic text-[var(--ltb-system-message-text)]',
            classNames?.systemMessage
          ]
        )}
      >
        {message.attachments && message.attachments.length > 0 && (
          <div
            className={cn(
              'mb-2 flex flex-col gap-2',
              isUser ? '' : 'max-w-md',
              classNames?.messageAttachments
            )}
          >
            {message.attachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}
        <div
          className={cn(
            isUser ? 'whitespace-pre-wrap break-words' : 'break-words leading-relaxed',
            classNames?.messageContent
          )}
        >
          {isAssistant ? parsedContent : message.content}
        </div>
      </div>
    </div>
  )
}

ChatMessage.displayName = 'ChatMessage'
