# LTB Components v1.0.1 - Notas de Lanzamiento

**Fecha:** 21 de Abril de 2026

## Resumen

LTB Components v1.0.1 introduce **renderizado de mensajes HTML aislado**, permitiendo que los asistentes de IA generen contenido HTML interactivo, widgets, tablas de datos y componentes visuales complejos de forma segura dentro de los mensajes del chat.

## Características Principales

### 1. Tipo de Mensaje HTML (`type: 'html'`)

```typescript
type MessageType = 'text' | 'html'
```

- **`'text'` (default)**: Mensajes de texto normal con soporte markdown
- **`'html'`**: Contenido HTML renderizado en iframe aislado

### 2. Renderizado Aislado con iframe

Los mensajes HTML se renderización en un iframe con `srcdoc` que:
- ✅ Aísla estilos CSS personalizados
- ✅ Ejecuta JavaScript sin interferencia
- ✅ Previene conflictos con la página principal
- ✅ Permite widgets interactivos

### 3. Componente HtmlRenderer

Nuevo componente que:
- Renderiza HTML en iframe sandboxed
- Auto-ajusta la altura según contenido
- Detecta cambios con MutationObserver
- Soporta scripts y estilos propios

## Ejemplos de Uso

### Mensaje HTML Simple

```typescript
const htmlMessage: Message = {
  id: '1',
  role: 'assistant',
  type: 'html',
  content: `
    <style>
      .card { background: #3b82f6; color: white; padding: 16px; border-radius: 8px; }
    </style>
    <div class="card">Contenido HTML aislado</div>
  `,
  createdAt: new Date(),
}
```

### Tabla de Datos Generada por IA

```typescript
const tableMessage: Message = {
  id: '2',
  role: 'assistant',
  type: 'html',
  content: `
    <style>
      table { width: 100%; border-collapse: collapse; }
      th { background: #f3f4f6; padding: 8px; text-align: left; }
      td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
    </style>
    <table>
      <thead>
        <tr><th>Mes</th><th>Ventas</th><th>Crecimiento</th></tr>
      </thead>
      <tbody>
        <tr><td>Octubre</td><td>$45,200</td><td>+8.2%</td></tr>
        <tr><td>Noviembre</td><td>$52,800</td><td>+16.8%</td></tr>
      </tbody>
    </table>
  `,
  createdAt: new Date(),
}
```

### Widget Interactivo con JavaScript

```typescript
const widgetMessage: Message = {
  id: '3',
  role: 'assistant',
  type: 'html',
  content: `
    <style>
      .counter { text-align: center; padding: 20px; }
      .counter-value { font-size: 48px; font-weight: bold; }
      button { margin: 10px; padding: 8px 16px; cursor: pointer; }
    </style>
    <div class="counter">
      <div class="counter-value" id="count">0</div>
      <button onclick="document.getElementById('count').textContent = parseInt(document.getElementById('count').textContent) + 1">+</button>
      <button onclick="document.getElementById('count').textContent = 0">Reset</button>
    </div>
  `,
  createdAt: new Date(),
}
```

## Casos de Uso

1. **Visualización de Datos**: Tablas con estilo, gráficos, dashboards
2. **Código Interactivo**: Ejemplos de código con syntax highlighting y demos en vivo
3. **Componentes Complejos**: Carruseles, formularios, selectores
4. **Widgets en Tiempo Real**: Relojes, cambios de datos, animaciones
5. **Contenido Aislado**: HTML de terceros sin riesgo de conflictos

## Seguridad

Los iframes utilizan sandbox con permisos limitados:

```javascript
sandbox="allow-scripts allow-same-origin"
```

- ✅ `allow-scripts`: Ejecuta JavaScript dentro del iframe
- ✅ `allow-same-origin`: Necesario para estilos y acceso al DOM
- ❌ No permite: acceso al DOM principal, navegación, plugins

## Cambios en la API

### Message Interface (Actualizada)

```typescript
interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  type?: MessageType                    // NUEVO: 'text' | 'html'
  attachments?: Attachment[]
  action?: MessageAction
  createdAt: Date
}

type MessageType = 'text' | 'html'     // NUEVO
```

### Componente ChatMessage

Ahora detecta automáticamente el tipo y renderiza apropiadamente:

```tsx
<ChatMessage message={htmlMessage} /> // Renderiza en iframe si type='html'
<ChatMessage message={textMessage} /> // Renderiza texto normal si type omitido o 'text'
```

## Documentación

- **Guía Completa**: [`docs/HTML_MESSAGES.md`](./docs/HTML_MESSAGES.md)
- **Demo Component**: [`app/docs/components/chat/html-messages-demo.tsx`](./app/docs/components/chat/html-messages-demo.tsx)
- **Página Changelog**: [`app/docs/changelog/page.tsx`](./app/docs/changelog/page.tsx)

## Compatibilidad

- ✅ React 18+
- ✅ React 19
- ✅ TypeScript 4.5+
- ✅ Navegadores modernos con soporte para iframe srcdoc
- ✅ Completamente backwards compatible (v1.0.0 → v1.0.1)

## Instalación

```bash
# npm
npm install github:magickhub/ltb-components#v1.0.1

# pnpm
pnpm add github:magickhub/ltb-components#v1.0.1

# yarn
yarn add github:magickhub/ltb-components#v1.0.1
```

## Migración desde v1.0.0

No requiere cambios. Todos los mensajes existentes de tipo texto seguirán funcionando igual. Solo necesitas especificar `type: 'html'` cuando quieras renderizar contenido HTML.

```typescript
// v1.0.0 - Sigue funcionando igual
const message: Message = {
  id: '1',
  role: 'assistant',
  content: 'Hola mundo!',
  createdAt: new Date(),
}

// v1.0.1 - Nuevo: renderizar HTML
const htmlMessage: Message = {
  id: '2',
  role: 'assistant',
  type: 'html',
  content: '<div style="color: blue;">Hola mundo!</div>',
  createdAt: new Date(),
}
```

## Limitaciones Conocidas

1. **Tamaño de contenido**: Los iframes muy grandes pueden afectar performance
2. **Fuentes externas**: Los iframes no pueden cargar fuentes de Google Fonts (mismo origen)
3. **Almacenamiento**: No hay acceso a localStorage/sessionStorage
4. **Cookies**: No hay acceso a cookies del dominio principal
5. **Navegación**: No puede cambiar la URL del navegador

## Mejoras Futuras (v1.1+)

- [ ] Soporte para streaming de contenido HTML
- [ ] Pre-renderizado de iframes para mejor performance
- [ ] Component library para generar HTML desde IA
- [ ] Templates de widgets reutilizables

## Soporte

Para reportar bugs o sugerencias, abre un issue en GitHub:
https://github.com/magickhub/ltb-components/issues

## Cambios Detallados

### Archivos Modificados

- `packages/ui/src/chat/types.ts` - Agregado `MessageType`
- `packages/ui/src/chat/chat-message.tsx` - Agregado `HtmlRenderer`
- `packages/ui/src/chat/index.ts` - Exportación de `MessageType`
- `app/docs/components/chat/page.tsx` - Documentación actualizada
- `README.md` - Actualizado con v1.0.1
- `CHANGELOG.md` - Nuevas entradas

### Archivos Nuevos

- `docs/HTML_MESSAGES.md` - Guía completa
- `app/docs/components/chat/html-messages-demo.tsx` - Demo interactiva

---

**Gracias por usar LTB Components!** 🚀
