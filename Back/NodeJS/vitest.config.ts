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
      exclude: ['modules/shared/**', 'modules/bets/src/infrastructure/**', 'api'],
      allowExternal: true,
    },
    dir: 'modules',
  },
})