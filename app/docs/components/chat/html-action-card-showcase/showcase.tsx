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
        html: `<style>
  .code-block { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; }
  .fn-name { color: #dcdcaa; } .keyword { color: #569cd6; }
</style>
<div class="code-block">
  <span class="keyword">function</span> <span class="fn-name">ltbIncrenta</span>(value) {<br/>
  &nbsp;&nbsp;<span class="keyword">return</span> value + 1;<br/>
  }
</div>`,
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
        html: `{"version":"1.0.0","env":"production","debug":false,"api":{"url":"https://api.magickhub.io","timeout":5000}}`,
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
        html: `<img src="https://placehold.co/1920x1080/3b82f6/ffffff?text=Diseño+Final" alt="Diseño final" style="max-width:100%;border-radius:8px" />`,
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
        html: `<a href="https://github.com/magickhub/ltb-components" target="_blank">https://github.com/magickhub/ltb-components</a>`,
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
        html: `<p style="font-family:sans-serif">Presentación de 42 diapositivas sobre estrategia de producto Q2 2026. Lista para descargar.</p>`,
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
        html: `<div style="font-family:sans-serif;padding:16px;background:#f9fafb;border-radius:8px"><h2>Dashboard Analytics</h2><p>Métricas en tiempo real de tu proyecto.</p></div>`,
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
        html: `<article style="font-family:sans-serif;padding:16px"><h1>Documentación LTB Components</h1><p>Guía completa de uso, referencia de API y ejemplos.</p></article>`,
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
        html: `<p style="font-family:sans-serif">ltb-components-v1.0.2.zip · 45 MB · 237 archivos</p>`,
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
        html: `<a href="https://magickhub.io" target="_blank" style="font-family:sans-serif">https://magickhub.io</a>`,
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
        html: `<div style="font-family:sans-serif;padding:16px;background:#ecfdf5;border-radius:8px;color:#065f46"><strong>Deployment config</strong><br/>Branch: main · Environment: production · Region: eu-west-1</div>`,
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
        html: `<table style="font-family:sans-serif;border-collapse:collapse;width:100%"><tr><th style="border:1px solid #ddd;padding:8px">ID</th><th style="border:1px solid #ddd;padding:8px">Nombre</th><th style="border:1px solid #ddd;padding:8px">Valor</th></tr><tr><td style="border:1px solid #ddd;padding:8px">1</td><td style="border:1px solid #ddd;padding:8px">Item A</td><td style="border:1px solid #ddd;padding:8px">42</td></tr></table>`,
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
        html: `<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Tutorial" frameborder="0" allowfullscreen></iframe>`,
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
        html: `<div style="font-family:monospace;background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:8px">SELECT * FROM users LIMIT 10;</div>`,
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
        html: `import { HtmlActionCard } from '@ltb/ui/chat'\n\n<HtmlActionCard\n  message={message}\n  action={action}\n  onActionClick={handleClick}\n/>`,
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
        html: `https://magickhub.io/ltb-components`,
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
        html: `<div style="font-family:sans-serif;padding:16px;background:#eff6ff;border-radius:8px"><strong>Tendencias últimos 30 días</strong><br/>+12% visitas · +8% conversión · -3% churn</div>`,
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
        html: `<div style="font-family:sans-serif;padding:16px;background:#fef3c7;border-radius:8px"><strong>Roles activos:</strong> admin, editor, viewer</div>`,
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
