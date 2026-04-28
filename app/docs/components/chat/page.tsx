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
  {
    id: '3',
    role: 'assistant',
    type: 'html',
    content: `
      <style>
        .demo-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 20px;
          color: white;
          font-family: system-ui;
        }
        .demo-card h3 { margin: 0 0 8px; font-size: 18px; }
        .demo-card p { margin: 0; opacity: 0.9; font-size: 14px; }
        .demo-card button {
          margin-top: 12px;
          background: white;
          color: #667eea;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        .demo-card button:hover { opacity: 0.9; }
      </style>
      <div class="demo-card">
        <h3>Componente HTML Aislado</h3>
        <p>Este contenido tiene sus propios estilos y scripts sin afectar la pagina principal.</p>
        <button onclick="alert('Script ejecutado desde el iframe!')">Probar Script</button>
      </div>
    `,
    createdAt: new Date(Date.now() - 15000),
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
    
    // El mensaje es del sistema, contiene el contenido generado y muestra el badge de la plantilla
    const systemMessage: Message = {
      id: crypto.randomUUID(),
      role: 'system',
      content: generatedContent,
      action: messageAction,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, systemMessage])
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

      {/* Demo de HTML Action Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">HTML Action Card</h2>
        <p className="text-muted-foreground">
          Muestra acciones asociadas a mensajes HTML con múltiples opciones de personalización. Haz clic en cualquier botón "Abrir" para ver el evento en acción.
        </p>
        <div className="rounded-lg border border-border overflow-hidden bg-background">
          <iframe
            src="/docs/components/chat/html-action-card-showcase"
            className="w-full h-[600px] border-0"
            title="HTML Action Card Showcase"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Ver demo completa en <a href="/docs/components/chat/html-action-card-showcase" className="text-blue-500 hover:underline">página dedicada</a>
        </p>
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
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onMessageActionClicked</td>
                <td className="py-3 px-4 font-mono text-xs">(message, action) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Se llama cuando el usuario hace clic en una acción de mensaje HTML</td>
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
              Representa un mensaje en la conversacion. Incluye soporte para adjuntos, acciones de plantilla y renderizado HTML aislado.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`type MessageType = 'text' | 'html'

interface Message {
  id: string                              // Identificador unico del mensaje
  role: 'user' | 'assistant' | 'system'   // Rol del autor del mensaje
  content: string                         // Contenido del mensaje
  type?: MessageType                      // 'text' (defecto) o 'html' para renderizado aislado
  attachments?: Attachment[]              // Archivos adjuntos (opcional)
  action?: MessageAction                  // Plantilla ejecutada (opcional, muestra badge)
  htmlAction?: HtmlMessageAction          // Accion para mensaje HTML (muestra tarjeta)
  createdAt: Date                         // Fecha de creacion
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Mensajes HTML Aislados</h3>
            <p className="text-muted-foreground mb-2">
              Cuando un mensaje tiene <code className="bg-muted px-1 rounded">type: &apos;html&apos;</code>, se renderiza en un iframe aislado que permite ejecutar estilos y scripts propios sin afectar el contenido externo.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`// Ejemplo de mensaje HTML con estilos y scripts propios
const htmlMessage: Message = {
  id: '1',
  role: 'assistant',
  type: 'html',  // Activa el renderizado HTML aislado
  content: \`
    <style>
      .card { background: #3b82f6; color: white; padding: 16px; border-radius: 8px; }
    </style>
    <div class="card">
      <h3>Contenido HTML Aislado</h3>
      <button onclick="alert('Funciona!')">Click me</button>
    </div>
  \`,
  createdAt: new Date(),
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">HTML Action Card</h3>
            <p className="text-muted-foreground mb-2">
              Cuando un mensaje HTML tiene <code className="bg-muted px-1 rounded">htmlAction</code>, se muestra una tarjeta interactiva en lugar del contenido HTML. Perfecta para descargas, enlaces, o acciones ejecutables.
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`interface HtmlMessageAction {
  id: string                  // Identificador único para el handler
  title: string               // Título de la acción
  subtitle?: string           // Descripción (formato, tamaño, ubicación)
  icon?: string               // Icono de Lucide (por defecto: 'Code2')
}

// Ejemplo: Mensaje con acción para descargar código
const actionMessage: Message = {
  id: '2',
  role: 'assistant',
  type: 'html',
  content: 'Aquí generé el código que pediste',
  htmlAction: {
    id: 'download-code',
    title: 'Método ltb increnta',
    subtitle: 'Código · HTML',
    icon: 'Code2',
  },
  createdAt: new Date(),
}

// Escuchar el evento en el widget
<AIChatWidget
  messages={messages}
  onMessageActionClicked={(message, action) => {
    console.log(\`Usuario hizo clic en: \${action.title}\`)
    // Tu lógica aquí
  }}
/>`}</code></pre>
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
