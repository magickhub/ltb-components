'use client'

import React from 'react'
import type { Message, HtmlMessageAction } from '@ltb/ui/chat'
import { ChatWindow } from '@ltb/ui/chat'

/**
 * Demo mejorada que muestra todas las posibilidades de personalización
 * del componente HtmlActionCard
 */
export default function HtmlActionCardShowcase() {
  const messages: Message[] = [
    {
      id: '0',
      role: 'user',
      type: 'text',
      content: 'Hola, necesito ayuda con mi proyecto',
      createdAt: new Date(Date.now() - 60000),
    },
    {
      id: '1',
      role: 'assistant',
      type: 'text',
      content: 'Claro, puedo ayudarte con varios tipos de acciones. Aquí te muestro las posibilidades:',
      createdAt: new Date(Date.now() - 55000),
    },

    // Ejemplo 1: Descarga de Código
    {
      id: '2',
      role: 'assistant',
      type: 'html',
      content: 'Aquí está el método que te genere. Es una implementación completa y optimizada.',
      htmlAction: {
        id: 'action-code-1',
        title: 'Método ltb increnta',
        subtitle: 'Código · HTML · 3.2 KB',
        icon: 'Code2',
      },
      createdAt: new Date(Date.now() - 50000),
    },

    // Ejemplo 2: Descarga de Archivo JSON
    {
      id: '3',
      role: 'assistant',
      type: 'html',
      content: 'La configuración completa para tu proyecto está lista. Incluye todas las variables de entorno necesarias.',
      htmlAction: {
        id: 'action-config',
        title: 'Descargar config.json',
        subtitle: 'JSON · 2.4 KB',
        icon: 'File',
      },
      createdAt: new Date(Date.now() - 45000),
    },

    // Ejemplo 3: Visualizar Imagen
    {
      id: '4',
      role: 'assistant',
      type: 'html',
      content: 'Generé el diseño que solicitaste con todas tus especificaciones. Es responsivo y está optimizado.',
      htmlAction: {
        id: 'action-design',
        title: 'Ver diseño final',
        subtitle: 'Imagen · PNG · 1920x1080 · 1.8 MB',
        icon: 'Image',
      },
      createdAt: new Date(Date.now() - 40000),
    },

    // Ejemplo 4: Abrir Repositorio
    {
      id: '5',
      role: 'assistant',
      type: 'html',
      content: 'El repositorio contiene todo el código fuente, documentación y ejemplos de uso.',
      htmlAction: {
        id: 'action-repo',
        title: 'Abrir repositorio',
        subtitle: 'GitHub · magickhub/ltb-components',
        icon: 'Github',
      },
      createdAt: new Date(Date.now() - 35000),
    },

    // Ejemplo 5: Descarga de Presentación
    {
      id: '6',
      role: 'assistant',
      type: 'html',
      content: 'La presentación incluye todas las diapositivas, gráficos y datos que discutimos. Está lista para presentar.',
      htmlAction: {
        id: 'action-slides',
        title: 'Descargar presentación',
        subtitle: 'PowerPoint · 15 MB · 42 diapositivas',
        icon: 'FileText',
      },
      createdAt: new Date(Date.now() - 30000),
    },

    // Ejemplo 6: Dashboard/Analytics
    {
      id: '7',
      role: 'assistant',
      type: 'html',
      content: 'El dashboard muestra en tiempo real todos los datos de tu proyecto. Puedes ver métricas, gráficos y reportes.',
      htmlAction: {
        id: 'action-dashboard',
        title: 'Ir al dashboard',
        subtitle: 'Analytics · En tiempo real · Actualización cada 30s',
        icon: 'BarChart3',
      },
      createdAt: new Date(Date.now() - 25000),
    },

    // Ejemplo 7: Documentación
    {
      id: '8',
      role: 'assistant',
      type: 'html',
      content: 'La documentación completa incluye guías, API reference, ejemplos y troubleshooting.',
      htmlAction: {
        id: 'action-docs',
        title: 'Leer documentación',
        subtitle: 'Wiki · 42 páginas · Actualizada hoy',
        icon: 'BookOpen',
      },
      createdAt: new Date(Date.now() - 20000),
    },

    // Ejemplo 8: Descargar
    {
      id: '9',
      role: 'assistant',
      type: 'html',
      content: 'El archivo ZIP contiene todo lo que necesitas: código, documentación y recursos.',
      htmlAction: {
        id: 'action-download',
        title: 'Descargar archivo',
        subtitle: 'ZIP · 45 MB · 237 archivos',
        icon: 'Download',
      },
      createdAt: new Date(Date.now() - 15000),
    },

    // Ejemplo 9: Enlace Externo
    {
      id: '10',
      role: 'assistant',
      type: 'html',
      content: 'Aquí tienes el enlace a la página con más información y recursos adicionales.',
      htmlAction: {
        id: 'action-external',
        title: 'Ir a la página',
        subtitle: 'Sitio web · magickhub.io',
        icon: 'ExternalLink',
      },
      createdAt: new Date(Date.now() - 10000),
    },

    // Ejemplo 10: Ejecutar Acción
    {
      id: '11',
      role: 'assistant',
      type: 'html',
      content: 'Todo está listo para iniciar el deployment. Haz clic para comenzar el proceso automático.',
      htmlAction: {
        id: 'action-deploy',
        title: 'Iniciar deployment',
        subtitle: 'CI/CD · Vercel · ~3 minutos',
        icon: 'Zap',
      },
      createdAt: new Date(Date.now() - 5000),
    },
  ]

  const handleSendMessage = (content: string) => {
    console.log('Mensaje enviado:', content)
  }

  const handleActionClicked = (message: Message, action: HtmlMessageAction) => {
    console.log('[v0] HtmlActionCard - Action clicked:', {
      messageId: message.id,
      actionId: action.id,
      actionTitle: action.title,
      actionSubtitle: action.subtitle,
      actionIcon: action.icon,
    })

    // Mensajes personalizados por acción
    const actionMessages: Record<string, string> = {
      'action-code-1': `✅ Se descargaría: "${action.title}" (${action.subtitle})`,
      'action-config': `✅ Se descargaría el archivo: "${action.title}"`,
      'action-design': `✅ Se abriría la imagen: "${action.title}" en alta resolución`,
      'action-repo': `✅ Se abriría en GitHub: ${action.subtitle}`,
      'action-slides': `✅ Se descargaría la presentación: "${action.title}"`,
      'action-dashboard': `✅ Redirigiendo al dashboard de analytics...`,
      'action-docs': `✅ Se abrirían los documentos de ${action.subtitle}`,
      'action-download': `✅ Se descargaría: "${action.title}" (${action.subtitle})`,
      'action-external': `✅ Se abriría ${action.subtitle} en una nueva pestaña`,
      'action-deploy': `✅ Iniciando deployment... esto podría tomar algunos minutos`,
    }

    const message_text =
      actionMessages[action.id] || `✅ Se ejecutó la acción: "${action.title}"`
    alert(message_text)
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
        onMessageActionClicked={handleActionClicked}
        placeholder="Prueba escribiendo o haz clic en las tarjetas de acción arriba"
        emptyStateMessage="HtmlActionCard Demo"
        emptyStateHint="Visualiza ejemplos de todas las posibilidades de personalización"
      />
    </div>
  )
}
