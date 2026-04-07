# Chat v2 con assistant-ui

Este directorio contiene la implementación de un componente de chat moderno usando la librería de código abierto **assistant-ui** integrada con **AI SDK 6** de Vercel.

## Características

- ✅ Interfaz de chat moderna y responsive
- ✅ Streaming de respuestas en tiempo real
- ✅ Soporte para múltiples proveedores de IA (OpenAI, Anthropic, Google, etc.)
- ✅ Componentes reutilizables basados en assistant-ui
- ✅ Gestor de threads para múltiples conversaciones
- ✅ Estilos personalizables con Tailwind CSS

## Estructura

```
app/
├── api/
│   └── chat/
│       └── route.ts              # API endpoint para procesar mensajes
├── docs/components/chat-v2/
│   └── page.tsx                  # Página principal del demo
components/
└── assistant-ui/
    ├── thread.tsx                # Contenedor principal del chat
    ├── composer.tsx              # Componente de entrada de mensajes
    ├── thread-list.tsx           # Listado de conversaciones
    ├── thread-welcome.tsx        # Pantalla de bienvenida
    ├── user-message.tsx          # Componente de mensaje del usuario
    ├── assistant-message.tsx     # Componente de mensaje del asistente
    └── index.ts                  # Exports del módulo
```

## Configuración

### 1. Variables de Entorno

Copia el archivo `.env.example` a `.env.local` y añade tu API key:

```bash
cp .env.example .env.local
```

Luego edita `.env.local` con tu clave de OpenAI:

```env
OPENAI_API_KEY=sk_your_api_key_here
```

### 2. Instalación de Dependencias

Las dependencias requeridas son:

- `@assistant-ui/react` - Componentes UI principales
- `@assistant-ui/react-ai-sdk` - Integración con AI SDK
- `ai` - AI SDK 6 de Vercel
- `lucide-react` - Iconos

```bash
npm install @assistant-ui/react @assistant-ui/react-ai-sdk ai lucide-react
```

## Uso

### Importar Componentes

```tsx
import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { Thread, Composer } from '@/components/assistant-ui'

function ChatApp() {
  const runtime = useChatRuntime({
    api: '/api/chat',
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <Thread />
      <Composer />
    </AssistantRuntimeProvider>
  )
}
```

### Personalizar el Comportamiento

#### Cambiar el Modelo de IA

Edita `/app/api/chat/route.ts`:

```ts
const result = streamText({
  model: 'openai/gpt-4',  // Cambia aquí
  system: 'You are a helpful assistant...',
  messages: await convertToModelMessages(messages),
})
```

#### Agregar Instrucciones del Sistema

```ts
const result = streamText({
  model: 'openai/gpt-4o-mini',
  system: 'You are an expert in Spanish language and culture. Always respond in Spanish.',
  messages: await convertToModelMessages(messages),
})
```

## Componentes Disponibles

### `<Thread />`
Contenedor principal que renderiza la lista de mensajes y maneja el estado de la conversación.

### `<Composer />`
Componente de entrada que permite al usuario escribir y enviar mensajes.

### `<ThreadList />`
Barra lateral con el listado de conversaciones anteriores.

### `<ThreadWelcome />`
Pantalla de bienvenida mostrada cuando no hay mensajes en la conversación.

### `<UserMessage />`
Componente para renderizar mensajes del usuario.

### `<AssistantMessage />`
Componente para renderizar mensajes del asistente con soporte para streaming.

## Ejemplo Completo

Ver la implementación completa en `/app/docs/components/chat-v2/page.tsx`

```tsx
'use client'

import { AssistantRuntimeProvider } from '@assistant-ui/react'
import { useChatRuntime } from '@assistant-ui/react-ai-sdk'
import { Thread, ThreadList } from '@/components/assistant-ui'

function ChatV2Demo() {
  const runtime = useChatRuntime({
    api: '/api/chat',
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-[600px] grid-cols-[220px_1fr] gap-4 rounded-lg border border-border overflow-hidden">
        <div className="border-r border-border bg-muted/30">
          <ThreadList />
        </div>
        <div className="flex flex-col">
          <Thread />
        </div>
      </div>
    </AssistantRuntimeProvider>
  )
}
```

## Recursos

- [assistant-ui GitHub](https://github.com/assistant-ui/assistant-ui)
- [Documentación assistant-ui](https://www.assistant-ui.com/docs)
- [AI SDK 6 Vercel](https://sdk.vercel.ai)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## Solución de Problemas

### Error: "OPENAI_API_KEY is not set"
Asegúrate de que has configurado correctamente tu variable de entorno en `.env.local`.

### Error: "Failed to fetch from API"
Verifica que el endpoint `/api/chat` esté correctamente deployado y que puedas acceder a él desde el navegador.

### Mensajes no se envían
Comprueba que tu API key tiene permisos suficientes y que tu cuenta OpenAI tiene créditos disponibles.
