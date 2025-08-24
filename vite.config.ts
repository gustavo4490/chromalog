import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      name: 'ChromaLog',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`
    }
  },
  plugins: [dts({ insertTypesEntry: true })]
})
