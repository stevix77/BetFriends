import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      all: false,
      extension: [
        '.ts'
      ],
      exclude: ['src/infrastructure/**'],
      allowExternal: true,
    },
    dir: 'tests'
  },
})