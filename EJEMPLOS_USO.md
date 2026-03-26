# Ejemplos de Uso - ltb-components v1.0.0

Ejemplos prácticos de cómo usar ltb-components en tu proyecto React externo.

## 1. Instalación en tu proyecto

```bash
npm install github:magickhub/ltb-components#v1.0.0
```

## 2. Widget Completo de Chat IA

```tsx
'use client'; // Si usas Next.js con App Router

import { useState } from 'react';
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    
    // Aquí puedes conectar tu API de IA
    // Por ejemplo: llamar a OpenAI, Claude, etc.
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nueva conversación',
      timestamp: new Date(),
    };
    
    setConversations([newConversation, ...conversations]);
    setCurrentConversationId(newConversation.id);
    setMessages([]);
  };

  return (
    <div className="h-screen">
      <AIChatWidget
        conversations={conversations}
        messages={messages}
        currentConversationId={currentConversationId}
        onSendMessage={handleSendMessage}
        onNewConversation={handleNewConversation}
        onSelectConversation={setCurrentConversationId}
      />
    </div>
  );
}
```

## 3. Usar Componentes Individuales (Layout Personalizado)

```tsx
import { 
  ChatMessage, 
  ChatMessageList, 
  ChatInput, 
  ChatSidebar,
  ChatHeader 
} from 'ltb-components/chat';
import 'ltb-components/styles.css';

export default function CustomChatLayout() {
  return (
    <div className="flex h-screen gap-4">
      {/* Barra lateral */}
      <ChatSidebar 
        conversations={[]}
        onSelectConversation={(id) => console.log(id)}
        onNewConversation={() => console.log('New conversation')}
      />

      {/* Área principal del chat */}
      <div className="flex-1 flex flex-col">
        <ChatHeader 
          title="Mi Chat IA"
          showSidebarToggle={false}
        />
        
        <ChatMessageList messages={[]}/>
        
        <ChatInput 
          onSendMessage={(msg) => console.log(msg)}
          placeholder="Escribe tu pregunta..."
        />
      </div>
    </div>
  );
}
```

## 4. Mensajes Individuales

```tsx
import { ChatMessage } from 'ltb-components/chat';
import 'ltb-components/styles.css';

export default function MessageExample() {
  return (
    <div className="p-4 space-y-4">
      {/* Mensaje del usuario */}
      <ChatMessage
        role="user"
        content="Hola, ¿cuál es la capital de Francia?"
        timestamp={new Date()}
      />

      {/* Mensaje del asistente */}
      <ChatMessage
        role="assistant"
        content="La capital de Francia es París."
        timestamp={new Date()}
        isLoading={false}
      />

      {/* Mensaje de sistema */}
      <ChatMessage
        role="system"
        content="La conversación fue completada exitosamente."
        timestamp={new Date()}
      />
    </div>
  );
}
```

## 5. Con Next.js y API Routes

```tsx
// app/chat/page.tsx
'use client';

import { useState } from 'react';
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { id: Date.now(), role: 'user', content: message },
        { id: Date.now() + 1, role: 'assistant', content: data.reply },
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AIChatWidget
      conversations={conversations}
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  );
}
```

```typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();

  // Aquí integras con tu proveedor de IA
  // Ejemplo con OpenAI:
  /*
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    }),
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  */

  return Response.json({ reply: 'Respuesta de tu IA aquí' });
}
```

## 6. Personalización de Estilos

```tsx
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';

export default function StyledChat() {
  return (
    <div className="bg-slate-900">
      <style>{`
        :root {
          --ltb-primary: #3b82f6;
          --ltb-background: #1e293b;
          --ltb-foreground: #f1f5f9;
          --ltb-border: #334155;
          --ltb-radius: 12px;
        }
      `}</style>
      
      <AIChatWidget
        conversations={[]}
        messages={[]}
        className="dark"
      />
    </div>
  );
}
```

## 7. Usar Hooks Disponibles

```tsx
import { 
  useAutoScroll, 
  useFileAttachments, 
  useAutoResize 
} from 'ltb-components/chat';

export default function HooksExample() {
  const messagesRef = useAutoScroll();
  const { attachments, addAttachment } = useFileAttachments();
  const textareaRef = useAutoResize();

  return (
    <div>
      <div ref={messagesRef} className="overflow-y-auto">
        {/* Messages */}
      </div>
      
      <textarea ref={textareaRef} />
      
      <input 
        type="file" 
        onChange={(e) => addAttachment(e.target.files?.[0])} 
      />
    </div>
  );
}
```

## Integración con Servicios de IA

### OpenAI / Claude

```tsx
const handleSendMessage = async (message: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [...messages, { role: 'user', content: message }],
    }),
  });

  const data = await response.json();
  // Procesa la respuesta
};
```

### Vercel AI SDK

```tsx
import { useChat } from 'ai/react';
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';

export default function ChatWithVercelAI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <AIChatWidget
      messages={messages}
      onSendMessage={(msg) => handleSubmit({ message: msg })}
    />
  );
}
```

## Troubleshooting

### Estilos no se aplican
```tsx
// Asegúrate de importar los estilos
import 'ltb-components/styles.css';
```

### TypeScript errors
```tsx
// Asegúrate de que tienes las types instaladas
import type { Message, Conversation } from 'ltb-components/chat';
```

### Dark mode no funciona
```tsx
// Añade la clase 'dark' al elemento padre
<div className="dark">
  <AIChatWidget {...props} />
</div>
```

## Más Información

- Documentación completa: https://github.com/magickhub/ltb-components
- Issues: https://github.com/magickhub/ltb-components/issues
- Changelog: https://github.com/magickhub/ltb-components/blob/main/CHANGELOG.md
