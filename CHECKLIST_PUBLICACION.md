# Checklist Pre-Publicación v1.0.0

## Verificaciones de Configuración ✅

### package.json de la Librería

- [x] **Versión correcta**: `1.0.0` en `/packages/ui/package.json`
- [x] **Nombre correcto**: `ltb-components`
- [x] **Descripción**: Presente y clara
- [x] **Repository URL**: `https://github.com/magickhub/ltb-components`
- [x] **Directory**: `packages/ui` (para monorepo)
- [x] **Type**: `module` (ES modules)
- [x] **Main**: Apunta a `./src/index.ts`
- [x] **Exports configurados**: 
  - `.` para importación principal
  - `./chat` para módulo de chat
  - `./styles.css` para estilos
- [x] **Peer Dependencies**: React 18+, React DOM, utils necesarios
- [x] **License**: MIT

### Estructura de Archivos

- [x] `/packages/ui/src/index.ts` - Entry point principal ✓
- [x] `/packages/ui/src/chat/index.ts` - Chat module exports ✓
- [x] `/packages/ui/src/chat/ai-chat-widget.tsx` - Widget principal ✓
- [x] `/packages/ui/src/chat/chat-message.tsx` - Componente mensaje ✓
- [x] `/packages/ui/src/chat/chat-input.tsx` - Componente input ✓
- [x] `/packages/ui/src/chat/chat-sidebar.tsx` - Componente sidebar ✓
- [x] `/packages/ui/src/chat/chat-header.tsx` - Componente header ✓
- [x] `/packages/ui/src/chat/types.ts` - Type definitions ✓
- [x] `/packages/ui/src/chat/hooks.ts` - Custom hooks ✓
- [x] `/packages/ui/src/styles.css` - Estilos globales ✓

### Documentación

- [x] **README.md** - Documentación completa actualizada
- [x] **CHANGELOG.md** - Registro de cambios de v1.0.0
- [x] **PUBLICAR_v1.0.0.md** - Instrucciones paso a paso
- [x] **EJEMPLOS_USO.md** - Ejemplos prácticos de uso
- [x] **QUICK_START.md** - Guía rápida
- [x] **RESUMEN_PUBLICACION_v1.0.0.md** - Resumen general

## Antes de Publicar

### 1. Verificación Local

```bash
# Asegúrate de estar en la rama main
git branch

# Ver cambios pendientes
git status

# Ver diferencias
git diff
```

### 2. Configuración de Git

```bash
# Verifica remotes
git remote -v

# Debe mostrar:
# origin    https://github.com/magickhub/ltb-components.git (fetch)
# origin    https://github.com/magickhub/ltb-components.git (push)
```

### 3. Archivo .gitignore (si es necesario)

Los archivos siguientes NO deben committearse:
- `node_modules/`
- `dist/`
- `build/`
- `.next/`
- `*.log`

## Comandos de Publicación

### Paso 1: Preparar cambios

```bash
git add .
git status  # Verifica los archivos
```

### Paso 2: Crear commit

```bash
git commit -m "chore(release): v1.0.0 - Initial release with AIChatWidget and modular components"
```

### Paso 3: Crear tag

```bash
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial release with AIChatWidget and chat components"

# Verificar que fue creado
git tag -l | grep v1.0.0
```

### Paso 4: Push a GitHub

```bash
# Push commits
git push origin HEAD

# Push tag
git push origin v1.0.0

# Verificar
git push origin --tags
```

## Verificación Post-Publicación

### En GitHub

1. Ve a: https://github.com/magickhub/ltb-components
2. [ ] Verifica que los commits estén en la rama `main`
3. [ ] Verifica que el tag `v1.0.0` esté listado en Releases
4. [ ] Verifica que todos los archivos estén presentes

### Instalación de Prueba

```bash
# En un directorio temporal, prueba la instalación
mkdir test-ltb-components
cd test-ltb-components
npm init -y

# Instalar la librería
npm install github:magickhub/ltb-components#v1.0.0

# Verifica node_modules/ltb-components
ls node_modules/ltb-components/

# Debe contener: package.json, src/
```

## Para Futuras Versiones

Cuando publiques nuevas versiones:

1. Actualiza la versión en `/packages/ui/package.json`
2. Actualiza `CHANGELOG.md` con nuevos cambios
3. Sigue los mismos pasos 1-4 con el nuevo número de versión
4. Considera crear un Release en GitHub para cada versión

## Soporte para Usuarios

Si tus usuarios reportan problemas:

1. **No se instala**: Verifica que tengan git instalado
2. **Errores de tipos**: Asegúrate de que importan correctamente
3. **Estilos no funcionan**: Deben importar `import 'ltb-components/styles.css'`
4. **Dark mode no funciona**: Necesitan agregar clase `dark` al elemento padre

## Notas Importantes

- La librería se instala desde GitHub, NO desde npm registry
- Los usuarios necesitan git instalado en su máquina
- El repositorio debe ser público en GitHub
- Cada versión debe tener su correspondiente tag en Git

---

**Uso para instalar:**
```bash
npm install github:magickhub/ltb-components#v1.0.0
```

**Verificación de que funciona:**
```bash
npm list | grep ltb-components
```

---

✅ **Checklist completado. Listo para publicar.**
