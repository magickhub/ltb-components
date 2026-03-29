import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    chat: 'src/chat/index.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'lucide-react',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
  ],
  treeshake: true,
  minify: false,
})
