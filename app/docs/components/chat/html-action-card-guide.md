# HtmlActionCard - Guía de Uso y Personalización

El componente `HtmlActionCard` es una tarjeta especial que se puede usar en mensajes HTML para mostrar acciones interactivas. Cuando un mensaje de tipo `html` tiene un atributo `htmlAction`, en lugar de renderizar el contenido HTML en un iframe, se muestra una tarjeta elegante con un botón "Abrir".

## Concepto

Cuando necesitas enviar un mensaje que contiene una acción (descargar un archivo, abrir un enlace, ejecutar una función, etc.), en lugar de mostrar HTML complejo, puedes definir un `htmlAction` que se renderizará como una tarjeta limpia y profesional.

## Estructura

```typescript
interface HtmlMessageAction {
  id: string              // Identificador único de la acción
  title: string           // Título principal de la tarjeta
  subtitle?: string       // Subtítulo o descripción adicional
  icon?: string           // Nombre del icono de Lucide (ej: 'Code2', 'File', 'Download')
}
```

## Ejemplos de Uso

### 1. Descargar Documento PDF

```typescript
{
  id: '1',
  role: 'assistant',
  type: 'html',
  content: 'He generado tu reporte en PDF',
  htmlAction: {
    id: 'download-pdf',
    title: 'Descargar reporte Q4 2024',
    subtitle: 'PDF · 2.4 MB',
    icon: 'FileText',
  }
}
```

### 2. Abrir Archivo de Código

```typescript
{
  id: '2',
  role: 'assistant',
  type: 'html',
  content: 'Aquí está el código que solicitaste',
  htmlAction: {
    id: 'view-code',
    title: 'Método ltb increnta',
    subtitle: 'Código · HTML',
    icon: 'Code2',
  }
}
```

### 3. Descargar Imagen

```typescript
{
  id: '3',
  role: 'assistant',
  type: 'html',
  content: 'Te genere el diseño que pediste',
  htmlAction: {
    id: 'download-image',
    title: 'Ver diseño final',
    subtitle: 'Imagen · PNG · 1920x1080',
    icon: 'Image',
  }
}
```

### 4. Abrir Repositorio

```typescript
{
  id: '4',
  role: 'assistant',
  type: 'html',
  content: 'Código disponible en el repositorio',
  htmlAction: {
    id: 'open-repo',
    title: 'Abrir repositorio',
    subtitle: 'GitHub · magickhub/ltb-components',
    icon: 'Github',
  }
}
```

### 5. Ir a Dashboard

```typescript
{
  id: '5',
  role: 'assistant',
  type: 'html',
  content: 'Los resultados están listos',
  htmlAction: {
    id: 'view-dashboard',
    title: 'Ir al dashboard',
    subtitle: 'Analytics · En tiempo real',
    icon: 'BarChart3',
  }
}
```

### 6. Leer Documentación

```typescript
{
  id: '6',
  role: 'assistant',
  type: 'html',
  content: 'Documentación completa disponible',
  htmlAction: {
    id: 'read-docs',
    title: 'Leer documentación',
    subtitle: 'Wiki · 42 páginas',
    icon: 'BookOpen',
  }
}
```

## Iconos Disponibles

Puedes usar cualquier icono de [Lucide Icons](https://lucide.dev/). Algunos ejemplos populares:

- **Descarga/Archivos**: `Download`, `File`, `FileText`, `FileJson`, `FileCode`
- **Código**: `Code2`, `Code`, `Github`, `GitBranch`
- **Multimedia**: `Image`, `Video`, `Music`, `Play`
- **Datos**: `BarChart3`, `LineChart`, `PieChart`, `Database`
- **Documentación**: `BookOpen`, `FileQuestion`, `HelpCircle`, `Info`
- **Acciones**: `ExternalLink`, `Zap`, `Send`, `Share2`
- **Formatos**: `Zap`, `Cpu`, `Layers`, `Settings`

## Manejo del Evento

El callback `onMessageActionClicked` se dispara cuando el usuario hace clic en el botón "Abrir":

```typescript
<ChatWindow
  messages={messages}
  onMessageActionClicked={(message, action) => {
    console.log('Acción ejecutada:', action.id, action.title)
    
    // Hacer algo basado en el actionId
    switch(action.id) {
      case 'download-pdf':
        downloadFile('report.pdf')
        break
      case 'view-dashboard':
        window.open('/dashboard')
        break
      default:
        console.log('Acción desconocida')
    }
  }}
/>
```

## Casos de Uso

| Caso | Icon | Título | Subtitle |
|------|------|--------|----------|
| Descargar PDF | FileText | Descargar reporte | PDF · 2.4 MB |
| Código HTML | Code2 | Método ltb increnta | Código · HTML |
| Imagen | Image | Ver diseño final | PNG · 1920x1080 |
| Repositorio | Github | Abrir repositorio | GitHub · usuario/repo |
| Dashboard | BarChart3 | Ir al dashboard | Analytics · En tiempo real |
| Documentación | BookOpen | Leer documentación | Wiki · 42 páginas |
| Archivo JSON | FileJson | Descargar config | JSON · 1.2 KB |
| Enlace externo | ExternalLink | Ir a sitio web | www.example.com |

## Personalización de Estilos

El componente utiliza variables CSS personalizables. Puedes modificar la apariencia editando los estilos en `html-action-card.tsx`:

- **Fondo**: `bg-[var(--ltb-muted)]`
- **Borde**: `border-[var(--ltb-border)]`
- **Texto**: `text-[var(--ltb-foreground)]`
- **Botón**: `bg-[var(--ltb-primary)]` / `text-[var(--ltb-primary-foreground)]`

## Diferencia: HtmlActionCard vs HtmlRenderer

| Aspecto | HtmlActionCard | HtmlRenderer |
|--------|---|---|
| Uso | Cuando necesitas una acción simple | Cuando necesitas contenido HTML complejo |
| Renderizado | Tarjeta limpia con botón | HTML en iframe aislado |
| Activación | Field `htmlAction` rellenado | Campo `htmlAction` vacío/no existe |
| Personalización | Icons, título, subtítulo | HTML/CSS/JavaScript personalizado |
| Casos | Descargas, enlaces, acciones | Widgets, gráficos, contenido interactivo |

## Tips

1. **Sé descriptivo con los subtítulos**: Incluye formato, tamaño o ubicación para que el usuario sepa qué esperar
2. **Usa iconos relevantes**: Elige iconos que representen bien la acción
3. **IDs únicos**: Cada acción debe tener un `id` único para identificarla en el callback
4. **Contenido del `content`**: Aunque no se ve en la tarjeta, puedes usarlo como contexto interno
5. **Longitud del título**: Mantén títulos concisos pero descriptivos (máximo 40 caracteres)

## Ejemplo Completo

```typescript
import { ChatWindow } from '@ltb/ui/chat'
import type { Message, HtmlMessageAction } from '@ltb/ui/chat'

export function MyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'He generado los resultados',
      type: 'html',
      htmlAction: {
        id: 'export-results',
        title: 'Descargar resultados',
        subtitle: 'Excel · 5.2 MB',
        icon: 'FileSpreadsheet',
      }
    }
  ])

  const handleActionClick = (message: Message, action: HtmlMessageAction) => {
    if (action.id === 'export-results') {
      // Descargar archivo
      const link = document.createElement('a')
      link.href = '/api/export'
      link.click()
    }
  }

  return (
    <ChatWindow
      messages={messages}
      onMessageActionClicked={handleActionClick}
    />
  )
}
```
