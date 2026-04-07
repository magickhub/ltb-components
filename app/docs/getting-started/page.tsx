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

      {/* Comparativa de versiones */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Versiones del Chat</h2>
        <p className="text-muted-foreground">
          LTB Components ofrece dos versiones del componente de chat:
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border p-4 space-y-2">
            <h3 className="font-semibold">Chat v1 - Custom</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Componente personalizado sin dependencias externas</li>
              <li>Sidebar de conversaciones integrado</li>
              <li>Sistema de acciones/agentes</li>
              <li>Soporte para adjuntos</li>
              <li>Tu manejas la logica de IA</li>
            </ul>
            <a href="/docs/components/chat-v1" className="text-sm text-primary hover:underline">Ver documentacion</a>
          </div>
          <div className="rounded-lg border border-primary/50 bg-primary/5 p-4 space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              Chat v2 - assistant-ui
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">Recomendado</span>
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Basado en assistant-ui (open source)</li>
              <li>Streaming en tiempo real</li>
              <li>Integracion con AI SDK 6</li>
              <li>Multiples proveedores de IA</li>
              <li>Auto-scroll inteligente</li>
            </ul>
            <a href="/docs/components/chat-v2" className="text-sm text-primary hover:underline">Ver documentacion</a>
          </div>
        </div>
      </section>

      {/* Instalacion del paquete */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Instalacion del paquete</h2>
        <p className="text-muted-foreground">
          Instala LTB Components directamente desde GitHub usando tu gestor de paquetes preferido:
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">npm</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">npm install github:magickhub/ltb-components#v1.1.0</code>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">yarn</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">yarn add github:magickhub/ltb-components#v1.1.0</code>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">pnpm</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">pnpm add github:magickhub/ltb-components#v1.1.0</code>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm">
            <strong>Usar otra version:</strong> Reemplaza <code className="bg-muted px-1 rounded">v1.1.0</code> con la version deseada (ej: <code className="bg-muted px-1 rounded">v1.0.0</code>). Omite la version para instalar desde <code className="bg-muted px-1 rounded">main</code>.
          </p>
        </div>
      </section>

      {/* Instalacion Chat v2 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Configuracion de Chat v2 (Recomendado)</h2>
        <p className="text-muted-foreground">
          Chat v2 con assistant-ui es la version recomendada. Instala las dependencias necesarias:
        </p>
        
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`npm install @assistant-ui/react @assistant-ui/react-ai-sdk ai @ai-sdk/react`}</code></pre>
        </div>

        <h3 className="text-lg font-medium mt-6">Variables de entorno</h3>
        <p className="text-muted-foreground">
          Configura las siguientes variables en tu archivo <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.env.local</code>:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`# Seleccion de proveedor de IA
# Opciones: openai, anthropic, google, grok, groq, fireworks
AI_PROVIDER=openai

# Modelo especifico (opcional)
# Si no incluye prefijo, se agrega automaticamente segun AI_PROVIDER
# Ejemplo: gpt-4o → openai/gpt-4o
AI_MODEL=gpt-4o-mini

# API Key del proveedor seleccionado
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}</code></pre>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Variable</th>
                <th className="py-3 px-4 text-left font-medium">Descripcion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">AI_PROVIDER</td>
                <td className="py-3 px-4 text-muted-foreground">openai, anthropic, google, grok, groq, fireworks</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">AI_MODEL</td>
                <td className="py-3 px-4 text-muted-foreground">Modelo a usar (ej: gpt-4o-mini, claude-sonnet-4-20250514)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">OPENAI_API_KEY</td>
                <td className="py-3 px-4 text-muted-foreground">API key de OpenAI</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">ANTHROPIC_API_KEY</td>
                <td className="py-3 px-4 text-muted-foreground">API key de Anthropic (Claude)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">XAI_API_KEY</td>
                <td className="py-3 px-4 text-muted-foreground">API key de xAI (Grok)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">GROQ_API_KEY</td>
                <td className="py-3 px-4 text-muted-foreground">API key de Groq</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mt-6">Modelos por defecto</h3>
        <p className="text-muted-foreground">
          Si no especificas <code className="rounded bg-muted px-1.5 py-0.5 text-sm">AI_MODEL</code>, se usa el modelo por defecto del proveedor:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Proveedor</th>
                <th className="py-3 px-4 text-left font-medium">Modelo por defecto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4">openai</td>
                <td className="py-3 px-4 font-mono text-xs">gpt-4o-mini</td>
              </tr>
              <tr>
                <td className="py-3 px-4">anthropic</td>
                <td className="py-3 px-4 font-mono text-xs">claude-sonnet-4-20250514</td>
              </tr>
              <tr>
                <td className="py-3 px-4">google</td>
                <td className="py-3 px-4 font-mono text-xs">gemini-2.0-flash</td>
              </tr>
              <tr>
                <td className="py-3 px-4">grok</td>
                <td className="py-3 px-4 font-mono text-xs">grok-3-mini-fast-latest</td>
              </tr>
              <tr>
                <td className="py-3 px-4">groq</td>
                <td className="py-3 px-4 font-mono text-xs">llama-3.3-70b-versatile</td>
              </tr>
              <tr>
                <td className="py-3 px-4">fireworks</td>
                <td className="py-3 px-4 font-mono text-xs">llama-v3p1-70b-instruct</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Instalacion Chat v1 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Chat v1 (Custom) - Alternativa</h2>
        <p className="text-muted-foreground">
          Si prefieres usar Chat v1 sin dependencias externas de IA, no necesitas configuracion adicional. Solo instala LTB Components (paso anterior).
        </p>
        <p className="text-muted-foreground">
          Chat v1 incluye todos los componentes visuales y logica, pero tu manejas la integracion con IA. Consulta la <a href="/docs/components/chat-v1" className="text-primary hover:underline">documentacion completa de Chat v1</a> para mas detalles.
        </p>
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
          <li>Explora la <a href="/docs/components/chat-v2" className="text-primary hover:underline">documentacion de Chat v2 (recomendado)</a></li>
          <li>O la <a href="/docs/components/chat-v1" className="text-primary hover:underline">API del componente Chat v1</a></li>
          <li>Revisa el <a href="/docs/changelog" className="text-primary hover:underline">historial de cambios</a> para actualizaciones</li>
        </ul>
      </section>
    </div>
  )
}
