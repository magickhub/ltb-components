import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'

export const maxDuration = 60

// Supported model providers and their default models
const MODEL_PROVIDERS: Record<string, string> = {
  openai: 'openai/gpt-4o-mini',
  anthropic: 'anthropic/claude-sonnet-4-20250514',
  google: 'google/gemini-2.0-flash',
  grok: 'xai/grok-3-mini-fast-latest',
  groq: 'groq/llama-3.3-70b-versatile',
  fireworks: 'fireworks/llama-v3p1-70b-instruct',
}

function getModelId(): string {
  // Check for specific model override first
  const specificModel = process.env.AI_MODEL
  if (specificModel) {
    return specificModel
  }

  // Otherwise, use provider-based selection
  const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase()
  return MODEL_PROVIDERS[provider] || MODEL_PROVIDERS.openai
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
