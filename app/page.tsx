'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Github, Package, Palette, Code, Book, MessageSquare } from 'lucide-react'
import { AIChatWidget, type Message, type Conversation } from '@/packages/ui/src/chat'
import '@/packages/ui/src/styles.css'

// Demo data
const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'Welcome conversation',
    preview: 'Hello! How can I help you today?',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hello! I am a demo AI assistant. This is the LTB Components chat widget in action. Try sending a message or creating a new conversation!',
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

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That is a great question! This chat widget is fully customizable via CSS variables and the classNames prop.',
        'You can install this component library via GitHub and use it in any React project.',
        'The sidebar shows your conversations grouped by date. Try creating a new one!',
        'File attachments are supported too - click the paperclip icon to attach files.',
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
      title: `New Chat ${conversations.length + 1}`,
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
        headerTitle="LTB Chat Demo"
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
              Documentation
            </Link>
            <Link href="/docs/components/chat" className="text-sm text-muted-foreground hover:text-foreground">
              Components
            </Link>
            <Link href="/docs/changelog" className="text-sm text-muted-foreground hover:text-foreground">
              Changelog
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
            Version 1.0.0 Released
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-balance">
            Beautiful React Components
            <br />
            <span className="text-muted-foreground">for AI Chat Interfaces</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A React component library built on shadcn/ui. Fully customizable AI chat widget
            with conversation management, file attachments, and dark mode support.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/components/chat"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium hover:bg-muted"
            >
              <Book className="h-4 w-4" />
              View Docs
            </Link>
          </div>
        </div>

        {/* Install command */}
        <div className="mx-auto mt-12 max-w-xl">
          <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
            <code className="text-sm">npm install github:your-username/ltb-components</code>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8">
              <Package className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold">Easy Installation</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Install directly from GitHub with npm, yarn, or pnpm. No registry setup required.
                Pin specific versions for production stability.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <Palette className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold">Fully Customizable</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Override styles with CSS variables or classNames prop. Built-in dark mode.
                Match your brand perfectly.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <Code className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold">TypeScript First</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Full type definitions for all components. Get autocomplete and catch errors at build time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Try It Live</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Interactive demo of the AIChatWidget component
            </p>
          </div>
          <LiveDemo />
        </div>
      </section>

      {/* Code Example */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Simple Integration</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                The component is designed to be easy to use while giving you full control
                over the data flow and business logic.
              </p>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">1</span>
                  <span className="text-muted-foreground">Install the package from GitHub</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">2</span>
                  <span className="text-muted-foreground">Import the component and styles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">3</span>
                  <span className="text-muted-foreground">Connect your state and callbacks</span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
              <pre className="text-sm"><code>{`import { AIChatWidget } from 'ltb-components/chat'
import 'ltb-components/styles.css'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  
  const handleSend = async (content) => {
    // Add user message
    setMessages(prev => [...prev, {
      id: crypto.randomUUID(),
      role: 'user',
      content,
    }])
    
    // Call your AI API
    const response = await yourAIService(content)
    
    // Add response
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
          <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check out the documentation for installation instructions and API reference.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Read the Docs
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
              Built with shadcn/ui and React
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
