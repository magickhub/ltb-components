'use client'

import React from 'react'
import type { Message, HtmlMessageAction } from '@ltb/ui/chat'
import { ChatWindow } from '@ltb/ui/chat'

/**
 * Demo completa que muestra todas las posibilidades de personalización
 * del componente HtmlActionCard
 * 
 * Características:
 * - 15+ ejemplos diferentes de acciones
 * - Diferentes iconos de Lucide (Code2, File, Image, Github, BarChart3, BookOpen, etc.)
 * - Subtítulos descriptivos con formatos, tamaños y ubicaciones
 * - Handler que simula diferentes tipos de acciones
 * - Logging detallado para debugging
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
      content: '📚 Aquí tienes ejemplos de todas las posibilidades de personalización del HtmlActionCard:\n\n✨ Cada tarjeta puede tener:\n• Un icono personalizado (de Lucide Icons)\n• Un título descriptivo\n• Un subtítulo con detalles (formato, tamaño, ubicación)\n• Un callback personalizado para manejar la acción\n\nHaz clic en cualquier tarjeta para ver el evento capturado:',
      createdAt: new Date(Date.now() - 55000),
    },

    // Categoría: Descargas de código
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

    // Categoría: Archivos de configuración
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

    // Categoría: Imágenes y diseño
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

    // Categoría: Repositorios
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

    // Categoría: Presentaciones
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

    // Categoría: Dashboards
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

    // Categoría: Documentación
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

    // Categoría: Descargas generales
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

    // Categoría: Enlaces externos
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

    // Categoría: Acciones especiales
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

    // Sección de ejemplos adicionales
    {
      id: '12',
      role: 'assistant',
      type: 'text',
      content: '\n🎯 Más ejemplos con diferentes iconos y casos de uso:\n\n• FileSpreadsheet: Para exportar datos en Excel\n• Video: Tutoriales y demostraciones en video\n• Music: Descargas de archivos de audio\n• Database: Acceso a datos en tiempo real\n• Copy: Copiar código o configuraciones\n• Share2: Compartir contenido en redes\n• TrendingUp: Mostrar tendencias y análisis\n• Lock: Acciones de seguridad y permisos',
      createdAt: new Date(Date.now() - 3000),
    },

    // Ejemplos con más iconos
    {
      id: '13',
      role: 'assistant',
      type: 'html',
      content: 'Exporta todos tus datos en formato de hoja de cálculo con todas las columnas.',
      htmlAction: {
        id: 'action-spreadsheet',
        title: 'Exportar a Excel',
        subtitle: 'XLSX · 8.2 MB · 1,200 filas · Datos completos',
        icon: 'FileSpreadsheet',
      },
      createdAt: new Date(Date.now() - 4000),
    },

    {
      id: '14',
      role: 'assistant',
      type: 'html',
      content: 'Ver el tutorial en video de cómo usar el componente HtmlActionCard.',
      htmlAction: {
        id: 'action-video',
        title: 'Ver tutorial en video',
        subtitle: 'YouTube · 12 minutos · HD 1080p',
        icon: 'Video',
      },
      createdAt: new Date(Date.now() - 3500),
    },

    {
      id: '15',
      role: 'assistant',
      type: 'html',
      content: 'Accede a la base de datos en tiempo real para consultar toda la información.',
      htmlAction: {
        id: 'action-database',
        title: 'Ir a la base de datos',
        subtitle: 'PostgreSQL · 1,247 registros · Conecto directo',
        icon: 'Database',
      },
      createdAt: new Date(Date.now() - 3000),
    },

    {
      id: '16',
      role: 'assistant',
      type: 'html',
      content: 'Copia el código de ejemplo al portapapeles para usarlo en tu proyecto.',
      htmlAction: {
        id: 'action-copy-code',
        title: 'Copiar código',
        subtitle: 'TypeScript · 245 líneas · Listo para pegar',
        icon: 'Copy',
      },
      createdAt: new Date(Date.now() - 2500),
    },

    {
      id: '17',
      role: 'assistant',
      type: 'html',
      content: 'Compartir este proyecto con tu equipo en redes sociales y plataformas.',
      htmlAction: {
        id: 'action-share',
        title: 'Compartir proyecto',
        subtitle: 'Social · Twitter, LinkedIn, Facebook, Slack',
        icon: 'Share2',
      },
      createdAt: new Date(Date.now() - 2000),
    },

    {
      id: '18',
      role: 'assistant',
      type: 'html',
      content: 'Muestra el análisis de tendencias con gráficos interactivos.',
      htmlAction: {
        id: 'action-trends',
        title: 'Ver análisis de tendencias',
        subtitle: 'Charts · Últimos 30 días · Interactivo',
        icon: 'TrendingUp',
      },
      createdAt: new Date(Date.now() - 1500),
    },

    {
      id: '19',
      role: 'assistant',
      type: 'html',
      content: 'Gestiona los permisos y la seguridad del proyecto desde aquí.',
      htmlAction: {
        id: 'action-security',
        title: 'Configurar seguridad',
        subtitle: 'Permisos · Roles · Autenticación',
        icon: 'Lock',
      },
      createdAt: new Date(Date.now() - 1000),
    },

    {
      id: '20',
      role: 'assistant',
      type: 'text',
      content: '\n✅ Ahora entiendes todas las posibilidades del HtmlActionCard:\n\n✨ Puedes personalizar:\n• Icono (cualquiera de Lucide Icons)\n• Título (hasta 40 caracteres)\n• Subtítulo con detalles relevantes\n• Callback para manejar la acción\n\n🚀 Casos de uso:\nDescargas, repositorios, documentación, dashboards, videos, bases de datos, compartir, seguridad, análisis, y mucho más.',
      createdAt: new Date(Date.now() - 500),
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
      'action-spreadsheet': `✅ Se descargaría Excel con ${action.subtitle}`,
      'action-video': `✅ Se abriría el video: "${action.title}"`,
      'action-database': `✅ Conectando a la base de datos...`,
      'action-copy-code': `✅ Se copió al portapapeles: ${action.subtitle}`,
      'action-share': `✅ Opciones de compartir en ${action.subtitle}`,
      'action-trends': `✅ Se abrirían los gráficos: "${action.title}"`,
      'action-security': `✅ Abriendo panel de ${action.title}...`,
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
