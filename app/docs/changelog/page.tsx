export const metadata = {
  title: 'Historial - LTB Components',
  description: 'Historial de versiones y notas de lanzamiento de LTB Components',
}

const releases = [
  {
    version: '1.0.1',
    date: '2026-04-21',
    changes: {
      added: [
        'Tipo de mensaje HTML: renderizado HTML aislado en iframe',
        'MessageType enum: "text" (defecto) o "html"',
        'Auto-altura dinámica para iframes según contenido',
        'Sandbox seguro para scripts y estilos propios',
        'Soporte para widgets interactivos en mensajes',
        'Componente HtmlRenderer con MutationObserver para detectar cambios',
        'Ejemplos de IA generando contenido HTML (tablas, código, widgets)',
        'Documentación completa de mensajes HTML con browser support',
        'Demo component mostrando uso de mensajes HTML',
      ],
      documentation: [
        'Guía de mensajes HTML aislados (docs/HTML_MESSAGES.md)',
        'Ejemplos de respuestas de IA con contenido HTML',
        'Limitaciones y consideraciones de seguridad',
        'Casos de uso para renderizado HTML en mensajes',
      ],
    },
  },
  {
    version: '1.0.0',
    date: '2026-03-26',
    changes: {
      added: [
        'Lanzamiento inicial de LTB Components',
        'AIChatWidget: Interfaz completa de chat con IA',
        'Sidebar de conversaciones con agrupacion por fecha',
        'Lista de mensajes con estilos usuario/asistente/sistema',
        'Input con soporte de archivos adjuntos',
        'Header con toggle de sidebar',
        'Personalizacion completa via variables CSS',
        'Definiciones de tipos TypeScript',
        'Soporte de modo oscuro',
        'Componentes modulares: ChatMessage, ChatMessageList, ChatInput, ChatSidebar, ChatHeader',
        'Limite configurable de archivos adjuntos (maxAttachments)',
        'Confirmacion al eliminar conversaciones',
      ],
      documentation: [
        'Guia de primeros pasos',
        'Referencia de API de componentes',
        'Ejemplos de personalizacion',
        'Demos interactivas',
      ],
    },
  },
]

export default function ChangelogPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Historial de cambios</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Todos los cambios notables de LTB Components estan documentados aqui.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          Este proyecto sigue{' '}
          <a
            href="https://semver.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Versionado Semantico
          </a>
          . Los cambios que rompen compatibilidad solo ocurriran en actualizaciones de version mayor.
        </p>
      </div>

      <div className="space-y-12">
        {releases.map((release) => (
          <article key={release.version} className="space-y-6">
            <header className="flex items-baseline gap-4">
              <h2 className="text-2xl font-semibold">v{release.version}</h2>
              <time className="text-sm text-muted-foreground">{release.date}</time>
            </header>

            {release.changes.added && release.changes.added.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-emerald-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-100 text-xs">+</span>
                  Agregado
                </h3>
                <ul className="space-y-2">
                  {release.changes.added.map((item, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="text-emerald-500">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {release.changes.documentation && release.changes.documentation.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-blue-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-100 text-xs">D</span>
                  Documentacion
                </h3>
                <ul className="space-y-2">
                  {release.changes.documentation.map((item, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="text-blue-500">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">Politica de versionado</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-primary">Mayor (X.0.0)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Cambios que rompen compatibilidad y requieren actualizar codigo
            </p>
          </div>
          <div>
            <h3 className="font-medium text-primary">Menor (0.X.0)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Nuevas funcionalidades, compatibles hacia atras
            </p>
          </div>
          <div>
            <h3 className="font-medium text-primary">Parche (0.0.X)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Correccion de errores y mejoras menores
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Actualizar</h2>
        <p className="text-muted-foreground">
          Para actualizar a la ultima version:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm">npm update ltb-components</code>
        </div>
        <p className="text-muted-foreground">
          Para fijar una version especifica:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm">npm install github:magickhub/ltb-components#v1.0.0</code>
        </div>
      </section>
    </div>
  )
}
