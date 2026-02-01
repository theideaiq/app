import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@repo/env': path.resolve(__dirname, '../../packages/env/src'),
      '@repo/utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
