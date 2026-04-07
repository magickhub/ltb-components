'use client'

import { MessageSquare, LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

export interface ThreadWelcomeProps {
  /** Titulo del chat (default: "Chat v2") */
  title?: string
  /** Descripcion del chat */
  description?: string
  /** Pasos o sugerencias a mostrar */
  steps?: string[]
  /** Icono personalizado */
  icon?: LucideIcon
  /** Contenido completamente personalizado (reemplaza todo) */
  children?: ReactNode
}

const defaultSteps = [
  'Escribe tu mensaje en el campo de texto inferior',
  'Presiona Enter o el boton de enviar',
  'Recibe respuestas en tiempo real con streaming',
]

export function ThreadWelcome({
  title = 'Chat v2',
  description = 'Interfaz de chat construida con assistant-ui, la libreria de codigo abierto para experiencias de chat con IA.',
  steps = defaultSteps,
  icon: Icon = MessageSquare,
  children,
}: ThreadWelcomeProps) {
  // Si se pasan children, renderizar contenido personalizado
  if (children) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        {children}
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      {steps.length > 0 && (
        <div className="mt-4 grid max-w-lg gap-2 text-left text-sm">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
              <span className="text-lg">{index + 1}.</span>
              <p className="text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
