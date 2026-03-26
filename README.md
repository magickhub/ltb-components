# ltb-components

Una librería de componentes React construida sobre shadcn/ui con widgets de chat AI personalizables.

**Versión:** 1.0.0 | **Repositorio:** [magickhub/ltb-components](https://github.com/magickhub/ltb-components)

## Instalación

### Instalar desde GitHub (v1.0.0)

```bash
# Con npm
npm install github:magickhub/ltb-components#v1.0.0

# Con pnpm
pnpm add github:magickhub/ltb-components#v1.0.0

# Con yarn
yarn add github:magickhub/ltb-components#v1.0.0
```

### Instalación en tu proyecto React externo

1. **Agrega la librería a tu `package.json`:**

```json
{
  "dependencies": {
    "ltb-components": "github:magickhub/ltb-components#v1.0.0"
  }
}
```

2. **Instala las dependencias:**

```bash
pnpm install
```

3. **Importa los componentes en tu proyecto:**

```tsx
// Importar el widget de chat completo
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';

// O importar componentes individuales
import { ChatMessage, ChatInput } from 'ltb-components/chat';
```

## Componentes Disponibles

### Widget Completo

- **`AIChatWidget`** - Widget de chat IA completo con barra lateral, lista de mensajes e input

### Componentes Modulares

- **`ChatMessage`** - Renderiza un mensaje individual
- **`ChatMessageList`** - Contenedor scrollable para mensajes
- **`ChatInput`** - Input con soporte para adjuntos
- **`ChatSidebar`** - Lista de conversaciones
- **`ChatHeader`** - Encabezado del chat con toggle de barra lateral

## Características

✅ Soporte completo para TypeScript
✅ Dark mode integrado
✅ Accesibilidad (ARIA labels, navegación por teclado)
✅ Personalizable via CSS variables y classNames
✅ Compatible con React 18 y 19
✅ Construido sobre Radix UI y Tailwind CSS

## Uso Básico

```tsx
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';

export default function App() {
  return (
    <AIChatWidget
      conversations={[]}
      messages={[]}
      onSendMessage={(message) => console.log(message)}
    />
  );
}
```

## Personalización

Todos los componentes aceptan `className` para personalización:

```tsx
<ChatMessage
  role="user"
  content="Hola"
  className="bg-blue-50"
/>
```

## Variables CSS Disponibles

```css
--ltb-primary: #000000;
--ltb-background: #ffffff;
--ltb-foreground: #000000;
--ltb-border: #e0e0e0;
--ltb-radius: 8px;
```

## Documentación Completa

Para ver ejemplos interactivos y documentación completa, visita:
- [Página de documentación](./app/docs)
- [Componentes](./app/docs/components/chat)
- [Changelog](./CHANGELOG.md)

## Para Desarrolladores

### Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Ejecutar dev server
pnpm dev

# Build de la librería
pnpm build
```

### Estructura del Proyecto

```
packages/ui/
├── src/
│   ├── chat/           # Componentes de chat
│   ├── index.ts        # Entry point de la librería
│   └── styles.css      # Estilos globales
└── package.json        # Configuración de la librería
```

## Licencia

MIT - Libre para usar en proyectos personales y comerciales.

## Built with v0

Este repositorio está vinculado a un proyecto [v0](https://v0.app). [Continuar desarrollando en v0 →](https://v0.app/chat/projects/prj_Jb8BPPDcOoFOSWzvKXIDr5ULI3pa)
