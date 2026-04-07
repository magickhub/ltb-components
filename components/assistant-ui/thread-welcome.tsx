'use client'

import { MessageSquare } from 'lucide-react'

export function ThreadWelcome() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <MessageSquare className="h-8 w-8" />
      </div>
      <div className="max-w-md space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Chat v2
        </h2>
        <p className="text-muted-foreground">
          Interfaz de chat construida con assistant-ui, la libreria de codigo abierto para experiencias de chat con IA.
        </p>
      </div>
      <div className="mt-4 grid max-w-lg gap-2 text-left text-sm">
        <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
          <span className="text-lg">1.</span>
          <p className="text-muted-foreground">
            Escribe tu mensaje en el campo de texto inferior
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
          <span className="text-lg">2.</span>
          <p className="text-muted-foreground">
            Presiona Enter o el boton de enviar
          </p>
        </div>
        <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-3">
          <span className="text-lg">3.</span>
          <p className="text-muted-foreground">
            Recibe respuestas en tiempo real con streaming
          </p>
        </div>
      </div>
    </div>
  )
}
