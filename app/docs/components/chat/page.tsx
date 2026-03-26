'use client'

import { useState } from 'react'
import { AIChatWidget, type Message, type Conversation } from '@/packages/ui/src/chat'
import '@/packages/ui/src/styles.css'

// Demo data
const demoConversations: Conversation[] = [
  {
    id: '1',
    title: 'Project ideas',
    preview: 'Can you help me brainstorm...',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Code review',
    preview: 'Please review this function...',
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(Date.now() - 86400000),
  },
]

const demoMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Hello! Can you help me with a React component?',
    createdAt: new Date(Date.now() - 60000),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Of course! I would be happy to help you with your React component. What would you like to build?',
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

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `This is a demo response to: "${content}"`,
        createdAt: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
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
      />
    </div>
  )
}

export default function ChatDocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Chat Component</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          A complete AI chat interface with conversation sidebar, message list, and input with file attachments.
        </p>
      </div>

      {/* Interactive Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Demo</h2>
        <p className="text-muted-foreground">
          Try the chat component below. Send messages, create new conversations, and explore the interface.
        </p>
        <ChatDemo />
      </section>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`// Full widget
import { AIChatWidget } from 'ltb-components/chat'

// Individual components
import {
  ChatMessage,
  ChatMessageList,
  ChatInput,
  ChatSidebar,
  ChatHeader,
} from 'ltb-components/chat'

// Don't forget styles
import 'ltb-components/styles.css'`}</code></pre>
        </div>
      </section>

      {/* Props Reference */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Props Reference</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-4 text-left font-medium">Prop</th>
                <th className="py-3 px-4 text-left font-medium">Type</th>
                <th className="py-3 px-4 text-left font-medium">Default</th>
                <th className="py-3 px-4 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="py-3 px-4 font-mono text-xs">conversations</td>
                <td className="py-3 px-4 font-mono text-xs">Conversation[]</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">List of all conversations</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">currentConversationId</td>
                <td className="py-3 px-4 font-mono text-xs">string</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">ID of the active conversation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">messages</td>
                <td className="py-3 px-4 font-mono text-xs">Message[]</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Messages for current conversation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onSendMessage</td>
                <td className="py-3 px-4 font-mono text-xs">(content, files?) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Called when user sends a message</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onNewConversation</td>
                <td className="py-3 px-4 font-mono text-xs">() =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Called when user creates new conversation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">onSelectConversation</td>
                <td className="py-3 px-4 font-mono text-xs">(id) =&gt; void</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Called when user selects a conversation</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">showSidebar</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">true</td>
                <td className="py-3 px-4 text-muted-foreground">Show/hide the sidebar</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">isLoading</td>
                <td className="py-3 px-4 font-mono text-xs">boolean</td>
                <td className="py-3 px-4">false</td>
                <td className="py-3 px-4 text-muted-foreground">Show loading state</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono text-xs">classNames</td>
                <td className="py-3 px-4 font-mono text-xs">ChatClassNames</td>
                <td className="py-3 px-4">-</td>
                <td className="py-3 px-4 text-muted-foreground">Custom class names for parts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Types</h2>
        
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

      {/* Customization */}
      <section id="customization" className="space-y-4">
        <h2 className="text-2xl font-semibold">Customization</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">CSS Variables</h3>
            <p className="text-muted-foreground mb-3">
              Override these CSS variables to customize the appearance:
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`:root {
  /* Colors */
  --ltb-primary: #0f172a;
  --ltb-user-message-bg: #0f172a;
  --ltb-user-message-text: #ffffff;
  --ltb-assistant-message-bg: #f1f5f9;
  --ltb-assistant-message-text: #0f172a;
  
  /* Sidebar */
  --ltb-sidebar-bg: #f8fafc;
  --ltb-sidebar-active: #e2e8f0;
  
  /* Border radius */
  --ltb-radius: 0.5rem;
}`}</code></pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Class Names</h3>
            <p className="text-muted-foreground mb-3">
              Use the classNames prop to override specific parts:
            </p>
            <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
              <pre className="text-sm"><code>{`<AIChatWidget
  classNames={{
    container: 'my-custom-container',
    sidebar: 'my-sidebar',
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

      {/* Modular Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Modular Usage</h2>
        <p className="text-muted-foreground">
          For custom layouts, use individual components:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`import {
  ChatSidebar,
  ChatHeader,
  ChatMessageList,
  ChatInput,
} from 'ltb-components/chat'

export default function CustomChat() {
  return (
    <div className="flex h-screen">
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentId}
        onNewConversation={handleNew}
        onSelectConversation={handleSelect}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader title="My Custom Chat" />
        <ChatMessageList messages={messages} />
        <ChatInput onSendMessage={handleSend} />
      </div>
    </div>
  )
}`}</code></pre>
        </div>
      </section>
    </div>
  )
}
