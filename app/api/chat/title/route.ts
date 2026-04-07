import { generateText } from 'ai'
import { UIMessage } from 'ai'

const MODEL_PROVIDERS: Record<string, string> = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-sonnet-4-20250514',
  google: 'gemini-2.0-flash',
  grok: 'grok-3-mini-fast-latest',
  groq: 'llama-3.3-70b-versatile',
  fireworks: 'llama-v3p1-70b-instruct',
}

const PROVIDER_PREFIXES: Record<string, string> = {
  openai: 'openai',
  anthropic: 'anthropic',
  google: 'google',
  grok: 'xai',
  groq: 'groq',
  fireworks: 'fireworks',
}

function getModelId(): string {
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase()
  if (!MODEL_PROVIDERS[provider]) {
    throw new Error(`Proveedor no soportado: "${provider}"`)
  }
  const customModel = process.env.AI_MODEL?.trim()
  if (customModel) {
    return customModel.includes('/') ? customModel : `${PROVIDER_PREFIXES[provider]}/${customModel}`
  }
  return `${PROVIDER_PREFIXES[provider]}/${MODEL_PROVIDERS[provider]}`
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Extraer el texto del primer mensaje del usuario
  const firstUserMessage = messages.find((m) => m.role === 'user')
  if (!firstUserMessage) {
    return Response.json({ title: 'Nueva conversacion' })
  }

  const firstMessageText = firstUserMessage.parts
    ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('') || ''

  if (!firstMessageText.trim()) {
    return Response.json({ title: 'Nueva conversacion' })
  }

  try {
    const { text } = await generateText({
      model: getModelId(),
      system:
        'Generate a short, concise title (3-6 words max) for a conversation that starts with the following message. ' +
        'Respond ONLY with the title, no quotes, no punctuation at the end. ' +
        'Use the same language as the message.',
      prompt: firstMessageText,
    })

    return Response.json({ title: text.trim() })
  } catch {
    // Si falla la generacion del titulo, usar las primeras palabras del mensaje
    const fallback = firstMessageText.split(' ').slice(0, 5).join(' ')
    return Response.json({ title: fallback || 'Nueva conversacion' })
  }
}
