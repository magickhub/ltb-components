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
      content: 'Dame los datos de ventas del ultimo trimestre',
      createdAt: new Date(Date.now() - 50000),
    },
    {
      id: '4',
      role: 'assistant',
      type: 'html',
      content: `
        <style>
          .ai-table-container {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 16px;
            background: #ffffff;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
          }
          .ai-table-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
          }
          .ai-table-title {
            font-size: 16px;
            font-weight: 600;
            color: #111827;
            margin: 0;
          }
          .ai-badge {
            background: #dcfce7;
            color: #166534;
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
          }
          .ai-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          .ai-table th {
            text-align: left;
            padding: 10px 12px;
            background: #f9fafb;
            color: #6b7280;
            font-weight: 500;
            border-bottom: 1px solid #e5e7eb;
          }
          .ai-table td {
            padding: 12px;
            border-bottom: 1px solid #f3f4f6;
            color: #374151;
          }
          .ai-table tr:hover td {
            background: #f9fafb;
          }
          .ai-table .amount {
            font-weight: 600;
            color: #059669;
          }
          .ai-table .negative {
            color: #dc2626;
          }
          .ai-total {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 2px solid #e5e7eb;
          }
          .ai-total-label {
            font-weight: 500;
            color: #6b7280;
          }
          .ai-total-value {
            font-size: 20px;
            font-weight: 700;
            color: #059669;
          }
        </style>
        <div class="ai-table-container">
          <div class="ai-table-header">
            <h3 class="ai-table-title">Ventas Q4 2024</h3>
            <span class="ai-badge">+12.5% vs Q3</span>
          </div>
          <table class="ai-table">
            <thead>
              <tr>
                <th>Mes</th>
                <th>Ventas</th>
                <th>Crecimiento</th>
                <th>Meta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Octubre</td>
                <td class="amount">$45,200</td>
                <td class="amount">+8.2%</td>
                <td>$42,000</td>
              </tr>
              <tr>
                <td>Noviembre</td>
                <td class="amount">$52,800</td>
                <td class="amount">+16.8%</td>
                <td>$48,000</td>
              </tr>
              <tr>
                <td>Diciembre</td>
                <td class="amount">$68,500</td>
                <td class="amount">+29.7%</td>
                <td>$55,000</td>
              </tr>
            </tbody>
          </table>
          <div class="ai-total">
            <span class="ai-total-label">Total Q4</span>
            <span class="ai-total-value">$166,500</span>
          </div>
        </div>
      `,
      createdAt: new Date(Date.now() - 45000),
    },
    {
      id: '5',
      role: 'user',
      type: 'text',
      content: 'Muestrame un ejemplo de como hacer un componente contador en React',
      createdAt: new Date(Date.now() - 30000),
    },
    {
      id: '6',
      role: 'assistant',
      type: 'html',
      content: `
        <style>
          .ai-code-response {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .ai-code-intro {
            font-size: 14px;
            color: #374151;
            margin-bottom: 12px;
            line-height: 1.5;
          }
          .ai-code-block {
            background: #1e1e1e;
            border-radius: 8px;
            overflow: hidden;
          }
          .ai-code-header {
            background: #2d2d2d;
            padding: 8px 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .ai-code-filename {
            color: #9ca3af;
            font-size: 12px;
          }
          .ai-code-copy {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 11px;
            cursor: pointer;
          }
          .ai-code-copy:hover {
            background: #2563eb;
          }
          .ai-code-content {
            padding: 16px;
            overflow-x: auto;
          }
          .ai-code-content pre {
            margin: 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 13px;
            line-height: 1.6;
            color: #e5e7eb;
          }
          .ai-code-content .keyword { color: #c586c0; }
          .ai-code-content .function { color: #dcdcaa; }
          .ai-code-content .string { color: #ce9178; }
          .ai-code-content .component { color: #4ec9b0; }
          .ai-code-content .hook { color: #9cdcfe; }
          .ai-code-content .number { color: #b5cea8; }
          .ai-code-content .comment { color: #6a9955; }
          .ai-live-demo {
            margin-top: 16px;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            text-align: center;
          }
          .ai-live-label {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .ai-counter-display {
            font-size: 48px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 16px;
          }
          .ai-counter-buttons {
            display: flex;
            gap: 8px;
            justify-content: center;
          }
          .ai-counter-btn {
            width: 44px;
            height: 44px;
            border-radius: 8px;
            border: none;
            font-size: 20px;
            cursor: pointer;
            transition: transform 0.1s;
          }
          .ai-counter-btn:active {
            transform: scale(0.95);
          }
          .ai-counter-btn.minus {
            background: #fee2e2;
            color: #dc2626;
          }
          .ai-counter-btn.plus {
            background: #dcfce7;
            color: #16a34a;
          }
          .ai-counter-btn.reset {
            background: #e5e7eb;
            color: #374151;
            width: auto;
            padding: 0 16px;
            font-size: 13px;
          }
        </style>
        <div class="ai-code-response">
          <p class="ai-code-intro">Aqui tienes un componente contador simple con React usando el hook useState:</p>
          <div class="ai-code-block">
            <div class="ai-code-header">
              <span class="ai-code-filename">Counter.tsx</span>
              <button class="ai-code-copy" onclick="navigator.clipboard.writeText(this.closest('.ai-code-block').querySelector('pre').textContent); this.textContent='Copiado!'; setTimeout(() => this.textContent='Copiar', 2000)">Copiar</button>
            </div>
            <div class="ai-code-content">
              <pre><span class="keyword">import</span> { <span class="hook">useState</span> } <span class="keyword">from</span> <span class="string">'react'</span>

<span class="keyword">export function</span> <span class="function">Counter</span>() {
  <span class="keyword">const</span> [<span class="hook">count</span>, <span class="hook">setCount</span>] = <span class="function">useState</span>(<span class="number">0</span>)

  <span class="keyword">return</span> (
    &lt;<span class="component">div</span>&gt;
      &lt;<span class="component">p</span>&gt;Contador: {<span class="hook">count</span>}&lt;/<span class="component">p</span>&gt;
      &lt;<span class="component">button</span> onClick={() =&gt; <span class="function">setCount</span>(<span class="hook">count</span> - <span class="number">1</span>)}&gt;-&lt;/<span class="component">button</span>&gt;
      &lt;<span class="component">button</span> onClick={() =&gt; <span class="function">setCount</span>(<span class="hook">count</span> + <span class="number">1</span>)}&gt;+&lt;/<span class="component">button</span>&gt;
      &lt;<span class="component">button</span> onClick={() =&gt; <span class="function">setCount</span>(<span class="number">0</span>)}&gt;Reset&lt;/<span class="component">button</span>&gt;
    &lt;/<span class="component">div</span>&gt;
  )
}</pre>
            </div>
          </div>
          <div class="ai-live-demo">
            <div class="ai-live-label">Demo Interactivo</div>
            <div class="ai-counter-display" id="counter-value">0</div>
            <div class="ai-counter-buttons">
              <button class="ai-counter-btn minus" onclick="document.getElementById('counter-value').textContent = parseInt(document.getElementById('counter-value').textContent) - 1">-</button>
              <button class="ai-counter-btn plus" onclick="document.getElementById('counter-value').textContent = parseInt(document.getElementById('counter-value').textContent) + 1">+</button>
              <button class="ai-counter-btn reset" onclick="document.getElementById('counter-value').textContent = '0'">Reset</button>
            </div>
          </div>
        </div>
      `,
      createdAt: new Date(Date.now() - 25000),
    },
    {
      id: '7',
      role: 'user',
      type: 'text',
      content: 'Que hora es y cual es el clima?',
      createdAt: new Date(Date.now() - 15000),
    },
    {
      id: '8',
      role: 'assistant',
      type: 'html',
      content: `
        <style>
          .ai-widget-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          .ai-widget {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 20px;
            color: white;
          }
          .ai-widget.weather {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          .ai-widget-label {
            font-size: 11px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .ai-widget-value {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 4px;
          }
          .ai-widget-sub {
            font-size: 13px;
            opacity: 0.9;
          }
          .ai-widget-icon {
            font-size: 28px;
            margin-bottom: 8px;
          }
        </style>
        <div class="ai-widget-grid">
          <div class="ai-widget">
            <div class="ai-widget-label">Hora actual</div>
            <div class="ai-widget-value" id="live-time">--:--</div>
            <div class="ai-widget-sub" id="live-date">Cargando...</div>
          </div>
          <div class="ai-widget weather">
            <div class="ai-widget-icon">☀️</div>
            <div class="ai-widget-value">24°C</div>
            <div class="ai-widget-sub">Madrid, soleado</div>
          </div>
        </div>
        <script>
          function updateTime() {
            const now = new Date();
            const timeEl = document.getElementById('live-time');
            const dateEl = document.getElementById('live-date');
            if (timeEl && dateEl) {
              timeEl.textContent = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
              dateEl.textContent = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
            }
          }
          updateTime();
          setInterval(updateTime, 1000);
        </script>
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
