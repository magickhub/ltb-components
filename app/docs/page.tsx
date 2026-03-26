import Link from 'next/link'
import { ArrowRight, Package, Palette, Zap } from 'lucide-react'

export const metadata = {
  title: 'Documentacion - LTB Components',
  description: 'Documentacion de la libreria LTB Components',
}

export default function DocsPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">LTB Components</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Una libreria de componentes React construida sobre shadcn/ui con widgets de chat de IA personalizables.
          Instala via Git y usa en cualquier proyecto React.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <Package className="h-10 w-10 text-primary" />
          <h3 className="mt-4 font-semibold">Instalacion sencilla</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Instala directamente desde GitHub con npm o yarn. No requiere configuracion de registro.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <Palette className="h-10 w-10 text-primary" />
          <h3 className="mt-4 font-semibold">Totalmente personalizable</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Sobrescribe estilos con variables CSS o la prop classNames. Adapta a tu marca perfectamente.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <Zap className="h-10 w-10 text-primary" />
          <h3 className="mt-4 font-semibold">TypeScript nativo</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Definiciones de tipos completas para todos los componentes. Autocompletado y seguridad de tipos.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Inicio rapido</h2>
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm">
            npm install github:magickhub/ltb-components
          </code>
        </div>
        <p className="text-muted-foreground">
          Luego importa y usa los componentes en tu app React:
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
      onNewConversation={() => console.log('nueva')}
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
          Comenzar
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/docs/components/chat"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Ver componentes
        </Link>
      </div>
    </div>
  )
}
