# Publicar Versión v1.0.0 en GitHub

Este documento describe los pasos para publicar la versión v1.0.0 de ltb-components en GitHub.

## Pasos para Publicar

### 1. Verificar cambios locales

```bash
# Ver el estado del repositorio
git status
```

### 2. Preparar los cambios

```bash
# Ver qué archivos han cambiado
git diff

# Agregar los cambios
git add .
```

### 3. Crear un commit para v1.0.0

```bash
git commit -m "chore(release): v1.0.0 - Initial release with AIChatWidget and modular components"
```

### 4. Crear un tag para la versión

```bash
# Crear el tag v1.0.0
git tag -a v1.0.0 -m "Release version 1.0.0 - Initial release with AIChatWidget and chat components"

# O si no necesitas mensaje anotado:
git tag v1.0.0
```

### 5. Hacer push al repositorio

```bash
# Push de los commits
git push origin HEAD

# Push del tag
git push origin v1.0.0

# O push de todos los tags
git push origin --tags
```

## Resultado

Una vez completados estos pasos:

✅ El código estará en la rama main de GitHub
✅ El tag v1.0.0 estará disponible en GitHub
✅ Los usuarios podrán instalar con: `npm install github:magickhub/ltb-components#v1.0.0`

## Crear un Release en GitHub (Opcional pero Recomendado)

1. Ve a https://github.com/magickhub/ltb-components/releases
2. Haz clic en "Create a new release"
3. Selecciona el tag "v1.0.0"
4. Título: "v1.0.0 - Initial Release"
5. Descripción: Copia el contenido del CHANGELOG.md
6. Haz clic en "Publish release"

## Verificar la Instalación

Los usuarios pueden verificar que la instalación funciona con:

```bash
npm install github:magickhub/ltb-components#v1.0.0
```

Y importar los componentes:

```tsx
import { AIChatWidget } from 'ltb-components/chat';
import 'ltb-components/styles.css';
```

## Versiones Futuras

Para publicar nuevas versiones:

1. Actualiza `packages/ui/package.json` con la nueva versión (ej: 1.1.0)
2. Actualiza `CHANGELOG.md` con los cambios
3. Sigue los mismos pasos 3-5 con el nuevo número de versión
