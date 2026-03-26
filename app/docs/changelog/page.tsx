export const metadata = {
  title: 'Changelog - LTB Components',
  description: 'Version history and release notes for LTB Components',
}

const releases = [
  {
    version: '1.0.0',
    date: '2026-03-26',
    changes: {
      added: [
        'Initial release of LTB Components',
        'AIChatWidget: Complete AI chat interface',
        'Conversation sidebar with date grouping',
        'Message list with user/assistant/system styling',
        'Input with file attachment support',
        'Header with sidebar toggle',
        'Full customization via CSS variables',
        'TypeScript type definitions',
        'Dark mode support',
        'Modular components: ChatMessage, ChatMessageList, ChatInput, ChatSidebar, ChatHeader',
      ],
      documentation: [
        'Getting started guide',
        'Component API reference',
        'Customization examples',
        'Interactive demos',
      ],
    },
  },
]

export default function ChangelogPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          All notable changes to LTB Components are documented here.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          This project follows{' '}
          <a
            href="https://semver.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Semantic Versioning
          </a>
          . Breaking changes will only occur in major version updates.
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
                  Added
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
                  Documentation
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
        <h2 className="text-xl font-semibold">Versioning Policy</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <h3 className="font-medium text-primary">Major (X.0.0)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Breaking changes that require code updates
            </p>
          </div>
          <div>
            <h3 className="font-medium text-primary">Minor (0.X.0)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              New features, backwards compatible
            </p>
          </div>
          <div>
            <h3 className="font-medium text-primary">Patch (0.0.X)</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Bug fixes and minor improvements
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Upgrading</h2>
        <p className="text-muted-foreground">
          To update to the latest version:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm">npm update ltb-components</code>
        </div>
        <p className="text-muted-foreground">
          To pin a specific version:
        </p>
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <code className="text-sm">npm install github:your-username/ltb-components#v1.0.0</code>
        </div>
      </section>
    </div>
  )
}
