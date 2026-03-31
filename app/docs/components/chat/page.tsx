'use client'

import { useState } from 'react'
import { AIChatWidget, type Message, type Conversation, type ChatAction, type MessageAction } from '@/packages/ui/src/chat'
import '@/packages/ui/src/styles.css'

// Acciones de demo con grupos multinivel
const demoActions: ChatAction[] = [
  // Grupo: Evaluacion
  {
    id: 'benchmark',
    label: 'Benchmark',
    description: 'Analisis comparativo de mercado y competencia',
    icon: 'bar-chart',
    group: 'Evaluacion',
  },
  {
    id: 'icp',
    label: 'ICP',
    description: 'Define el perfil de cliente ideal',
    icon: 'user-check',
    group: 'Evaluacion',
  },
  // Grupo: Generacion
  {
    id: 'segmentacion-prospectos',
    label: 'Segmentacion prospectos',
    description: 'Segmenta y clasifica los prospectos objetivo',
    icon: 'users',
    group: 'Generacion',
  },
  {
    id: 'business-case',
    label: 'Business Case',
    description: 'Genera un caso de negocio completo',
    icon: 'briefcase',
    group: 'Generacion',
  },
]

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
  const [executingAction, setExecutingAction] = useState<ChatAction | null>(null)

  const handleSendMessage = async (content: string, _files?: File[], action?: MessageAction) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      action, // Incluir accion si existe
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

  // El consumidor recibe la accion y el ID de la conversacion activa.
  // Genera el contenido de la plantilla (llamada a API, etc.) y luego
  // lo envia como mensaje del sistema con la referencia a la accion.
  const handleExecuteAction = async (action: ChatAction, conversationId: string | undefined) => {
    setExecutingAction(action)
    
    // Simular generacion del contenido de la plantilla (en produccion: llamada a tu API)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // El texto generado por la plantilla
    const generatedContent = `**${action.label}:**\n\nContenido de la plantilla generado para la conversacion ${conversationId ?? 'sin ID'}.\n\nEn produccion, aqui iria el texto real producido por tu backend.`
    
    const messageAction: MessageAction = {
      actionId: action.id,
      label: action.label,
      content: generatedContent,
    }
    
    // El mensaje es de tipo 'action': solo muestra el badge, el contenido queda oculto (contexto para la IA)
    const actionMessage: Message = {
      id: crypto.randomUUID(),
      role: 'action',
      content: generatedContent,
      action: messageAction,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, actionMessage])
    setExecutingAction(null)
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
        actions={demoActions}
        executingAction={executingAction}
        onExecuteAction={handleExecuteAction}
        actionsButtonText="Agentes"
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
                <td className="py-3 px-4 font-mono text-xs">(content, files?, action?) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario envia un mensaje. Incluye archivos y accion opcional</td>
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
                <td className="py-3 px-4 font-mono text-xs">onRenameConversation</td>
                <td className="py-3 px-4 font-mono text-xs">(id, newTitle) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario renombra una conversacion</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">maxFileSize</td>
                <td className="py-3 px-4 font-mono text-xs">number</td>
                <td className="py-3 px-4">10</td>
                <td className="py-3 px-4 text-muted-foreground">Tamano maximo de archivo en MB</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">allowedFileTypes</td>
                <td className="py-3 px-4 font-mono text-xs">string[]</td>
                <td className="py-3 px-4">todos</td>
                <td className="py-3 px-4 text-muted-foreground">Tipos de archivo permitidos (ej: ['.pdf', 'image/*'])</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">showHeader</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">true</td>
                <td className="py-3 px-4 text-muted-foreground">Mostrar/ocultar el header</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">headerTitle</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Chat'</td>
                <td className="py-3 px-4 text-muted-foreground">Titulo del header</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">sidebarTitle</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Conversaciones'</td>
                <td className="py-3 px-4 text-muted-foreground">Titulo del sidebar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">placeholder</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Escribe un mensaje...'</td>
                <td className="py-3 px-4 text-muted-foreground">Placeholder del input</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">loadingText</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Pensando...'</td>
                <td className="py-3 px-4 text-muted-foreground">Texto mientras espera respuesta</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">emptyStateMessage</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Inicia una conversacion'</td>
                <td className="py-3 px-4 text-muted-foreground">Mensaje cuando no hay mensajes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">emptyStateHint</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Envia un mensaje para comenzar'</td>
                <td className="py-3 px-4 text-muted-foreground">Hint secundario en estado vacio</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">emptyConversationsMessage</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'No hay conversaciones'</td>
                <td className="py-3 px-4 text-muted-foreground">Mensaje cuando no hay conversaciones</td>
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
                <td className="py-3 px-4 font-mono text-xs">actions</td>
                <td className="py-3 px-4 font-mono text-xs">ChatAction[]</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Lista de acciones disponibles para inyectar contexto</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">executingAction</td>
                <td className="py-3 px-4 font-mono text-xs">ChatAction | null</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Accion en ejecucion (muestra loading)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onExecuteAction</td>
                <td className="py-3 px-4 font-mono text-xs">(action, conversationId) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama al seleccionar una accion. Recibe la accion y el ID de la conversacion activa</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">actionsButtonText</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">'Agentes'</td>
                <td className="py-3 px-4 text-muted-foreground">Texto del boton de agentes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">isLoading</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">false</td>
                <td className="py-3 px-4 text-muted-foreground">Mostrar estado de carga (esperando respuesta)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">disabled</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">false</td>
                <td className="py-3 px-4 text-muted-foreground">Deshabilitar el input del chat</td>
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
            <p className="text-muted-foreground mb-2">
              Representa un mensaje en la conversacion. Incluye soporte para adjuntos y acciones de plantilla.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface Message {
  id: string                              // Identificador unico del mensaje
  role: 'user' | 'assistant' | 'system'   // Rol del autor del mensaje
  content: string                         // Contenido del mensaje
  attachments?: Attachment[]              // Archivos adjuntos (opcional)
  action?: MessageAction                  // Plantilla ejecutada (opcional, muestra badge)
  createdAt: Date                         // Fecha de creacion
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

          <div>
            <h3 className="text-lg font-medium mb-2">ChatAction</h3>
            <p className="text-muted-foreground mb-2">
              Define una accion que puede inyectarse al chat como contexto.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface ChatAction {
  id: string           // Identificador unico
  label: string        // Nombre visible (ej: "Buyer Persona")
  description?: string // Descripcion en el menu
  icon?: string        // Icono Lucide (ej: "users", "bar-chart")
  group?: string       // Grupo/etapa al que pertenece. Si no se define, aparece en la raiz
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">MessageAction</h3>
            <p className="text-muted-foreground mb-2">
              Referencia a una accion ejecutada en un mensaje. Se muestra como badge pero contiene el contexto completo.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface MessageAction {
  actionId: string  // ID de la accion ejecutada
  label: string     // Label del badge visible
  content: string   // Contenido completo (enviado a la IA)
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
