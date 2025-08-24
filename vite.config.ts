import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  publicDir: false, 
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      name: 'chromalog',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ['src/lib/index.ts'],
    })
  ]
})
