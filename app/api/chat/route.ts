import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 60

// Supported model providers and their default models
const MODEL_PROVIDERS: Record<string, string> = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-sonnet-4-20250514',
  google: 'gemini-2.0-flash',
  grok: 'grok-3-mini-fast-latest',
  groq: 'llama-3.3-70b-versatile',
  fireworks: 'llama-v3p1-70b-instruct',
}

// Provider prefixes for model IDs
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
  
  // Verificar que el proveedor sea válido
  if (!MODEL_PROVIDERS[provider]) {
    throw new Error(
      `Proveedor de IA no soportado: "${provider}". Opciones válidas: ${Object.keys(MODEL_PROVIDERS).join(', ')}`
    )
  }

  // Si se especifica un modelo personalizado, usarlo con el prefijo del proveedor
  const customModel = process.env.AI_MODEL?.trim()
  if (customModel) {
    // Si el modelo ya tiene un prefijo (ej: openai/gpt-5), usarlo como está
    if (customModel.includes('/')) {
      return customModel
    }
    // Si no tiene prefijo, agregarlo automáticamente basado en el proveedor
    return `${PROVIDER_PREFIXES[provider]}/${customModel}`
  }

  // Usar el modelo por defecto del proveedor
  return `${PROVIDER_PREFIXES[provider]}/${MODEL_PROVIDERS[provider]}`
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const modelId = getModelId()

  const result = streamText({
    model: modelId,
    system: 'You are a helpful assistant. Respond in the same language the user writes to you.',
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
