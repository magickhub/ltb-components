import Link from 'next/link'
import { ArrowRight, Package, Palette, Zap } from 'lucide-react'

export const metadata = {
  title: 'Documentation - LTB Components',
  description: 'Documentation for LTB Components library',
}

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">LTB Components</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          A React component library built on shadcn/ui with customizable AI chat widgets.
          Install via Git and use in any React project.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <Package className="h-10 w-10 text-primary" />
          <h3 className="mt-4 font-semibold">Easy Installation</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Install directly from GitHub with npm or yarn. No registry setup required.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <Palette className="h-10 w-10 text-primary" />
          <h3 className="mt-4 font-semibold">Fully Customizable</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Override styles with CSS variables or classNames prop. Match your brand perfectly.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <Zap className="h-10 w-10 text-primary" />
          <h3 className="mt-4 font-semibold">TypeScript First</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Full type definitions for all components. Get autocomplete and type safety.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Start</h2>
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm">
            npm install github:your-username/ltb-components
          </code>
        </div>
        <p className="text-muted-foreground">
          Then import and use the components in your React app:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto">
          <pre className="text-sm"><code>{`import { AIChatWidget } from 'ltb-components/chat'
import 'ltb-components/styles.css'

export default function ChatPage() {
  return (
    <AIChatWidget
      conversations={[]}
      messages={[]}
      onSendMessage={(msg) => console.log(msg)}
      onNewConversation={() => console.log('new')}
      onSelectConversation={(id) => console.log(id)}
    />
  )
}`}</code></pre>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/docs/components/chat"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          View Components
        </Link>
      </div>
    </div>
  )
}
