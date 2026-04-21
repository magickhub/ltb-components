# Mensajes HTML con Renderizado Aislado

Este documento explica cómo usar la funcionalidad de mensajes HTML con renderizado aislado en el componente `Chat`.

## Descripción General

Los mensajes HTML permiten renderizar contenido personalizado con sus propios estilos y scripts en un **iframe aislado**. Esto significa que el HTML puede:

- ✅ Tener estilos CSS propios sin afectar la página principal
- ✅ Ejecutar scripts JavaScript sin conflictos
- ✅ Usar cualquier HTML válido
- ✅ No interferir con el resto de la aplicación

## Uso Básico

Para enviar un mensaje HTML, simplemente agrega `type: 'html'` al objeto del mensaje:

```typescript
import type { Message } from '@ltb/ui/chat'

const htmlMessage: Message = {
  id: '1',
  role: 'assistant',
  type: 'html',  // Activa el renderizado HTML aislado
  content: `
    <style>
      .card { 
        background: blue; 
        color: white; 
        padding: 20px; 
        border-radius: 8px;
      }
    </style>
    <div class="card">
      <h3>Contenido HTML</h3>
      <p>Este contenido se renderiza en un iframe aislado</p>
      <button onclick="alert('¡Funciona!')">Click me</button>
    </div>
  `,
  createdAt: new Date(),
}
```

## Comportamiento por Defecto

- Si no especificas `type` o estableces `type: 'text'`, el mensaje se renderiza como texto normal
- El markdown se procesa automáticamente en mensajes de tipo `text` del asistente
- Los mensajes HTML **no** procesan markdown, renderizando el contenido directamente

## Seguridad

El iframe usa el atributo `sandbox` con permisos limitados:
- ✅ `allow-scripts`: Permite ejecutar JavaScript
- ✅ `allow-same-origin`: Permite acceso al DOM del iframe

Los scripts **solo pueden** acceder al contenido dentro del iframe, no al contenido externo.

## Dimensionamiento Automático

El iframe se redimensiona automáticamente para ajustarse al contenido:

```typescript
// El iframe reporta su altura automáticamente al parent
// usando postMessage API cuando el contenido cambia
```

## Ejemplos Prácticos

### 1. Tarjeta con Gradiente

```typescript
{
  id: '1',
  role: 'assistant',
  type: 'html',
  content: `
    <style>
      .gradient-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 24px;
        border-radius: 12px;
        color: white;
        text-align: center;
      }
    </style>
    <div class="gradient-card">
      <h2>Bienvenido</h2>
      <p>Este es un componente renderizado en HTML aislado</p>
    </div>
  `,
  createdAt: new Date(),
}
```

### 2. Lista Interactiva

```typescript
{
  id: '2',
  role: 'assistant',
  type: 'html',
  content: `
    <style>
      ul { list-style: none; padding: 0; margin: 0; }
      li {
        padding: 12px;
        margin: 8px 0;
        background: #f0f0f0;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s;
      }
      li:hover { background: #e0e0e0; }
    </style>
    <ul>
      <li onclick="alert('Item 1')">📝 Opción 1</li>
      <li onclick="alert('Item 2')">🎯 Opción 2</li>
      <li onclick="alert('Item 3')">⚡ Opción 3</li>
    </ul>
  `,
  createdAt: new Date(),
}
```

### 3. Formulario Simple

```typescript
{
  id: '3',
  role: 'assistant',
  type: 'html',
  content: `
    <style>
      form { padding: 16px; }
      label { display: block; margin-bottom: 8px; font-weight: 500; }
      input { 
        width: 100%; 
        padding: 8px; 
        margin-bottom: 16px; 
        border: 1px solid #ddd; 
        border-radius: 4px; 
        box-sizing: border-box;
      }
      button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
      }
    </style>
    <form onsubmit="event.preventDefault(); alert('Enviado!')">
      <label>Nombre:</label>
      <input type="text" required>
      <button type="submit">Enviar</button>
    </form>
  `,
  createdAt: new Date(),
}
```

## Limitaciones Importantes

- El iframe **no** tiene acceso a `localStorage`, `sessionStorage`, ni `cookies`
- No puede hacer requests a otros dominios sin CORS
- Los scripts ejecutados están confinados al iframe
- El tamaño máximo se adapta al contenido

## Tipos TypeScript

```typescript
// Tipo de contenido del mensaje
export type MessageType = 'text' | 'html'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  type?: MessageType  // 'text' por defecto
  attachments?: Attachment[]
  action?: MessageAction
  createdAt: Date
}
```

## Casos de Uso Recomendados

1. **Visualizaciones de Datos**: Gráficos, tablas interactivas
2. **Componentes Personalizados**: Carruseles, galerías
3. **Formularios**: Inputs, selects, formularios complejos
4. **Contenido de Terceros**: HTML que no quieres que afecte tu estilo
5. **Mini Aplicaciones**: Calculadoras, conversores, juegos pequeños

## Debugging

Para debuggear el contenido HTML dentro del iframe, abre las DevTools y:
1. Inspecciona el iframe
2. Verifica la consola del iframe (aparece como "Top frame: ...")
3. Los errores de script aparecerán en la consola normal
