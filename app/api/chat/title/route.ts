import { generateText } from 'ai'

// Nota: Este endpoint está disponible pero no se usa automáticamente en la demo.
// Para generar títulos automáticamente, necesitas implementar un ThreadListAdapter
// con persistencia de threads. Ver: https://www.assistant-ui.com/docs/ui/thread-list

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Encontrar el primer mensaje del usuario
    const userMessage = messages.find(
      (m: { role: string; content: string }) => m.role === 'user'
    )

    if (!userMessage) {
      return Response.json({ title: 'Nueva conversación' })
    }

    // Extraer modelo
    const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase()
    const customModel = process.env.AI_MODEL?.trim()

    const PROVIDER_PREFIXES: Record<string, string> = {
      openai: 'openai',
      anthropic: 'anthropic',
      google: 'google',
      grok: 'xai',
      groq: 'groq',
      fireworks: 'fireworks',
    }

    const MODEL_PROVIDERS: Record<string, string> = {
      openai: 'gpt-4o-mini',
      anthropic: 'claude-sonnet-4-20250514',
      google: 'gemini-2.0-flash',
      grok: 'grok-3-mini-fast-latest',
      groq: 'llama-3.3-70b-versatile',
      fireworks: 'llama-v3p1-70b-instruct',
    }

    let modelId: string
    if (customModel) {
      if (customModel.includes('/')) {
        modelId = customModel
      } else {
        modelId = `${PROVIDER_PREFIXES[provider]}/${customModel}`
      }
    } else {
      modelId = `${PROVIDER_PREFIXES[provider]}/${MODEL_PROVIDERS[provider]}`
    }

    const result = await generateText({
      model: modelId,
      prompt: `Genera un titulo corto (3-6 palabras) para esta conversacion, basandote en el primer mensaje del usuario. El titulo debe ser en el mismo idioma que el mensaje.

Mensaje: "${userMessage.content}"

Responde SOLO con el titulo, sin comillas ni explicaciones.`,
      temperature: 0.7,
      maxOutputTokens: 20,
    })

    const title = result.text.trim().slice(0, 50) // Limitar a 50 caracteres

    return Response.json({ title })
  } catch (error) {
    console.error('Error generating title:', error)
    // Fallback: usar las primeras 5 palabras del mensaje
    const { messages } = await req.json()
    const userMessage = messages.find(
      (m: { role: string; content: string }) => m.role === 'user'
    )
    const fallbackTitle =
      userMessage?.content?.split(' ').slice(0, 5).join(' ') || 'Nueva conversación'

    return Response.json({ title: fallbackTitle.slice(0, 50) })
  }
}
