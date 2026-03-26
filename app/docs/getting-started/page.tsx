export const metadata = {
  title: 'Getting Started - LTB Components',
  description: 'How to install and configure LTB Components in your project',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Learn how to install and configure LTB Components in your React project.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Install LTB Components directly from GitHub using your preferred package manager:
        </p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">npm</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">npm install github:your-username/ltb-components</code>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">yarn</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">yarn add github:your-username/ltb-components</code>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium mb-2">pnpm</p>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <code className="text-sm">pnpm add github:your-username/ltb-components</code>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm">
            <strong>Pin a specific version:</strong> Add <code className="bg-muted px-1 rounded">#v1.0.0</code> at the end to lock to a specific version.
          </p>
        </div>
      </section>

      {/* Peer Dependencies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Peer Dependencies</h2>
        <p className="text-muted-foreground">
          LTB Components requires the following peer dependencies:
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

      {/* Setup Styles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Setup Styles</h2>
        <p className="text-muted-foreground">
          Import the component styles in your app entry point or layout:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`// In your app/layout.tsx or _app.tsx
import 'ltb-components/styles.css'`}</code></pre>
        </div>
        <p className="text-muted-foreground">
          The styles use CSS variables that you can customize in your own CSS:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`:root {
  --ltb-primary: #0f172a;
  --ltb-primary-hover: #1e293b;
  --ltb-user-message-bg: #3b82f6;
  --ltb-user-message-text: #ffffff;
  /* ... more variables */
}`}</code></pre>
        </div>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="text-muted-foreground">
          Here&apos;s a complete example of using the AIChatWidget component:
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
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, userMessage])

    // Call your AI API here
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: content }),
    })
    const data = await response.json()

    // Add assistant response
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
      title: 'New Chat',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setConversations(prev => [newConv, ...prev])
    setCurrentId(newConv.id)
    setMessages([])
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
          LTB Components exports all necessary types:
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

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Next Steps</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Explore the <a href="/docs/components/chat" className="text-primary hover:underline">Chat Component API</a></li>
          <li>Learn about <a href="/docs/components/chat#customization" className="text-primary hover:underline">customization options</a></li>
          <li>Check the <a href="/docs/changelog" className="text-primary hover:underline">changelog</a> for updates</li>
        </ul>
      </section>
    </div>
  )
}
