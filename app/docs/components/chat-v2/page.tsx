'use client'

import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { Thread, ThreadList } from '@/components/assistant-ui'
import { ModelSelector } from '@/components/assistant-ui/model-selector'

function ChatV2Demo() {
  const runtime = useChatRuntime({
    api: '/api/chat',
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="space-y-4">
        <ModelSelector />
        <div className="grid h-[600px] grid-cols-[220px_1fr] gap-4 rounded-lg border border-border overflow-hidden bg-background">
          <div className="border-r border-border bg-muted/30 overflow-hidden">
            <ThreadList />
          </div>
          <div className="flex flex-col min-h-0">
            <Thread />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  )
}

export default function ChatV2DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Chat v2 - assistant-ui</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Interfaz de chat construida con la libreria de codigo abierto{' '}
          <a
            href="https://github.com/assistant-ui/assistant-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            assistant-ui
          </a>
          , integrada con AI SDK 6 de Vercel.
        </p>
      </div>

      {/* Demo interactiva */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Demo interactiva</h2>
        <p className="text-muted-foreground">
          Prueba el componente de chat a continuacion. Selecciona un proveedor de IA y escribe mensajes para recibir respuestas en tiempo real con streaming.
        </p>
        <ChatV2Demo />
      </section>

      {/* Caracteristicas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Caracteristicas</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-medium">Streaming en tiempo real</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Las respuestas se muestran caracter por caracter mientras se generan.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-medium">Auto-scroll inteligente</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Desplazamiento automatico al nuevo contenido con boton para volver al final.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-medium">Copiar y regenerar</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Copia mensajes al portapapeles o regenera respuestas facilmente.
            </p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <h3 className="font-medium">Accesibilidad</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Soporte completo para lectores de pantalla y navegacion por teclado.
            </p>
          </div>
        </div>
      </section>

      {/* Instalacion */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Instalacion</h2>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`npm install @assistant-ui/react @assistant-ui/react-ai-sdk ai @ai-sdk/react`}</code></pre>
        </div>
      </section>

      {/* Variables de entorno */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variables de entorno</h2>
        <p className="text-muted-foreground">
          Configura las siguientes variables de entorno en tu archivo <code className="rounded bg-muted px-1.5 py-0.5 text-sm">.env.local</code>:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`# Seleccion de proveedor de IA
# Opciones: openai, anthropic, google, grok, groq, fireworks
AI_PROVIDER=openai

# Modelo especifico (opcional - sobrescribe AI_PROVIDER)
# AI_MODEL=openai/gpt-4o

# API Keys segun proveedor seleccionado
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# ANTHROPIC_API_KEY=your_anthropic_key
# XAI_API_KEY=your_xai_key
# GROQ_API_KEY=your_groq_key`}</code></pre>
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
                <td className="py-3 px-4 text-muted-foreground">Proveedor a usar: openai, anthropic, google, grok, groq, fireworks</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">AI_MODEL</td>
                <td className="py-3 px-4 text-muted-foreground">Modelo especifico (ej: openai/gpt-4o). Sobrescribe AI_PROVIDER</td>
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
      </section>

      {/* Uso basico */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Uso basico</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Crear el API Route</h3>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`// app/api/chat/route.ts
import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">2. Crear el componente de chat</h3>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`'use client'

import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { Thread } from '@/components/assistant-ui/thread'

export function Chat() {
  const runtime = useChatRuntime({
    api: '/api/chat',
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-full">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  )
}`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* Arquitectura */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Arquitectura</h2>
        <p className="text-muted-foreground">
          assistant-ui sigue el patron de primitivos composables, similar a Radix UI:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Componente</th>
                <th className="py-3 px-4 text-left font-medium">Descripcion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">Thread</td>
                <td className="py-3 px-4 text-muted-foreground">Contenedor principal con mensajes, composer y auto-scroll</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">Composer</td>
                <td className="py-3 px-4 text-muted-foreground">Campo de entrada con botones de enviar/cancelar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">UserMessage</td>
                <td className="py-3 px-4 text-muted-foreground">Renderiza mensajes del usuario</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">AssistantMessage</td>
                <td className="py-3 px-4 text-muted-foreground">Renderiza respuestas del asistente con acciones</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">ThreadList</td>
                <td className="py-3 px-4 text-muted-foreground">Lista de conversaciones con navegacion</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">ThreadWelcome</td>
                <td className="py-3 px-4 text-muted-foreground">Pantalla de bienvenida cuando no hay mensajes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Proveedores soportados */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Proveedores de IA soportados</h2>
        <p className="text-muted-foreground">
          Gracias al Vercel AI Gateway, puedes usar multiples proveedores sin configuracion adicional:
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            'OpenAI (GPT-4, GPT-4o)',
            'Anthropic (Claude)',
            'Google (Gemini)',
            'AWS Bedrock',
            'Azure OpenAI',
            'Fireworks AI',
          ].map((provider) => (
            <div key={provider} className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm">
              {provider}
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Recursos</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/assistant-ui/assistant-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            GitHub Repository
          </a>
          <a
            href="https://www.assistant-ui.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Documentacion oficial
          </a>
          <a
            href="https://sdk.vercel.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Vercel AI SDK
          </a>
        </div>
      </section>
    </div>
  )
}
