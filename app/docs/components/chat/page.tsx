'use client'

import { useState } from 'react'
import { AIChatWidget, type Message, type Conversation } from '@/packages/ui/src/chat'
import '@/packages/ui/src/styles.css'

// Datos de demo
const demoConversations: Conversation[] = [
  {
    id: '1',
    title: 'Ideas de proyecto',
    preview: 'Puedes ayudarme a generar...',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Revision de codigo',
    preview: 'Por favor revisa esta funcion...',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
]

const demoMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hola! Puedes ayudarme con un componente React?',
    createdAt: new Date(Date.now() - 60000),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Por supuesto! Estare encantado de ayudarte con tu componente React. Que te gustaria construir?',
    createdAt: new Date(Date.now() - 30000),
  },
]

function ChatDemo() {
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations)
  const [currentId, setCurrentId] = useState<string>('1')
  const [messages, setMessages] = useState<Message[]>(demoMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Simular respuesta de IA
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Esta es una respuesta de demo a: "${content}"`,
        createdAt: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
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

  return (
    <div className="h-[500px] rounded-lg border border-border overflow-hidden">
      <AIChatWidget
        conversations={conversations}
        currentConversationId={currentId}
        messages={messages}
        onSendMessage={handleSendMessage}
        onNewConversation={handleNewConversation}
        onSelectConversation={setCurrentId}
        onDeleteConversation={(id) => setConversations(prev => prev.filter(c => c.id !== id))}
        isLoading={isLoading}
        maxAttachments={2}
      />
    </div>
  )
}

export default function ChatDocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Componente Chat</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Una interfaz completa de chat con IA con sidebar de conversaciones, lista de mensajes e input con adjuntos.
        </p>
      </div>

      {/* Demo interactiva */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Demo interactiva</h2>
        <p className="text-muted-foreground">
          Prueba el componente de chat a continuacion. Envia mensajes, crea nuevas conversaciones y explora la interfaz.
        </p>
        <ChatDemo />
      </section>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Importacion</h2>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`// Widget completo
import { AIChatWidget } from 'ltb-components/chat'

// Componentes individuales
import {
  ChatMessage,
  ChatMessageList,
  ChatInput,
  ChatSidebar,
  ChatHeader,
} from 'ltb-components/chat'

// No olvides los estilos
import 'ltb-components/styles.css'`}</code></pre>
        </div>
      </section>

      {/* Referencia de Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Referencia de Props</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Prop</th>
                <th className="py-3 px-4 text-left font-medium">Tipo</th>
                <th className="py-3 px-4 text-left font-medium">Por defecto</th>
                <th className="py-3 px-4 text-left font-medium">Descripcion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">conversations</td>
                <td className="py-3 px-4 font-mono text-xs">Conversation[]</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Lista de todas las conversaciones</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">currentConversationId</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">ID de la conversacion activa</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">messages</td>
                <td className="py-3 px-4 font-mono text-xs">Message[]</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Mensajes de la conversacion actual</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">maxAttachments</td>
                <td className="py-3 px-4 font-mono text-xs">number</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4 text-muted-foreground">Numero maximo de archivos adjuntos por mensaje</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onSendMessage</td>
                <td className="py-3 px-4 font-mono text-xs">(content, files?) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario envia un mensaje</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onNewConversation</td>
                <td className="py-3 px-4 font-mono text-xs">() =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario crea nueva conversacion</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onSelectConversation</td>
                <td className="py-3 px-4 font-mono text-xs">(id) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario selecciona una conversacion</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onDeleteConversation</td>
                <td className="py-3 px-4 font-mono text-xs">(id) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario elimina una conversacion (con confirmacion)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">deleteConfirmMessage</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">Mensaje por defecto</td>
                <td className="py-3 px-4 text-muted-foreground">Mensaje de confirmacion al eliminar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">showSidebar</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">true</td>
                <td className="py-3 px-4 text-muted-foreground">Mostrar/ocultar el sidebar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">isLoading</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">false</td>
                <td className="py-3 px-4 text-muted-foreground">Mostrar estado de carga</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">classNames</td>
                <td className="py-3 px-4 font-mono text-xs">ChatClassNames</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Clases CSS personalizadas por parte</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tipos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tipos</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Message</h3>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  attachments?: Attachment[]
  createdAt: Date
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Conversation</h3>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface Conversation {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  preview?: string
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Attachment</h3>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface Attachment {
  id: string
  name: string
  type: string
  url?: string
  size: number
}`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Personalizacion */}
      <section id="personalizacion" className="space-y-4">
        <h2 className="text-2xl font-semibold">Personalizacion</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Variables CSS</h3>
            <p className="text-muted-foreground mb-3">
              Sobrescribe estas variables CSS para personalizar la apariencia:
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`:root {
  /* Colores */
  --ltb-primary: #0f172a;
  --ltb-user-message-bg: #0f172a;
  --ltb-user-message-text: #ffffff;
  --ltb-assistant-message-bg: #f1f5f9;
  --ltb-assistant-message-text: #0f172a;
  
  /* Sidebar */
  --ltb-sidebar-bg: #f8fafc;
  --ltb-sidebar-active: #e2e8f0;
  
  /* Bordes redondeados */
  --ltb-radius: 0.5rem;
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Nombres de clase</h3>
            <p className="text-muted-foreground mb-3">
              Usa la prop classNames para sobrescribir partes especificas:
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`<AIChatWidget
  classNames={{
    container: 'mi-contenedor-personalizado',
    sidebar: 'mi-sidebar',
    userMessage: 'bg-blue-600 text-white',
    assistantMessage: 'bg-gray-100',
    input: 'rounded-full',
  }}
  {...props}
/>`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Uso modular */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Uso modular</h2>
        <p className="text-muted-foreground">
          Para layouts personalizados, usa los componentes individuales:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`import {
  ChatSidebar,
  ChatHeader,
  ChatMessageList,
  ChatInput,
} from 'ltb-components/chat'

export default function ChatPersonalizado() {
  return (
    <div className="flex h-screen">
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentId}
        onNewConversation={handleNew}
        onSelectConversation={handleSelect}
        onDeleteConversation={handleDelete}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader title="Mi Chat Personalizado" />
        <ChatMessageList messages={messages} />
        <ChatInput 
          onSendMessage={handleSend}
          maxAttachments={5}
        />
      </div>
    </div>
  )
}`}</code></pre>
        </div>
      </section>
    </div>
  )
}
