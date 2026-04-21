'use client'

import React from 'react'
import { ChatWindow } from '@ltb/ui/chat'
import type { Message } from '@ltb/ui/chat'

/**
 * Demo de mensajes HTML con renderizado aislado
 * Muestra como los HTML messages pueden tener estilos y scripts propios
 * sin afectar el contenido externo
 */
export function HtmlMessagesDemo() {
  const [messages] = React.useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: 'Puedo enviar HTML con estilos propios?',
      type: 'text',
      createdAt: new Date(Date.now() - 60000),
    },
    {
      id: '2',
      role: 'assistant',
      type: 'html',
      content: `
        <style>
          .response-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            padding: 24px;
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 100%;
          }
          .response-card h3 {
            margin: 0 0 12px;
            font-size: 20px;
            font-weight: 600;
          }
          .response-card p {
            margin: 0 0 16px;
            font-size: 14px;
            opacity: 0.95;
            line-height: 1.6;
          }
          .response-card button {
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: opacity 0.2s;
          }
          .response-card button:hover {
            opacity: 0.9;
          }
        </style>
        <div class="response-card">
          <h3>¡Absolutamente!</h3>
          <p>Este mensaje HTML tiene sus propios estilos y puede ejecutar scripts sin afectar la página principal.</p>
          <button onclick="alert('¡Script ejecutado desde el iframe aislado!')">Probar Script</button>
        </div>
      `,
      createdAt: new Date(Date.now() - 30000),
    },
    {
      id: '3',
      role: 'user',
      type: 'text',
      content: 'Wow, eso es increíble! Y puedo usar esto para que?',
      createdAt: new Date(Date.now() - 20000),
    },
    {
      id: '4',
      role: 'assistant',
      type: 'html',
      content: `
        <style>
          .demo-section {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 16px;
            font-family: system-ui, sans-serif;
          }
          .demo-section h4 {
            margin: 0 0 8px;
            color: #1f2937;
            font-size: 15px;
            font-weight: 600;
          }
          .use-case {
            background: white;
            margin: 12px 0;
            padding: 12px;
            border-left: 3px solid #3b82f6;
            border-radius: 4px;
            font-size: 13px;
            color: #374151;
          }
          .use-case strong {
            color: #1f2937;
          }
        </style>
        <div class="demo-section">
          <h4>Casos de Uso para Mensajes HTML:</h4>
          <div class="use-case">
            <strong>📊 Visualizaciones Interactivas:</strong> Gráficos, tablas con scroll, dashboards mini
          </div>
          <div class="use-case">
            <strong>🎨 Componentes Complejos:</strong> Carruseles, modales, forms interactivos
          </div>
          <div class="use-case">
            <strong>🎯 Contenido Aislado:</strong> HTML de terceros sin riesgo de conflictos de estilos
          </div>
          <div class="use-case">
            <strong>⚡ Aplicaciones Embebidas:</strong> Mini-apps, previsualizaciones de código
          </div>
        </div>
      `,
      createdAt: new Date(Date.now() - 10000),
    },
  ])

  const handleSendMessage = (content: string) => {
    // En una aplicación real, aquí enviarías el mensaje
    console.log('Mensaje enviado:', content)
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
        placeholder="Escribe un mensaje o envía HTML con type: 'html'"
      />
    </div>
  )
}
