'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Github, Package, Palette, Code, Book, MessageSquare } from 'lucide-react'
import { AIChatWidget, type Message, type Conversation } from '@/packages/ui/src/chat'
import '@/packages/ui/src/styles.css'

// Datos de demo
const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'Conversacion de bienvenida',
    preview: 'Hola! Como puedo ayudarte hoy?',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hola! Soy un asistente de IA de demo. Este es el widget de chat de LTB Components en accion. Prueba a enviar un mensaje o crear una nueva conversacion!',
    createdAt: new Date(),
  },
]

function LiveDemo() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [currentId, setCurrentId] = useState<string>('1')
  const [messages, setMessages] = useState<Message[]>(initialMessages)
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
      const responses = [
        'Excelente pregunta! Este widget de chat es totalmente personalizable via variables CSS y la prop classNames.',
        'Puedes instalar esta libreria de componentes via GitHub y usarla en cualquier proyecto React.',
        'El sidebar muestra tus conversaciones agrupadas por fecha. Prueba a crear una nueva!',
        'Los archivos adjuntos tambien estan soportados - haz clic en el icono del clip para adjuntar archivos.',
      ]
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        createdAt: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleNewConversation = () => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: `Nuevo chat ${conversations.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations(prev => [newConv, ...prev])
    setCurrentId(newConv.id)
    setMessages([])
  }

  return (
    <div className="h-[600px] w-full rounded-xl border border-border shadow-2xl overflow-hidden">
      <AIChatWidget
        conversations={conversations}
        currentConversationId={currentId}
        messages={messages}
        onSendMessage={handleSendMessage}
        onNewConversation={handleNewConversation}
        onSelectConversation={(id) => {
          setCurrentId(id)
          if (id === '1') {
            setMessages(initialMessages)
          } else {
            setMessages([])
          }
        }}
        onDeleteConversation={(id) => {
          setConversations(prev => prev.filter(c => c.id !== id))
          if (id === currentId && conversations.length > 1) {
            const remaining = conversations.filter(c => c.id !== id)
            setCurrentId(remaining[0].id)
          }
        }}
        isLoading={isLoading}
        headerTitle="Demo de Chat LTB"
        maxAttachments={3}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-semibold">
            <MessageSquare className="h-6 w-6" />
            <span>LTB Components</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
              Documentacion
            </Link>
            <Link href="/docs/components/chat" className="text-sm text-muted-foreground hover:text-foreground">
              Componentes
            </Link>
            <Link href="/docs/changelog" className="text-sm text-muted-foreground hover:text-foreground">
              Historial
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
            >
              <Github className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Version 1.0.0 disponible
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-balance">
            Componentes React elegantes
            <br />
            <span className="text-muted-foreground">para interfaces de chat con IA</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Una libreria de componentes React construida sobre shadcn/ui. Widget de chat con IA totalmente personalizable
            con gestion de conversaciones, archivos adjuntos y soporte de modo oscuro.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Comenzar
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/components/chat"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium hover:bg-muted"
            >
              <Book className="h-4 w-4" />
              Ver documentacion
            </Link>
          </div>
        </div>

        {/* Comando de instalacion */}
        <div className="mx-auto mt-12 max-w-xl">
          <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
            <code className="text-sm">npm install github:magickhub/ltb-components</code>
          </div>
        </div>
      </section>

      {/* Caracteristicas */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8">
              <Package className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold">Instalacion sencilla</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Instala directamente desde GitHub con npm, yarn o pnpm. No requiere configuracion de registro.
                Fija versiones especificas para estabilidad en produccion.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <Palette className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold">Totalmente personalizable</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Sobrescribe estilos con variables CSS o la prop classNames. Modo oscuro integrado.
                Adapta a tu marca perfectamente.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <Code className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold">TypeScript nativo</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Definiciones de tipos completas para todos los componentes. Obten autocompletado y detecta errores en tiempo de build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo en vivo */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Pruebalo en vivo</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Demo interactiva del componente AIChatWidget
            </p>
          </div>
          <LiveDemo />
        </div>
      </section>

      {/* Ejemplo de codigo */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Integracion simple</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                El componente esta disenado para ser facil de usar mientras te da control total
                sobre el flujo de datos y la logica de negocio.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
                  <span className="text-muted-foreground">Instala el paquete desde GitHub</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
                  <span className="text-muted-foreground">Importa el componente y los estilos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
                  <span className="text-muted-foreground">Conecta tu estado y callbacks</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
              <pre className="text-sm"><code>{`import { AIChatWidget } from 'ltb-components/chat'
import 'ltb-components/styles.css'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  
  const handleSend = async (content) => {
    // Agregar mensaje del usuario
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }])
    
    // Llamar a tu API de IA
    const response = await tuServicioIA(content)
    
    // Agregar respuesta
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: response,
    }])
  }
  
  return (
    <AIChatWidget
      messages={messages}
      onSendMessage={handleSend}
      onDeleteConversation={handleDelete}
      maxAttachments={3}
      {...otherProps}
    />
  )
}`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Listo para empezar?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Consulta la documentacion para instrucciones de instalacion y referencia de la API.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Leer la documentacion
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>LTB Components</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Construido con shadcn/ui y React
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
