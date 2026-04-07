'use client'

import { useState } from 'react'

interface ModelSelectorProps {
  onModelChange?: (provider: string) => void
}

const PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: [
      { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (Recomendado)' },
      { id: 'openai/gpt-4o', name: 'GPT-4o' },
    ],
  },
  anthropic: {
    name: 'Anthropic',
    models: [
      { id: 'anthropic/claude-sonnet-4-20250514', name: 'Claude Sonnet 4' },
      { id: 'anthropic/claude-opus-4-20250514', name: 'Claude Opus 4' },
    ],
  },
  google: {
    name: 'Google',
    models: [
      { id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
    ],
  },
  grok: {
    name: 'xAI',
    models: [
      { id: 'xai/grok-3-mini-fast-latest', name: 'Grok 3 Mini' },
    ],
  },
  groq: {
    name: 'Groq',
    models: [
      { id: 'groq/llama-3.3-70b-versatile', name: 'Llama 3.3 70B' },
    ],
  },
}

export function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>('openai')

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider)
    onModelChange?.(provider)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-sm font-medium">Proveedor de IA</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {Object.entries(PROVIDERS).map(([key, provider]) => (
          <button
            key={key}
            onClick={() => handleProviderChange(key)}
            className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-colors ${
              selectedProvider === key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:border-primary/50'
            }`}
          >
            {provider.name}
          </button>
        ))}
      </div>

      {selectedProvider && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground">Modelos disponibles:</p>
          <div className="space-y-1">
            {PROVIDERS[selectedProvider as keyof typeof PROVIDERS]?.models.map(
              (model) => (
                <div
                  key={model.id}
                  className="rounded bg-muted px-3 py-2 text-xs font-mono text-muted-foreground"
                >
                  {model.name}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
