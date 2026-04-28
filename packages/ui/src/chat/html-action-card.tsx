/**
 * LTB Components - HtmlActionCard
 * @version 1.0.0
 * 
 * Componente que renderiza una tarjeta especial para acciones HTML.
 * Muestra un icono, título, subtítulo y botón de acción.
 */

'use client'

import * as React from 'react'
import { 
  Code2, 
  File, 
  FileText, 
  FileJson, 
  FileSpreadsheet,
  Image, 
  Video,
  Music,
  Github, 
  BarChart3, 
  BookOpen, 
  ExternalLink, 
  Zap,
  Database,
  Copy,
  Share2,
  Download,
  Settings,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Info,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Link,
  Globe,
  Terminal,
  type LucideIcon 
} from 'lucide-react'
import { cn } from '../utils'
import type { Message, HtmlMessageAction } from './types'

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap: Record<string, LucideIcon> = {
  'Code2': Code2,
  'File': File,
  'FileText': FileText,
  'FileJson': FileJson,
  'FileSpreadsheet': FileSpreadsheet,
  'Image': Image,
  'Video': Video,
  'Music': Music,
  'Github': Github,
  'BarChart3': BarChart3,
  'BookOpen': BookOpen,
  'ExternalLink': ExternalLink,
  'Zap': Zap,
  'Database': Database,
  'Copy': Copy,
  'Share2': Share2,
  'Download': Download,
  'Settings': Settings,
  'Lock': Lock,
  'Unlock': Unlock,
  'CheckCircle': CheckCircle,
  'AlertCircle': AlertCircle,
  'Info': Info,
  'Mail': Mail,
  'Calendar': Calendar,
  'Clock': Clock,
  'MapPin': MapPin,
  'Link': Link,
  'Globe': Globe,
  'Terminal': Terminal,
}

interface HtmlActionCardProps {
  message: Message
  action: HtmlMessageAction
  onActionClick?: (message: Message, action: HtmlMessageAction) => void | Promise<void>
  className?: string
}

export function HtmlActionCard({
  message,
  action,
  onActionClick,
  className,
}: HtmlActionCardProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  
  // Obtener el icono del mapa o usar Code2 por defecto
  const iconName = action.icon || 'Code2'
  const IconComponent = iconMap[iconName] || Code2
  
  const handleClick = async () => {
    if (!onActionClick) return
    
    setIsLoading(true)
    try {
      await onActionClick(message, action)
    } catch (error) {
      console.error('[v0] Error in HtmlActionCard onClick:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div
      className={cn(
        'flex w-full items-center gap-4 rounded-lg border border-[var(--ltb-border)] bg-[var(--ltb-bg)] p-4',
        className
      )}
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--ltb-muted)]">
        <IconComponent className="h-6 w-6 text-[var(--ltb-muted-foreground)]" />
      </div>
      
      {/* Title and Subtitle */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[var(--ltb-foreground)]">
          {action.title}
        </h3>
        {action.subtitle && (
          <p className="text-sm text-[var(--ltb-muted-foreground)]">
            {action.subtitle}
          </p>
        )}
      </div>
      
      {/* Button */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          'flex-shrink-0 rounded-lg border border-[var(--ltb-border)] px-4 py-2 font-medium transition-colors',
          'text-[var(--ltb-foreground)] hover:bg-[var(--ltb-muted)]',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'whitespace-nowrap'
        )}
      >
        {isLoading ? 'Abriendo...' : 'Abrir'}
      </button>
    </div>
  )
}

HtmlActionCard.displayName = 'HtmlActionCard'
