export const metadata = {
  title: 'Primeros pasos - LTB Components',
  description: 'Como instalar y configurar LTB Components en tu proyecto',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Primeros pasos</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Aprende como instalar y configurar LTB Components en tu proyecto React.
        </p>
      </div>

      {/* Instalacion */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Instalacion</h2>
        <p className="text-muted-foreground">
          Instala LTB Components directamente desde GitHub usando tu gestor de paquetes preferido:
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">npm</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">npm install github:tu-usuario/ltb-components</code>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">yarn</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">yarn add github:tu-usuario/ltb-components</code>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">pnpm</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">pnpm add github:tu-usuario/ltb-components</code>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm">
            <strong>Fijar una version especifica:</strong> Agrega <code className="bg-muted px-1 rounded">#v1.0.0</code> al final para bloquear una version especifica.
          </p>
        </div>
      </section>

      {/* Dependencias */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Dependencias requeridas</h2>
        <p className="text-muted-foreground">
          LTB Components requiere las siguientes dependencias peer:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "lucide-react": "^0.400.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0 || ^3.0.0"
}`}</code></pre>
        </div>
      </section>

      {/* Configurar estilos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Configurar estilos</h2>
        <p className="text-muted-foreground">
          Importa los estilos del componente en tu punto de entrada o layout:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`// En tu app/layout.tsx o _app.tsx
import 'ltb-components/styles.css'`}</code></pre>
        </div>
        <p className="text-muted-foreground">
          Los estilos usan variables CSS que puedes personalizar en tu propio CSS:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`:root {
  --ltb-primary: #0f172a;
  --ltb-primary-hover: #1e293b;
  --ltb-user-message-bg: #3b82f6;
  --ltb-user-message-text: #ffffff;
  /* ... mas variables */
}`}</code></pre>
        </div>
      </section>

      {/* Uso basico */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Uso basico</h2>
        <p className="text-muted-foreground">
          Aqui tienes un ejemplo completo de uso del componente AIChatWidget:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`'use client'

import { useState } from 'react'
import { AIChatWidget, type Message, type Conversation } from 'ltb-components/chat'
import 'ltb-components/styles.css'

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentId, setCurrentId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = async (content: string, attachments?: File[]) => {
    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    // Llamar a tu API de IA aqui
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: content }),
    })
    const data = await response.json()

    // Agregar respuesta del asistente
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: data.response,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, assistantMessage])
  }

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: 'Nuevo chat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations(prev => [newConv, ...prev])
    setCurrentId(newConv.id)
    setMessages([])
  }

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id))
    if (currentId === id) {
      setCurrentId(undefined)
      setMessages([])
    }
  }

  return (
    <div className="h-screen">
      <AIChatWidget
        conversations={conversations}
        currentConversationId={currentId}
        messages={messages}
        onSendMessage={handleSendMessage}
        onNewConversation={handleNewConversation}
        onSelectConversation={setCurrentId}
        onDeleteConversation={handleDeleteConversation}
        maxAttachments={3}
      />
    </div>
  )
}`}</code></pre>
        </div>
      </section>

      {/* TypeScript */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">TypeScript</h2>
        <p className="text-muted-foreground">
          LTB Components exporta todos los tipos necesarios:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`import type {
  Message,
  Conversation,
  Attachment,
  AIChatWidgetProps,
  ChatClassNames,
} from 'ltb-components/chat'`}</code></pre>
        </div>
      </section>

      {/* Siguientes pasos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Siguientes pasos</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Explora la <a href="/docs/components/chat" className="text-primary hover:underline">API del componente Chat</a></li>
          <li>Aprende sobre las <a href="/docs/components/chat#personalizacion" className="text-primary hover:underline">opciones de personalizacion</a></li>
          <li>Revisa el <a href="/docs/changelog" className="text-primary hover:underline">historial de cambios</a> para actualizaciones</li>
        </ul>
      </section>
    </div>
  )
}
